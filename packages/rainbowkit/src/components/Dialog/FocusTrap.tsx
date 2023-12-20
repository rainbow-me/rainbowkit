import React, { useCallback, useEffect, useRef } from 'react';

const moveFocusWithin = (element: HTMLElement, position: 'start' | 'end') => {
  const focusableElements = element.querySelectorAll(
    'button:not(:disabled), a[href]',
  ) as NodeListOf<HTMLButtonElement | HTMLAnchorElement>;

  if (focusableElements.length === 0) return;

  focusableElements[
    position === 'end' ? focusableElements.length - 1 : 0
  ].focus();
};

export function FocusTrap(props: JSX.IntrinsicElements['div']) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const previouslyActiveElement = document.activeElement;

    return () => {
      (previouslyActiveElement as HTMLElement).focus?.();
    };
  }, []);

  useEffect(() => {
    if (contentRef.current) {
      const elementToFocus =
        contentRef.current.querySelector('[data-auto-focus]');
      if (elementToFocus) {
        (elementToFocus as HTMLElement).focus();
      } else {
        contentRef.current.focus();
      }
    }
  }, []);

  return (
    <>
      <div
        onFocus={useCallback(
          () =>
            contentRef.current && moveFocusWithin(contentRef.current, 'end'),
          [],
        )}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: incorrect
        tabIndex={0}
      />
      <div
        ref={contentRef}
        style={{ outline: 'none' }}
        tabIndex={-1}
        {...props}
      />
      <div
        onFocus={useCallback(
          () =>
            contentRef.current && moveFocusWithin(contentRef.current, 'start'),
          [],
        )}
        // biome-ignore lint/a11y/noNoninteractiveTabindex: incorrect
        tabIndex={0}
      />
    </>
  );
}
