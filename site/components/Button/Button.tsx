/* eslint-disable sort-keys-fix/sort-keys-fix */
import { Theme } from 'css/types';
import * as React from 'react';
import { Box, BoxProps } from '../Box/Box';
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
  as?: 'button';
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
    ref: React.Ref<HTMLButtonElement>
  ) => {
    return (
      <Box
        className={styles.variants({
          size,
          variant,
          shape,
          shadow,
        })}
        ref={ref}
        {...boxProps}
        as={boxProps.as ?? 'button'}
        style={style}
      >
        {prefix && <Box>{prefix}</Box>}
        {children}
        {suffix && <Box>{suffix}</Box>}
      </Box>
    );
  }
);

Button.displayName = 'Button';
