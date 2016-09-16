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
      scrollLeft, scrollRight, //click events
      jumpLeft,   jumpRight; //  click events
  wrapper   = el.querySelector('.wrapper');
  itemList  = el.querySelector('.items');
  leftBtn   = el.querySelector('.leftArrow');
  rightBtn  = el.querySelector('.rightArrow');

  function updateLayout() {
    let wrapperRect = wrapper.getBoundingClientRect();
    let listRect    = itemList.getBoundingClientRect();
    let item        = itemList.children[0] && itemList.children[0];
    let itemRect    = item && item.getBoundingClientRect();
    let totalWidth  = listRect && listRect.width;
    let scrollWidth = wrapperRect.width;
    stepSizePx      = itemRect.width;
    transformMaxPx  = totalWidth - scrollWidth;
    scrollLeft      = scroll.bind(null, 'left', stepSizePx);
    scrollRight     = scroll.bind(null, 'right', stepSizePx);
    jumpLeft        = scroll.bind(null, 'left', 2 * stepSizePx);
    jumpRight       = scroll.bind(null, 'right', 2 * stepSizePx);
    return item;
  }
  function scroll(direction, stepSizePx = stepSizePx, event = {}) {
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
    cleanupHandles = enableLongClick([leftBtn, rightBtn]);
    cleanupHandles.push(() => leftBtn.removeEventListener('click', scrollLeft, false));
    cleanupHandles.push(() => rightBtn.removeEventListener('click', scrollRight, false));
    cleanupHandles.push(() => leftBtn.removeEventListener('longclick', scrollLeft, false));
    cleanupHandles.push(() => rightBtn.removeEventListener('longclick', scrollRight, false));
    leftBtn.addEventListener('longclick', scrollLeft, false);
    rightBtn.addEventListener('longclick', scrollRight, false);
    leftBtn.addEventListener('click', scrollLeft, false);
    rightBtn.addEventListener('click', scrollRight, false);
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


