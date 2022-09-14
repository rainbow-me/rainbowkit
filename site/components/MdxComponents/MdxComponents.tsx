/* eslint-disable react-hooks/rules-of-hooks */
import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import { Code } from 'components/Code/Code';
import { CoolMode } from 'components/CoolMode/CoolMode';
import { CheckIcon } from 'components/Icons/Check';
import { CopyIcon } from 'components/Icons/Copy';
import { Link } from 'components/Link/Link';
import { Pre } from 'components/Pre/Pre';
import { PropsTable } from 'components/PropsTable/PropsTable';
import { Text } from 'components/Text/Text';
import copy from 'copy-to-clipboard';
import { vars } from 'css/vars.css';
import NextImage from 'next/image';
import React, { useState } from 'react';

export const components = {
  a: props => <Link {...props} />,
  blockquote: props => (
    <Box
      as="blockquote"
      borderColor="fillElevated"
      borderRadius="3"
      borderWidth="1"
      marginBottom="5"
      paddingTop="5"
      paddingX="5"
      {...props}
      style={{
        backgroundImage: `radial-gradient(circle at 240px -80px, ${vars.colors.backgroundElevated} 0%, ${vars.colors.fillElevated} 100%)`,
        overflow: 'hidden',
      }}
    />
  ),
  code: ({ children, ...props }) => {
    const isInline = typeof children === 'string';
    return isInline ? (
      <Code {...props}>{children}</Code>
    ) : (
      <code>{children}</code>
    );
  },
  CoolMode,
  h1: props => (
    <Text
      as="h1"
      marginBottom="1"
      variant="titleLarge"
      weight="heavy"
      {...props}
    />
  ),
  h2: props => (
    <Text
      as="h2"
      color="labelSecondary"
      marginBottom="6"
      marginTop="1"
      variant="title3"
      weight="medium"
      {...props}
    />
  ),
  h3: ({ id, ...props }) => {
    return (
      <Box id={id} marginBottom="2" marginTop="11" scrollMarginTop="12">
        <Link href={`#${id}`}>
          <Text
            as="h3"
            display="inline"
            variant="title2"
            weight="semibold"
            {...props}
          />
        </Link>
      </Box>
    );
  },
  h4: ({ id, ...props }) => (
    <Box id={id} marginBottom="2" marginTop="10" scrollMarginTop="12">
      <Link href={`#${id}`}>
        <Text
          as="h4"
          display="inline"
          variant="title3"
          weight="semibold"
          {...props}
        />
      </Link>
    </Box>
  ),
  h5: ({ id, ...props }) => (
    <Box id={id} marginBottom="2" scrollMarginTop="2">
      <Link href={`#${id}`}>
        <Text
          as="h5"
          display="inline"
          variant="body"
          weight="semibold"
          {...props}
        />
      </Link>
    </Box>
  ),
  Img: ({ id, src, ...props }) => (
    <Box id={id} marginBottom="8">
      <NextImage layout="responsive" loading="lazy" src={src} {...props} />
    </Box>
  ),
  li: ({ children, ...props }) => (
    <Box alignItems="center" as="li" display="flex" {...props}>
      <Box
        as="span"
        backgroundColor="fill"
        borderRadius="1"
        display="inline-block"
        height="1"
        marginRight="4"
        width="4"
      />
      <Text
        color="labelSecondary"
        style={{ fontWeight: 500, lineHeight: '25px' }}
        variant="body"
      >
        {children}
      </Text>
    </Box>
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
        borderRadius="5"
        marginY="5"
        position="relative"
        ref={preRef}
        style={{ overflow: 'hidden' }}
      >
        <Pre marginBottom="9" marginTop="5" {...props}>
          {children}
        </Pre>
        <Box data-copy position="absolute" right="3" top="3">
          <Button
            onClick={() => setRequestCopy(true)}
            shape="square"
            size="xl"
            style={{
              backgroundColor: `${vars.colors.lightBlue}`,
              boxShadow: `0 0 8px ${vars.colors.fillElevated}`,
            }}
            tabIndex={-1}
            variant="blue"
          >
            {requestCopy ? <CheckIcon /> : <CopyIcon />}
          </Button>
        </Box>
        <div data-pre-gradient />
      </Box>
    );
  },
  PropsTable: props => <PropsTable aria-label="Component Props" {...props} />,
  ul: props => <Box as="ul" marginBottom="5" paddingLeft="3" {...props} />,
  Video: props => (
    <Box
      as="video"
      autoPlay
      borderRadius="3"
      controls
      display="block"
      marginBottom="5"
      muted
      playsInline
      style={{ width: '100%' }}
      {...props}
    />
  ),
};
