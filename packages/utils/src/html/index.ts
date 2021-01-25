export function getStyle(el: any, prop: string) {
  if (!el) return undefined;
  const style = window.getComputedStyle
    ? window.getComputedStyle(el)
    : el.currentStyle;
  // If a css property's value is `auto`, it will return an empty string.
  return prop ? style[prop] : style;
}
