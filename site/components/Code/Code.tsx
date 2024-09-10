import React from 'react';
import { Box, type BoxProps } from '../Box/Box';
import * as styles from './Code.css';

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
  style?: React.CSSProperties;
} & styles.Variants;

export const Code = React.forwardRef(
  (
    {
      children,
      color,
      margin,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      marginX,
      marginY,
      style,
      variant = 'primary',
    }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    return (
      <Box
        as="code"
        className={styles.variants({
          variant,
        })}
        color={color}
        margin={margin}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
        marginX={marginX}
        marginY={marginY}
        ref={ref}
        style={style}
      >
        {children}
      </Box>
    );
  },
);

Code.displayName = 'Code';
