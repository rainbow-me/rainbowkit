/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-sort-props */
/* eslint-disable sort-keys-fix/sort-keys-fix */
import copy from 'copy-to-clipboard';
import { pre } from 'css/pre.css';
import { vars } from 'css/vars.css';
import React, { useState } from 'react';
import { Box } from './Box/Box';
import { Button } from './Button/Button';
import { Code } from './Code/Code';
import { CoolMode } from './CoolMode/CoolMode';
import { Link } from './Link/Link';
import { PropsTable } from './PropsTable/PropsTable';
import { Text } from './Text/Text';

export const components = {
  h1: props => (
    <Text
      as="h1"
      variant="titleLarge"
      weight="heavy"
      marginBottom="1"
      {...props}
    />
  ),
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
  ul: props => <Box as="ul" paddingLeft="3" marginBottom="5" {...props} />,
  ol: props => <Box as="ol" paddingLeft="4" marginBottom="5" {...props} />,
  li: ({ children, ...props }) => (
    <li
      {...props}
      style={{ listStyle: 'none', display: 'flex', alignItems: 'center' }}
    >
      <Text
        variant="body"
        color="labelSecondary"
        style={{ fontWeight: 500, lineHeight: '25px' }}
      >
        {children}
      </Text>
    </li>
  ),
  pre: ({ children, ...props }) => {
    const [requestCopy, setRequestCopy] = useState(false);
    const [code, setCode] = React.useState(undefined);
    const preRef = React.useRef(null);

    React.useEffect(() => {
      if (preRef.current) {
        const codeElement = preRef.current.querySelector('code');
        const code = codeElement.innerText.replace(/\n{2,}/g, '\n');
        setCode(code);
      }
    }, [preRef]);

    React.useEffect(() => {
      if (requestCopy) copy(code);
      setTimeout(() => setRequestCopy(false), 1500);
    }, [requestCopy, code]);

    return (
      <Box
        position="relative"
        borderRadius="5"
        marginY="5"
        style={{ overflow: 'hidden' }}
      >
        <Box
          as="pre"
          ref={preRef}
          className={pre}
          marginTop="5"
          marginBottom="9"
          style={{
            boxShadow: `inset 0 0 1px ${vars.colors.separator}, 0px 2px 8px rgba(27, 29, 31, 0.02)`,
          }}
          {...props}
        >
          {children}
        </Box>
        <Box position="absolute" top="3" right="3" data-copy>
          <Button
            shape="square"
            variant="blue"
            size="xl"
            onClick={() => setRequestCopy(true)}
            tabIndex={-1}
            style={{
              backgroundColor: `${vars.colors.lightBlue}`,
              boxShadow: `0 0 8px ${vars.colors.fillElevated}`,
            }}
          >
            {requestCopy ? <CheckIcon /> : <CopyIcon />}
          </Button>
        </Box>
        <div data-pre-gradient />
      </Box>
    );
  },
  code: ({ children, ...props }) => {
    const isInline = typeof children === 'string';
    return isInline ? (
      <Code
        style={{
          backgroundColor: vars.colors.fillElevated,
          paddingLeft: vars.space[2],
          paddingRight: vars.space[2],
          borderRadius: vars.radii[1],
          boxShadow: `inset 0 0 1px ${vars.colors.separator}, 0px 2px 8px rgba(27, 29, 31, 0.02)`,
        }}
        {...props}
      >
        {children}
      </Code>
    ) : (
      <code>{children}</code>
    );
  },
  PropsTable: props => <PropsTable aria-label="Component Props" {...props} />,
  blockquote: props => (
    <Box
      as="blockquote"
      borderRadius="3"
      paddingTop="5"
      paddingX="5"
      marginBottom="5"
      borderWidth="1"
      borderColor="fillElevated"
      style={{
        overflow: 'hidden',
        backgroundImage: `radial-gradient(circle at 240px -80px, ${vars.colors.backgroundElevated} 0%, ${vars.colors.fillElevated} 100%)`,
      }}
      {...props}
    />
  ),
  CoolMode,
};

const CopyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
    <path
      fill="currentColor"
      d="M3.875 19.727c0 1.687.867 2.562 2.54 2.562h7.312c1.671 0 2.53-.883 2.53-2.562V18.28h1.329c1.672 0 2.539-.875 2.539-2.562V9.53c0-1.023-.21-1.68-.828-2.312L15.398 3.25c-.585-.602-1.28-.828-2.18-.828h-2.945c-1.664 0-2.539.875-2.539 2.562v1.438h-1.32c-1.672 0-2.539.883-2.539 2.562v10.743Zm11.602-8.211L11.242 7.21c-.601-.61-1.11-.774-1.976-.781V5.07c0-.718.382-1.117 1.14-1.117h3.266v3.735c0 .968.515 1.468 1.476 1.468h3.446v6.469c0 .727-.375 1.125-1.14 1.125h-1.196v-3.031c0-1.055-.125-1.54-.781-2.203Zm-.524-4.024V4.586l3.242 3.289h-2.86c-.265 0-.382-.11-.382-.383Zm-9.547 12.14V9.079c0-.719.375-1.125 1.133-1.125h2.399v4.281c0 1.118.554 1.664 1.664 1.664h4.125v5.735c0 .726-.375 1.125-1.133 1.125H6.539c-.758 0-1.133-.399-1.133-1.125Zm5.344-7.085c-.32 0-.46-.14-.46-.461V8.25l4.226 4.297H10.75Z"
    />
  </svg>
);

const CheckIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none">
    <path
      fill="currentColor"
      d="M11.375 20.328c.414 0 .727-.172.953-.508l7.344-11.453c.164-.25.226-.469.226-.68 0-.539-.375-.914-.921-.914-.383 0-.61.133-.844.5l-6.79 10.782-3.5-4.492c-.226-.305-.46-.43-.804-.43-.547 0-.945.39-.945.93 0 .234.086.46.281.703l4.047 5.062c.273.336.562.5.953.5ZM7.086 5.445c.101 0 .164-.07.18-.164.226-1.297.218-1.32 1.57-1.578.101-.015.164-.078.164-.18 0-.101-.063-.164-.164-.18-1.352-.273-1.32-.296-1.57-1.57-.016-.101-.079-.164-.18-.164-.102 0-.164.063-.18.157-.258 1.289-.218 1.32-1.578 1.578-.094.015-.164.078-.164.18 0 .101.063.163.164.18 1.36.273 1.336.288 1.578 1.577.016.094.078.164.18.164Zm3.75 5.383c.164 0 .273-.11.297-.281.25-2.078.344-2.133 2.453-2.469.187-.023.305-.125.305-.297 0-.156-.118-.265-.266-.289-2.133-.414-2.242-.398-2.492-2.469-.024-.171-.133-.28-.297-.28-.156 0-.274.109-.297.273-.266 2.109-.336 2.171-2.484 2.476a.284.284 0 0 0-.266.29c0 .163.11.265.258.296 2.164.422 2.219.414 2.492 2.485.024.156.14.265.297.265Z"
    />
  </svg>
);
