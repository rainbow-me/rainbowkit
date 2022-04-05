/* eslint-disable react/jsx-sort-props */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import { pre } from 'css/pre.css';
import React from 'react';
import { Box } from './Box/Box';
import { Code } from './Code/Code';
import { Link } from './Link/Link';
import { PropsTable } from './PropsTable/PropsTable';
import { Text } from './Text/Text';

export const components = {
  h1: props => <Text as="h1" variant="titleLarge" weight="bold" {...props} />,
  h2: props => (
    <Text
      as="h2"
      variant="title3"
      {...props}
      color="labelSecondary"
      marginTop="2"
      marginBottom="6"
      weight="bold"
    />
  ),
  h3: props => (
    <Text
      as="h3"
      variant="title2"
      weight="semibold"
      marginTop="11"
      marginBottom="4"
      {...props}
    />
  ),
  p: props => (
    <Text
      as="p"
      color="labelSecondary"
      marginBottom="4"
      style={{ fontWeight: 500 }}
      {...props}
    />
  ),
  a: props => <Link {...props} />,
  Img: props => <Box as="img" {...props} display="block" maxWidth="full" />,
  ol: props => <Box as="ol" paddingLeft="4" {...props} />,
  li: props => (
    <Text
      as="li"
      variant="base"
      {...props}
      style={{ listStyle: 'none', display: 'flex', alignItems: 'center' }}
    />
  ),
  pre: ({ children, ...props }) => {
    return (
      <Box as="pre" className={pre} marginY="9" {...props}>
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
};
