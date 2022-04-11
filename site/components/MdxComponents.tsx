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
      color="labelSecondary"
      marginTop="1"
      marginBottom="6"
      weight="medium"
      {...props}
    />
  ),
  h3: ({ id, ...props }) => {
    return (
      <span id={id} style={{ scrollMarginTop: 100 }}>
        <Text
          as="h3"
          variant="title2"
          weight="semibold"
          marginTop="11"
          marginBottom="2"
          {...props}
        />
      </span>
    );
  },
  h4: props => (
    <Text
      as="h4"
      variant="title3"
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
  li: ({ children, ...props }) => (
    <li
      {...props}
      style={{ listStyle: 'none', display: 'flex', alignItems: 'center' }}
    >
      <Text variant="body" style={{ fontWeight: 500, lineHeight: '25px' }}>
        {children}
      </Text>
    </li>
  ),
  pre: ({ children, ...props }) => {
    return (
      <Box as="pre" className={pre} marginTop="5" marginBottom="9" {...props}>
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
  blockquote: props => (
    <Box
      as="blockquote"
      backgroundColor="fillSecondary"
      borderRadius="3"
      paddingTop="5"
      paddingX="5"
      marginBottom="5"
      style={{ overflow: 'hidden' }}
      {...props}
    />
  ),
};
