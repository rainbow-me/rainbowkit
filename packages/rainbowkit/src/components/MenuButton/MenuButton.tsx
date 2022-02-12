import React from 'react';
import { Box } from '../Box/Box';
import { MenuButtonClassName } from './MenuButton.css';

type Props = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  as?: React.ElementType<any>;
  disabled?: boolean;
};

export const MenuButton = React.forwardRef(
  (
    { as = 'button', children, disabled = false, onClick, ...urlProps }: Props,
    ref: React.Ref<HTMLElement>
  ) => {
    return (
      <Box
        as={as}
        className={MenuButtonClassName}
        disabled={disabled}
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
