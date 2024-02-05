export function debounce(fn: () => void, ms: number) {
  let timer: NodeJS.Timeout | null;

  return () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      fn();
    }, ms);
  };
}
