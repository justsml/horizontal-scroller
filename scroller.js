/*
var imgScroller;
const initScroller = () => imgScroller = Scroller(document.querySelector('.scroller'));
setTimeout(initScroller, 2500);
*/

module.exports = Scroller;

function Scroller(el) {
  let wrapper, itemList, leftBtn, rightBtn, css, // Elements
      transformMaxPx, stepSizePx,                // Misc scroll coords
      currentXOffset = 0,
      scrollLeft, scrollRight; // event fn hooks
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
    return item;
  }
  function scroll(direction) {
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
  function init() {
    injectStyles();
    updateLayout();
    leftBtn.addEventListener('click', scrollLeft);
    rightBtn.addEventListener('click', scrollRight);
    itemList.style.transform = 'translatex(0px)';
    return { scroll, destroy };
    // 'debug': {
    //   updateLayout, wrapper, itemList, stepSizePx, transformMaxPx
    // }
  }
  function destroy() {
    leftBtn.removeEventListener('click', scrollLeft);
    rightBtn.removeEventListener('click', scrollRight);
    if (css) { css.parentNode.removeChild(css); }
  }
  return init();
}


