(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["horizontal-scroller"] = factory();
	else
		root["horizontal-scroller"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.Horizontal = undefined;

	var _scroller = __webpack_require__(1);

	var _scroller2 = _interopRequireDefault(_scroller);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	window.Scroller = window.Scroller || _scroller2.default;

	exports.Horizontal = _scroller2.default;

/***/ },
/* 1 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(global) {module.exports = global["HorizontalScroller"] = __webpack_require__(2);
	/* WEBPACK VAR INJECTION */}.call(exports, (function() { return this; }())))

/***/ },
/* 2 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	/*
	var imgScroller;
	const initScroller = () => imgScroller = Scroller(document.querySelector('.scroller'));
	setTimeout(initScroller, 2500);
	*/

	var _require = __webpack_require__(3);

	var enableLongClick = _require.enableLongClick;


	module.exports = Scroller;

	function Scroller(el) {
	  var wrapper = void 0,
	      itemList = void 0,
	      leftBtn = void 0,
	      rightBtn = void 0,
	      css = void 0,
	      // Elements
	  transformMaxPx = void 0,
	      stepSizePx = void 0,
	      // Misc scroll coords
	  currentXOffset = 0,
	      cleanupHandles = [],
	      // destroy() helper
	  events = {},
	      layout = void 0;
	  // scrollLeft, scrollRight, //click events
	  // jumpLeft,   jumpRight; //  click events
	  wrapper = el.querySelector('.wrapper');
	  itemList = el.querySelector('.items');
	  leftBtn = el.querySelector('.leftArrow');
	  rightBtn = el.querySelector('.rightArrow');

	  function getLayout() {
	    return {
	      scrollWidth: wrapper && wrapper.getBoundingClientRect().width || -1,
	      totalWidth: itemList && itemList.getBoundingClientRect().width || -1,
	      count: itemList && itemList.children.length || -1
	    };
	  }
	  function hasLayoutChanged() {
	    var currLayout = Object.assign({}, layout);
	    layout = getLayout();
	    var identical = Object.keys(currLayout).every(function (key) {
	      return currLayout[key] === layout[key];
	    });
	    return !identical;
	  }
	  function updateLayout() {
	    var layout = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : getLayout();

	    var wrapperRect = wrapper.getBoundingClientRect();
	    var listRect = itemList.getBoundingClientRect();
	    var item = itemList.children[0] && itemList.children[0];
	    var itemRect = item && item.getBoundingClientRect();
	    var totalWidth = layout.totalWidth;
	    var scrollWidth = layout.scrollWidth;


	    stepSizePx = itemRect.width;
	    transformMaxPx = totalWidth - scrollWidth;
	    // Set events handlers
	    events.scrollLeft = scroll.bind(null, 'left', stepSizePx);
	    events.scrollRight = scroll.bind(null, 'right', stepSizePx);
	    events.jumpLeft = scroll.bind(null, 'left', 3 * stepSizePx);
	    events.jumpRight = scroll.bind(null, 'right', 3 * stepSizePx);
	    events.warpLeft = scroll.bind(null, 'left', scrollWidth);
	    events.warpRight = scroll.bind(null, 'right', scrollWidth);
	    return item;
	  }
	  function scroll(direction) {
	    var stepSizePx = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : stepSizePx;
	    var event = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

	    if (hasLayoutChanged()) {
	      console.warn('Verify: hasLayoutChanged() === true - verify change!');
	      updateLayout();
	    }
	    var tempOffset = currentXOffset;
	    if (direction === 'left') {
	      currentXOffset += stepSizePx;
	    } else {
	      //'assume' right scroll - default
	      currentXOffset -= stepSizePx;
	    }
	    if (currentXOffset <= 0 && currentXOffset >= (transformMaxPx + stepSizePx) * -1) {
	      // apply transform
	      if (currentXOffset > transformMaxPx) {
	        currentXOffset = transformMaxPx;
	      }
	      itemList.style.transform = 'translatex(' + currentXOffset + 'px)';
	    } else {
	      currentXOffset = tempOffset;
	    }
	  }
	  function injectStyles() {
	    css = document.querySelector('style#horizontal-scroller');
	    if (!css) {
	      var styles = __webpack_require__(5);
	      css = document.createElement('style');
	      css.id = 'horizontal-scroller';
	      css.innerHTML = styles;
	      document.head.appendChild(css);
	    }
	  }
	  function setupEvents() {
	    cleanupHandles = enableLongClick([leftBtn, rightBtn], { clickDelay: 400, tickInterval: 175 });
	    cleanupHandles.push(function () {
	      return leftBtn.removeEventListener('click', events.scrollLeft, false);
	    });
	    cleanupHandles.push(function () {
	      return rightBtn.removeEventListener('click', events.scrollRight, false);
	    });
	    cleanupHandles.push(function () {
	      return leftBtn.removeEventListener('dblclick', events.warpLeft, false);
	    });
	    cleanupHandles.push(function () {
	      return rightBtn.removeEventListener('dblclick', events.warpRight, false);
	    });
	    cleanupHandles.push(function () {
	      return leftBtn.removeEventListener('longclick', events.scrollLeft, false);
	    });
	    cleanupHandles.push(function () {
	      return rightBtn.removeEventListener('longclick', events.scrollRight, false);
	    });
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
	    return { scroll: scroll, destroy: destroy };
	    // 'debug': {
	    //   updateLayout, wrapper, itemList, stepSizePx, transformMaxPx
	    // }
	  }
	  function destroy() {
	    if (css) {
	      css.parentNode.removeChild(css);
	    }
	    cleanupHandles.map(function (fn) {
	      return fn();
	    });
	  }

	  return init();
	}

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.enableLongClick = enableLongClick;

	var _require = __webpack_require__(4);

	var trigger = _require.trigger;

	/**
	 * enableLongClick(el, fn, opts)
	 * @param {function} callback(event, intensity)
	 * @param {object} opts {clickDelay, tickInterval}
	 */

	function enableLongClick(el, _ref) {
	  var _ref$clickDelay = _ref.clickDelay;
	  var clickDelay = _ref$clickDelay === undefined ? 700 : _ref$clickDelay;
	  var _ref$tickInterval = _ref.tickInterval;
	  var tickInterval = _ref$tickInterval === undefined ? 250 : _ref$tickInterval;

	  if (Array.isArray(el)) {
	    return [].map.call(el, function (child) {
	      return enableLongClick(child, { clickDelay: clickDelay, tickInterval: tickInterval });
	    });
	  }
	  var resetEvents = ['mouseup', 'mouseleave', 'dragstart'];
	  var beginEvents = ['mousedown'];
	  var intensity = 0;
	  var clickStart = 0;
	  var clickDuration = 0;
	  var timer = null;

	  var intensityTimer = null;
	  var wireupListeners = function wireupListeners(fn) {
	    var eventNames = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
	    var enable = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : true;

	    var action = enable ? 'addEventListener' : 'removeEventListener';
	    eventNames.forEach(function (name) {
	      return el[action](name, fn, false);
	    });
	    // // Returns destroy/cleanup method automatically -
	    // //N.B: i think i prefer this pattern ... though
	    // //not sure if it jives with the event model here
	    return function () {
	      return eventNames.forEach(function (name) {
	        return el.removeEventListener(name, fn, false);
	      });
	    };
	  };
	  var longClicked = function longClicked(e) {
	    var target = e.target;

	    clickDuration = Date.now() - clickStart;
	    if (intensity === 0 && tickInterval > 0) {
	      // only start this once, & if tickInterval
	      intensityTimer = setInterval(function () {
	        return longClicked(e);
	      }, tickInterval);
	    }
	    trigger(target, 'longclick', { event: e, intensity: ++intensity, clickDuration: clickDuration });
	  };
	  var startClick = function startClick(e) {
	    wireupListeners(resetClick, resetEvents, true);
	    var target = e.target;

	    clickStart = Date.now();
	    timer = setTimeout(function () {
	      return longClicked(e);
	    }, clickDelay);
	  };
	  var resetClick = function resetClick(e) {
	    // This is the 'exit' pathway for pressed-state
	    var target = e.target;
	    // e.preventDefault();

	    clearTimeout(timer);
	    clearInterval(intensityTimer);
	    timer = null;
	    intensity = 0;
	    clickStart = 0;
	    intensityTimer = null;
	    wireupListeners(resetClick, resetEvents, false);
	    e.stopImmediatePropagation();
	  };

	  // Wireup main 'entry' event... (add touch support starting here)
	  var destroy = wireupListeners(startClick, beginEvents, true);
	  // NEW: Return a cleanup handler
	  return destroy;
	}

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

	exports.trigger = trigger;
	/**
	 * Note: Optionally add `trigger` to HTMLElement's prototype
	 *
	 * Examples:
	 * trigger(el, 'longclick')
	 * el.trigger('longclick')
	 */
	function trigger(el, event, opts) {
	  // param shift / alt signatures
	  var last = arguments[arguments.length - 1];
	  opts = (typeof last === 'undefined' ? 'undefined' : _typeof(last)) === 'object' ? last : {};
	  event = typeof el === 'string' ? el : event;
	  el = this instanceof HTMLElement ? this : el;
	  el.dispatchEvent(create(event, opts));
	  return el;
	}

	function create(name) {
	  var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

	  if (!document.createEvent || document.createEventObject) {
	    return alert('Brave soul, upgrade thy browser, for dragons be there.');
	  }
	  var event = document.createEvent('Event');
	  event.initEvent(name, true, true);
	  return Object.assign(event, opts);
	}

/***/ },
/* 5 */
/***/ function(module, exports, __webpack_require__) {

	exports = module.exports = __webpack_require__(6)();
	// imports


	// module
	exports.push([module.id, ".unselectable {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n.container {\n  user-select: none;\n  -moz-user-select: none;\n  -webkit-user-select: none;\n  -ms-user-select: none;\n}\n.scroller {\n  width: 100%;\n  display: flex;\n  flex-flow: row no-wrap;\n  justify-content: space-between;\n}\n.scroller .svgArrow {\n  fill: none;\n  stroke: #333333;\n  stroke-width: 4;\n  stroke-linecap: round;\n  stroke-miterlimit: 3;\n}\n.scroller .arrow {\n  margin: 0 0.5rem;\n  zoom: 0.75;\n  align-self: center;\n  cursor: pointer;\n}\n.scroller .arrow:hover .svgArrow {\n  stroke: #FF0000;\n  stroke-width: 8;\n}\n.scroller .wrapper {\n  overflow: hidden;\n  width: 100%;\n  background-color: #CCCCCC;\n}\n.scroller .items {\n  transition: transform 0.12s ease-in;\n  margin: 1rem;\n  list-style: none;\n  display: inline-flex;\n  flex-wrap: no-wrap;\n}\n.scroller .items .unselectable > * {\n  margin-right: 2rem;\n}\n", ""]);

	// exports


/***/ },
/* 6 */
/***/ function(module, exports) {

	/*
		MIT License http://www.opensource.org/licenses/mit-license.php
		Author Tobias Koppers @sokra
	*/
	// css base code, injected by the css-loader
	module.exports = function() {
		var list = [];

		// return the list of modules as css string
		list.toString = function toString() {
			var result = [];
			for(var i = 0; i < this.length; i++) {
				var item = this[i];
				if(item[2]) {
					result.push("@media " + item[2] + "{" + item[1] + "}");
				} else {
					result.push(item[1]);
				}
			}
			return result.join("");
		};

		// import a list of modules into the list
		list.i = function(modules, mediaQuery) {
			if(typeof modules === "string")
				modules = [[null, modules, ""]];
			var alreadyImportedModules = {};
			for(var i = 0; i < this.length; i++) {
				var id = this[i][0];
				if(typeof id === "number")
					alreadyImportedModules[id] = true;
			}
			for(i = 0; i < modules.length; i++) {
				var item = modules[i];
				// skip already imported module
				// this implementation is not 100% perfect for weird media query combinations
				//  when a module is imported multiple times with different media queries.
				//  I hope this will never occur (Hey this way we have smaller bundles)
				if(typeof item[0] !== "number" || !alreadyImportedModules[item[0]]) {
					if(mediaQuery && !item[2]) {
						item[2] = mediaQuery;
					} else if(mediaQuery) {
						item[2] = "(" + item[2] + ") and (" + mediaQuery + ")";
					}
					list.push(item);
				}
			}
		};
		return list;
	};


/***/ }
/******/ ])
});
;