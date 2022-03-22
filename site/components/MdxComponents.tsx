/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable jsx-a11y/heading-has-content */
import { pre } from 'css/pre.css';
import { body, headline, text, title2, titleLarge } from 'css/text.css';
import { vars } from 'css/vars.css';
import React from 'react';
import { Link } from './Link/Link';
import { PropsTable } from './PropsTable/PropsTable';

export const components = {
  h1: props => <h1 className={titleLarge} {...props} />,
  h2: props => (
    <h2
      className={headline}
      {...props}
      style={{ color: vars.colors.labelSecondary, marginBottom: 24 }}
    />
  ),
  h3: props => <h3 className={title2} {...props} />,
  p: props => (
    <p
      className={body}
      style={{ fontWeight: 600, color: vars.colors.labelSecondary }}
      {...props}
    />
  ),
  a: props => <Link {...props} />,
  Img: props => (
    // eslint-disable-next-line jsx-a11y/alt-text
    <img {...props} style={{ display: 'block', maxWidth: '100%' }} />
  ),
  li: props => <p className={text[3]} style={{ lineHeight: 1.5 }} {...props} />,
  pre: ({ children, ...props }) => {
    return (
      <pre
        className={pre}
        style={{ marginTop: vars.space[9], marginBottom: vars.space[9] }}
        {...props}
      >
        {children}
      </pre>
    );
  },
  PropsTable: props => <PropsTable aria-label="Component Props" {...props} />,
};
