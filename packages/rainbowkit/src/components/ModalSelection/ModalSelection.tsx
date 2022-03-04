import React from 'react';
import { Box } from '../Box/Box';
import { HoverClassName, SelectedClassName } from './ModalSelection.css';

type Props = {
  children?: React.ReactNode;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  as?: React.ElementType<any>;
  currentlySelected?: boolean;
};

export const ModalSelection = React.forwardRef(
  (
    {
      as = 'button',
      children,
      currentlySelected = false,
      disabled,
      onClick,
      ...urlProps
    }: Props,
    ref: React.Ref<HTMLElement>
  ) => {
    return (
      <Box
        as={as}
        className={
          disabled
            ? null
            : currentlySelected
            ? SelectedClassName
            : HoverClassName
        }
        disabled={currentlySelected || disabled}
        onClick={onClick}
        ref={ref}
        {...urlProps}
      >
        {children}
      </Box>
    );
  }
);

ModalSelection.displayName = 'ModalSelection';
