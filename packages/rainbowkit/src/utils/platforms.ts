export function isMacOS(): boolean {
  return (
    typeof navigator !== 'undefined' &&
    /Macintosh; Intel Mac OS X/.test(navigator.userAgent)
  );
}
