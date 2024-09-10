import React from 'react';
import { Box, type BoxProps } from '../Box/Box';

export type TextProps = {
  id?: string;
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
  style?: React.CSSProperties;
  // transform?: BoxProps['textTransform']
  weight?: BoxProps['fontWeight'];
  className?: string;
  tabIndex?: number;
  textAlign?: BoxProps['textAlign'];
  display?: BoxProps['display'];
  testId?: string;
};

export const Text = React.forwardRef(
  (
    {
      as = 'div',
      children,
      className,
      color,
      display,
      font = 'body',
      id,
      size = '16',
      style,
      tabIndex,
      textAlign = 'inherit',
      weight = 'regular',
      testId,
    }: TextProps,
    ref: React.Ref<HTMLElement>,
  ) => {
    return (
      <Box
        as={as}
        className={className}
        color={color}
        display={display}
        fontFamily={font}
        fontSize={size}
        fontWeight={weight}
        id={id}
        ref={ref}
        style={style}
        tabIndex={tabIndex}
        textAlign={textAlign}
        testId={testId}
      >
        {children}
      </Box>
    );
  },
);

Text.displayName = 'Text';
