import React from 'react';
import { Box } from '../Box/Box';
import {
  MenuButtonClassName,
  SelectedMenuButtonClassName,
} from './MenuButton.css';

type Props = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  as?: React.ElementType<any>;
  currentlySelected?: boolean;
};

export const MenuButton = React.forwardRef(
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
        className={
          currentlySelected ? SelectedMenuButtonClassName : MenuButtonClassName
        }
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

MenuButton.displayName = 'MenuButton';
