import { Box, type BoxProps } from 'components/Box/Box';
import React from 'react';
import * as styles from './Text.css';

type Props = {
  align?: BoxProps['textAlign'];
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
  color?: BoxProps['color'];
  display?: BoxProps['display'];
  font?: BoxProps['fontFamily'];
  margin?: BoxProps['margin'];
  marginBottom?: BoxProps['marginBottom'];
  marginLeft?: BoxProps['marginLeft'];
  marginRight?: BoxProps['marginRight'];
  marginTop?: BoxProps['marginTop'];
  marginY?: BoxProps['marginY'];
  marginX?: BoxProps['marginX'];
  size?: BoxProps['fontSize'];
  style?: React.CSSProperties;
  transform?: BoxProps['textTransform'];
  whiteSpace?: BoxProps['whiteSpace'];
  wordBreak?: BoxProps['wordBreak'];
} & styles.Variants;

export const Text = React.forwardRef(
  (
    {
      align,
      as = 'div',
      children,
      color = 'label',
      display,
      font = 'normal',
      margin,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      marginX,
      marginY,
      size,
      style,
      transform,
      variant = 'body',
      weight = 'normal',
      whiteSpace,
      wordBreak,
    }: Props,
    ref: React.Ref<HTMLElement>,
  ) => {
    return (
      <Box
        as={as}
        className={styles.variants({
          variant,
          weight,
        })}
        color={color}
        display={display}
        fontFamily={font}
        fontSize={size}
        margin={margin}
        marginBottom={marginBottom}
        marginLeft={marginLeft}
        marginRight={marginRight}
        marginTop={marginTop}
        marginX={marginX}
        marginY={marginY}
        ref={ref}
        style={style}
        textAlign={align}
        textTransform={transform}
        whiteSpace={whiteSpace}
        wordBreak={wordBreak}
      >
        {children}
      </Box>
    );
  },
);

Text.displayName = 'Text';
