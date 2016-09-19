const {trigger} = require('./eventTrigger');

/**
 * enableLongClick(el, fn, opts)
 * @param {function} callback(event, intensity)
 * @param {object} opts {clickDelay, tickInterval}
 */
export function enableLongClick(el, {clickDelay = 700, tickInterval = 250}) {
  if (Array.isArray(el)) { return [].map.call(el, child => enableLongClick(child, {clickDelay, tickInterval})); }
  const resetEvents  = ['mouseup', 'mouseleave', 'dragstart'];
  const beginEvents  = ['mousedown'];
  var intensity      = 0;
  var clickStart     = 0;
  var clickDuration  = 0;
  var timer          = null;

  var intensityTimer = null;
  const wireupListeners = (fn, eventNames = [], enable = true) => {
    const action = enable ? 'addEventListener' : 'removeEventListener';
    eventNames.forEach(name => el[action](name, fn, false));
    // // Returns destroy/cleanup method automatically -
    // //N.B: i think i prefer this pattern ... though
    // //not sure if it jives with the event model here
    return () => eventNames.forEach(name => el.removeEventListener(name, fn, false));
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
    wireupListeners(resetClick, resetEvents, true);
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
    wireupListeners(resetClick, resetEvents, false);
    e.stopImmediatePropagation();
  }

  // Wireup main 'entry' event... (add touch support starting here)
  const destroy = wireupListeners(startClick, beginEvents, true);
  // NEW: Return a cleanup handler
  return destroy;

}
