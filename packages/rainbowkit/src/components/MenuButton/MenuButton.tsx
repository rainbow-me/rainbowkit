import React from 'react';
import { Box } from '../Box/Box';
import { MenuButtonClassName } from './MenuButton.css';

type Props = {
  children?: React.ReactNode;
  key?: string;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  as?: React.ElementType<any>;
};

export const MenuButton = React.forwardRef(
  (
    { as = 'button', children, key, onClick, ...urlProps }: Props,
    ref: React.Ref<HTMLElement>
  ) => {
    return (
      <Box
        as={as}
        className={MenuButtonClassName}
        key={key}
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
