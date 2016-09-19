const {trigger} = require('./eventTrigger');

/**
 * enableLongClick(el, fn, opts)
 * @param {function} callback(event, intensity)
 * @param {object} opts {clickDelay, tickInterval}
 */
export function enableLongClick(el, {clickDelay = 700, tickInterval = 250}) {
  if (Array.isArray(el)) { return [].map.call(el, child => enableLongClick(child, {clickDelay, tickInterval})); }
  var intensity      = 0;
  var clickStart     = 0;
  var clickDuration  = 0;
  var timer          = null;
  var intensityTimer = null;

  const wireupResetListeners = (enable = true) => {
    const action = enable ? 'addEventListener' : 'removeEventListener';
    el[action]('mouseup',     resetClick);
    el[action]('mouseleave',  resetClick);
    el[action]('dragstart',   resetClick);
  }
  const longClicked = e => {
    const {target}  = e;
    clickDuration   = Date.now() - clickStart;
    if (intensity === 0 && tickInterval > 0) {
      // only start this once, & if tickInterval
      intensityTimer = setInterval(() => longClicked(e), tickInterval);
    }
    trigger(target, 'longclick', {event: e, intensity: ++intensity, clickDuration});
  }
  const startClick = e => {
    wireupResetListeners(true);
    const {target} = e;
    clickStart     = Date.now();
    timer          = setTimeout(() => longClicked(e), clickDelay);
  }
  const resetClick = e => {
    // This is the 'exit' pathway for pressed-state
    const {target} = e;
    // e.preventDefault();
    clearTimeout(timer);
    clearInterval(intensityTimer);
    timer       = null;
    intensity   = 0;
    clickStart  = 0;
    intensityTimer = null;
    wireupResetListeners(false);
    e.stopImmediatePropagation();
  }

  // Wireup main 'entry' event... (add touch support starting here)
  el.addEventListener('mousedown', startClick, false);

  // NEW: Return a cleanup handler
  return () => el.removeEventListener('mousedown', startClick, false);

  //  // Return a helpful partial application to inject a callback into the addEventListener
  //  // return (callback) => el.addEventListener('longclick', callback, false);

}
