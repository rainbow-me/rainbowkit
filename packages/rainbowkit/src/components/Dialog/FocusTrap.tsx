import React, { forwardRef, useCallback, useRef } from 'react';
import mergeRefs from 'react-merge-refs';

const moveFocusWithin = (element: HTMLElement, position: 'start' | 'end') => {
  const focusableElements = element.querySelectorAll(
    'button, a[href]'
  ) as NodeListOf<HTMLButtonElement | HTMLAnchorElement>;

  if (focusableElements.length === 0) return;

  focusableElements[
    position === 'end' ? focusableElements.length - 1 : 0
  ].focus();
};

export const FocusTrap = forwardRef<
  HTMLDivElement,
  JSX.IntrinsicElements['div']
>((props, ref) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const finalRef = mergeRefs([contentRef, ref]);

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
      <div ref={finalRef} {...props} />
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
});

FocusTrap.displayName = 'FocusTrap';
