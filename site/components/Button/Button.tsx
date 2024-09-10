import type { Theme } from 'css/types';
import React from 'react';
import { Box, type BoxProps } from '../Box/Box';
import * as styles from './Button.css';

type BaseProps = {
  prefix?: React.ReactElement;
  suffix?: React.ReactElement;
  style?: React.CSSProperties;
} & styles.Variants &
  Pick<
    JSX.IntrinsicElements['button'],
    | 'onClick'
    | 'onMouseEnter'
    | 'onMouseLeave'
    | 'children'
    | 'disabled'
    | 'type'
    | 'tabIndex'
  > &
  Pick<
    BoxProps,
    | 'width'
    | 'justifyContent'
    | 'margin'
    | 'marginX'
    | 'marginY'
    | 'marginBottom'
    | 'marginLeft'
    | 'marginRight'
    | 'marginTop'
  >;

type WithAnchor = {
  as?: 'a';
} & Pick<JSX.IntrinsicElements['a'], 'href' | 'rel' | 'target'>;

type WithoutAnchor = {
  as?: 'button' | 'span';
};

export const iconSizeMapping: Record<styles.Size, keyof Theme['space']> = {
  xs: '5',
  s: '1',
  m: '1',
  l: '1',
  xl: '1',
};

export type Props = BaseProps & (WithAnchor | WithoutAnchor);

export const Button = React.forwardRef(
  (
    {
      children,
      prefix,
      shadow,
      shape = 'base',
      size = 'm',
      style,
      suffix,
      variant = 'contrast',
      ...boxProps
    }: Props,
    ref: React.Ref<HTMLButtonElement>,
  ) => {
    return (
      <Box
        className={styles.variants({
          shadow,
          shape,
          size,
          variant,
        })}
        ref={ref}
        {...boxProps}
        as={boxProps.as ?? 'button'}
        style={style}
      >
        {prefix && <Box display="inline-flex">{prefix}</Box>}
        {children}
        {suffix && <Box display="inline-flex">{suffix}</Box>}
      </Box>
    );
  },
);

Button.displayName = 'Button';
