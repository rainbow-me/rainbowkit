import React, { type JSX } from 'react';
import { useCallback, useEffect, useRef } from 'react';

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
  const sentinelStyle = {
    height: 1,
    opacity: 0,
    pointerEvents: 'none',
    position: 'fixed',
    width: 1,
  } as const;

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
      <button
        aria-label="Focus modal content"
        onFocus={useCallback(
          () =>
            contentRef.current && moveFocusWithin(contentRef.current, 'end'),
          [],
        )}
        style={sentinelStyle}
        tabIndex={0}
        type="button"
      />
      <div
        ref={contentRef}
        style={{ outline: 'none' }}
        tabIndex={-1}
        {...props}
      />
      <button
        aria-label="Focus modal content"
        onFocus={useCallback(
          () =>
            contentRef.current && moveFocusWithin(contentRef.current, 'start'),
          [],
        )}
        style={sentinelStyle}
        tabIndex={0}
        type="button"
      />
    </>
  );
}
