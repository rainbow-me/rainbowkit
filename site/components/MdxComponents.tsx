/* eslint-disable react/jsx-sort-props */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { pre } from 'css/pre.css';
import { vars } from 'css/vars.css';
import React from 'react';
import { Box } from './Box/Box';
import { Code } from './Code/Code';
import { Link } from './Link/Link';
import { PropsTable } from './PropsTable/PropsTable';
import { Text } from './Text/Text';

export const components = {
  h1: props => <Text as="h1" variant="titleLarge" weight="heavy" {...props} />,
  h2: props => (
    <Text
      as="h2"
      variant="title3"
      color="labelSecondary"
      marginTop="1"
      marginBottom="6"
      weight="medium"
      {...props}
    />
  ),
  h3: props => (
    <Text
      as="h3"
      variant="title2"
      weight="semibold"
      marginTop="10"
      marginBottom="2"
      {...props}
    />
  ),
  p: props => (
    <Text
      as="p"
      color="labelSecondary"
      marginBottom="5"
      style={{ fontWeight: 500, lineHeight: '25px' }}
      {...props}
    />
  ),
  a: props => <Link {...props} />,
  Img: props => <Box as="img" {...props} display="block" maxWidth="full" />,
  ul: props => <Box as="ul" paddingLeft="3" paddingBottom="6" {...props} />,
  ol: props => <Box as="ol" paddingLeft="4" {...props} />,
  li: props => (
    <Text
      as="li"
      variant="base"
      marginBottom="2"
      {...props}
      style={{ listStyle: 'none', display: 'flex', alignItems: 'center' }}
    />
  ),
  pre: ({ children, ...props }) => {
    return (
      // <Box as="pre" className={pre} marginY="9" {...props}>
      <Box
        as="pre"
        className={pre}
        marginTop="5"
        marginBottom="9"
        style={{
          boxShadow: `inset 0 0 1px ${vars.colors.separator}, 0px 2px 8px rgba(27, 29, 31, 0.02), 0px 8px 20px rgba(27, 29, 31, 0.02)`,
        }}
        {...props}
      >
        {children}
      </Box>
    );
  },
  code: ({ children, ...props }) => {
    const isInline = typeof children === 'string';
    return isInline ? (
      <Code {...props}>{children}</Code>
    ) : (
      <code>{children}</code>
    );
  },
  PropsTable: props => <PropsTable aria-label="Component Props" {...props} />,
  blockquote: props => <Box as="blockquote" {...props} />,
};
