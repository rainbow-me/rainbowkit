import React from 'react';
import { Box } from '../Box/Box';
import { HoverClassName, SelectedClassName } from './ModalSelection.css';

type Props = {
  children?: React.ReactNode;
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
      onClick,
      ...urlProps
    }: Props,
    ref: React.Ref<HTMLElement>
  ) => {
    return (
      <Box
        as={as}
        className={currentlySelected ? SelectedClassName : HoverClassName}
        disabled={currentlySelected}
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
