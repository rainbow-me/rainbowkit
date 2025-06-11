import clsx from 'clsx';
import { Box, type BoxProps } from 'components/Box/Box';
import NextLink, { type LinkProps as NextLinkProps } from 'next/link';
import React, { type JSX } from 'react';
import * as styles from './Link.css';

type Props = {
  children?: React.ReactNode;
  color?: BoxProps['color'];
  margin?: BoxProps['margin'];
  marginBottom?: BoxProps['marginBottom'];
  marginLeft?: BoxProps['marginLeft'];
  marginRight?: BoxProps['marginRight'];
  marginTop?: BoxProps['marginTop'];
  marginY?: BoxProps['marginY'];
  marginX?: BoxProps['marginX'];
  display?: BoxProps['display'];
  style?: React.CSSProperties;
} & Omit<BoxProps, 'as'> &
  Omit<NextLinkProps, 'className' | 'legacyBehavior' | 'children'> &
  styles.Variants & { className?: string };

export const Link = React.forwardRef(
  (
    {
      children,
      className,
      color,
      display,
      margin,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      marginX,
      marginY,
      style,
      variant = 'blue',
      ...props
    }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    return (
      <Box
        as={NextLink}
        className={clsx(
          styles.variants({
            variant,
          }),
          className,
        )}
        color={color}
        display={display}
        margin={margin}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
        marginX={marginX}
        marginY={marginY}
        ref={ref}
        style={style}
        {...props}
      >
        {children}
      </Box>
    );
  },
);

Link.displayName = 'Link';
