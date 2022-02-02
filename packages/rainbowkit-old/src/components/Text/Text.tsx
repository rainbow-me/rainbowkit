import React from 'react';
import { Box, BoxProps } from '../Box/Box';

type Props = {
  as?:
    | 'code'
    | 'div'
    | 'h1'
    | 'h2'
    | 'h3'
    | 'h4'
    | 'h5'
    | 'h6'
    | 'label'
    | 'p'
    | 'span';
  children?: React.ReactNode;
  color: BoxProps['color'];
  font?: BoxProps['fontFamily'];
  // lineHeight?: BoxProps['lineHeight']
  size?: BoxProps['fontSize'];
  // transform?: BoxProps['textTransform']
  weight?: BoxProps['fontWeight'];
  className?: string;
};

export const Text = React.forwardRef(
  (
    {
      as = 'div',
      children,
      className,
      color,
      font = 'body',
      size = '16',
      weight = 'regular',
    }: Props,
    ref: React.Ref<HTMLElement>
  ) => {
    return (
      <Box
        as={as}
        className={className}
        color={color}
        fontFamily={font}
        fontSize={size}
        fontWeight={weight}
        ref={ref}
      >
        {children}
      </Box>
    );
  }
);

Text.displayName = 'Text';
