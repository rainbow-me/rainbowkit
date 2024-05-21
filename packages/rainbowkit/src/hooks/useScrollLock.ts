import { useCallback, useEffect, useRef } from 'react';

type OriginalStyle = {
  overflow: CSSStyleDeclaration['overflow'];
  paddingRight: CSSStyleDeclaration['paddingRight'];
};

export function useScrollLock(locked: boolean) {
  const target = useRef<HTMLElement | null>(null);
  const originalStyle = useRef<OriginalStyle | null>(null);

  const lock = useCallback(() => {
    if (!target.current) return;

    const { overflow, paddingRight } = target.current.style;

    // Save the original styles
    originalStyle.current = { overflow, paddingRight };

    // Prevent width reflow
    const offsetWidth =
      target.current === document.body
        ? window.innerWidth
        : target.current.offsetWidth;
    const currentPaddingRight =
      parseInt(window.getComputedStyle(target.current).paddingRight, 10) || 0;

    const scrollbarWidth = offsetWidth - target.current.scrollWidth;
    target.current.style.paddingRight = `${
      scrollbarWidth + currentPaddingRight
    }px`;

    // Lock the scroll
    target.current.style.overflow = 'hidden';
  }, []);

  const unlock = useCallback(() => {
    if (!target.current || !originalStyle.current) return;

    target.current.style.overflow = originalStyle.current.overflow;

    // Only reset padding right if we changed it
    target.current.style.paddingRight = originalStyle.current.paddingRight;
  }, []);

  useEffect(() => {
    target.current = document.body;

    if (locked) lock();

    return unlock;
  }, [lock, unlock, locked]);
}
