import { useEffect, useLayoutEffect, useRef } from 'react';

type OriginalStyle = {
  overflow: CSSStyleDeclaration['overflow'];
  paddingRight: CSSStyleDeclaration['paddingRight'];
};

const IS_SERVER = typeof window === 'undefined';

export function useScrollLock(locked: boolean) {
  const target = useRef<HTMLElement | null>(null);
  const originalStyle = useRef<OriginalStyle | null>(null);

  const lock = () => {
    if (target.current) {
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
    }
  };

  const unlock = () => {
    if (target.current && originalStyle.current) {
      target.current.style.overflow = originalStyle.current.overflow;

      // Only reset padding right if we changed it
      target.current.style.paddingRight = originalStyle.current.paddingRight;
    }
  };

  const useHook = typeof window !== 'undefined' ? useLayoutEffect : useEffect;

  useHook(() => {
    if (IS_SERVER) return;

    target.current = document.body;

    if (locked) {
      lock();
    } else {
      unlock();
    }

    return () => {
      unlock();
    };
  }, [locked]);
}
