/**
 * Note: Optionally add `trigger` to HTMLElement's prototype
 *
 * Examples:
 * trigger(el, 'longclick')
 * el.trigger('longclick')
 */
export function trigger(el, event, opts) {
  // param shift / alt signatures
  const last = arguments[arguments.length-1];
  opts = typeof last === 'object' ? last : {};
  event = typeof el === 'string' ? el : event;
  el = this instanceof HTMLElement ? this : el;
  el.dispatchEvent(create(event, opts));
  return el;
}

function create(name, opts = {}) {
  if (!document.createEvent || document.createEventObject) {
    return alert('Brave soul, upgrade thy browser, for there be dragons.');
  }
  const event = document.createEvent('Event');
  event.initEvent(name, true, true);
  return Object.assign(event, opts);
}
