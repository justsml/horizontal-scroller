/*
var imgScroller;
const initScroller = () => imgScroller = Scroller(document.querySelector('.scroller'));
setTimeout(initScroller, 2500);
*/

const {enableLongClick} = require('./enableLongClick');

module.exports = Scroller;

function Scroller(el) {
  let wrapper, itemList, leftBtn, rightBtn, css, // Elements
      transformMaxPx, stepSizePx,                // Misc scroll coords
      currentXOffset = 0,
      cleanupHandles = [], // destroy() helper
      events = {}, layout;
      // scrollLeft, scrollRight, //click events
      // jumpLeft,   jumpRight; //  click events
  wrapper   = el.querySelector('.wrapper');
  itemList  = el.querySelector('.items');
  leftBtn   = el.querySelector('.leftArrow');
  rightBtn  = el.querySelector('.rightArrow');

  function getLayout() {
    return {
      scrollWidth: wrapper && wrapper.getBoundingClientRect().width || -1,
      totalWidth: itemList && itemList.getBoundingClientRect().width || -1,
      count: itemList && itemList.children.length || -1
    }
  }
  function hasLayoutChanged() {
    const currLayout = Object.assign({}, layout);
    layout = getLayout();
    const identical = Object.keys(currLayout)
      .every(key => currLayout[key] === layout[key])
    return !identical;
  }
  function updateLayout(layout = getLayout()) {
    let wrapperRect = wrapper.getBoundingClientRect();
    let listRect    = itemList.getBoundingClientRect();
    let item        = itemList.children[0] && itemList.children[0];
    let itemRect    = item && item.getBoundingClientRect();
    let {totalWidth, scrollWidth} = layout;

    stepSizePx      = itemRect.width;
    transformMaxPx  = totalWidth - scrollWidth;
    // Set events handlers
    events.scrollLeft      = scroll.bind(null, 'left', stepSizePx);
    events.scrollRight     = scroll.bind(null, 'right', stepSizePx);
    events.jumpLeft        = scroll.bind(null, 'left', 3 * stepSizePx);
    events.jumpRight       = scroll.bind(null, 'right', 3 * stepSizePx);
    events.warpLeft        = scroll.bind(null, 'left', scrollWidth);
    events.warpRight       = scroll.bind(null, 'right', scrollWidth);
    return item;
  }
  function scroll(direction, stepSizePx = stepSizePx, event = {}) {
    if (hasLayoutChanged()) {
      console.warn('Verify: hasLayoutChanged() === true - verify change!');
      updateLayout();
    }
    let tempOffset = currentXOffset;
    if (direction === 'left') {
      currentXOffset += stepSizePx;
    } else { //'assume' right scroll - default
      currentXOffset -= stepSizePx;
    }
    if (currentXOffset <= 0 && currentXOffset >= ((transformMaxPx + stepSizePx) * -1)) {
      // apply transform
      if (currentXOffset > transformMaxPx) { currentXOffset = transformMaxPx; }
      itemList.style.transform = 'translatex(' + currentXOffset + 'px)';
    } else {
      currentXOffset = tempOffset;
    }
  }
  function injectStyles() {
    css = document.querySelector('style#horizontal-scroller');
    if (!css) {
      let styles = require("!css!less!./style.less");
      css = document.createElement('style');
      css.id = 'horizontal-scroller';
      css.innerHTML = styles;
      document.head.appendChild(css);
    }
  }
  function setupEvents() {
    cleanupHandles = enableLongClick([leftBtn, rightBtn], {clickDelay: 400, tickInterval: 175});
    cleanupHandles.push(() => leftBtn.removeEventListener('click', events.scrollLeft, false));
    cleanupHandles.push(() => rightBtn.removeEventListener('click', events.scrollRight, false));
    cleanupHandles.push(() => leftBtn.removeEventListener('dblclick', events.warpLeft, false));
    cleanupHandles.push(() => rightBtn.removeEventListener('dblclick', events.warpRight, false));
    cleanupHandles.push(() => leftBtn.removeEventListener('longclick', events.scrollLeft, false));
    cleanupHandles.push(() => rightBtn.removeEventListener('longclick', events.scrollRight, false));
    leftBtn.addEventListener('longclick', events.jumpLeft, false);
    rightBtn.addEventListener('longclick', events.jumpRight, false);
    leftBtn.addEventListener('dblclick', events.warpLeft, false);
    rightBtn.addEventListener('dblclick', events.warpRight, false);
    leftBtn.addEventListener('click', events.scrollLeft, false);
    rightBtn.addEventListener('click', events.scrollRight, false);
  }
  function init() {
    injectStyles();
    updateLayout();
    setupEvents();
    itemList.style.transform = 'translatex(0px)';
    return { scroll, destroy };
    // 'debug': {
    //   updateLayout, wrapper, itemList, stepSizePx, transformMaxPx
    // }
  }
  function destroy() {
    if (css) { css.parentNode.removeChild(css); }
    cleanupHandles.map(fn => fn());
  }

  return init();
}


