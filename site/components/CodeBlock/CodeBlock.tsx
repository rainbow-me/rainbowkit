// Inspired by https://github.com/rexxars/react-refractor
import { Pre } from 'components/Pre/Pre';
import { toHtml } from 'hast-util-to-html';
import React from 'react';
import { refractor } from 'refractor';
import tsx from 'refractor/lang/tsx';

refractor.register(tsx);

type PreProps = React.ComponentProps<typeof Pre>;

type CodeBlockProps = PreProps & {
  value: string;
};

export const CodeBlock = React.forwardRef<HTMLPreElement, CodeBlockProps>(
  (_props, forwardedRef) => {
    const { className = '', value, ...props } = _props;
    let result = refractor.highlight(value, 'tsx');

    // convert to html
    result = toHtml(result) as any;

    const classes = `language-${tsx} ${className}`;

    return (
      <Pre className={classes} ref={forwardedRef} {...props}>
        <code
          className={classes}
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: result as unknown as string }}
        />
      </Pre>
    );
  }
);

CodeBlock.displayName = 'CodeBlock';
