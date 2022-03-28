import React from 'react';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import {
  MenuButtonClassName,
  MobileMenuButtonClassName,
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
    const mobile = isMobile();
    return (
      <Box
        as={as}
        className={[
          currentlySelected ? SelectedMenuButtonClassName : MenuButtonClassName,
          mobile ? MobileMenuButtonClassName : null,
        ]}
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
