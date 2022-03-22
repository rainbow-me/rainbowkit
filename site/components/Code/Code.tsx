import React from 'react';

import { code } from './Code.css';

type CodeProps = React.ComponentProps<'code'> & {
  variant?: 'primary' | 'secondary';
};

export function Code({ variant = 'primary', ...props }: CodeProps) {
  return <code className={code[variant]} {...props} />;
}
