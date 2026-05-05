export function debounce(fn: () => void, ms: number) {
  let timer: ReturnType<typeof setTimeout> | null = null;

  const debounced = () => {
    if (timer) {
      clearTimeout(timer);
    }

    timer = setTimeout(() => {
      timer = null;
      fn();
    }, ms);
  };

  debounced.cancel = () => {
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }
  };

  return debounced;
}
