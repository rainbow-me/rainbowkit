import React, { useCallback, useRef } from 'react';

const moveFocusWithin = (element: HTMLElement, position: 'start' | 'end') => {
  const focusableElements = element.querySelectorAll(
    'button, a[href]'
  ) as NodeListOf<HTMLButtonElement | HTMLAnchorElement>;

  if (focusableElements.length === 0) return;

  focusableElements[
    position === 'end' ? focusableElements.length - 1 : 0
  ].focus();
};

export function FocusTrap(props: JSX.IntrinsicElements['div']) {
  const contentRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <div
        onFocus={useCallback(
          () =>
            contentRef.current && moveFocusWithin(contentRef.current, 'end'),
          []
        )}
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      />
      <div ref={contentRef} {...props} />
      <div
        onFocus={useCallback(
          () =>
            contentRef.current && moveFocusWithin(contentRef.current, 'start'),
          []
        )}
        tabIndex={0} // eslint-disable-line jsx-a11y/no-noninteractive-tabindex
      />
    </>
  );
}
