/* eslint-disable no-extra-boolean-cast */

import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import { Code } from 'components/Code/Code';
import { InfoIcon } from 'components/Icons/Info';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from 'components/Popover/Popover';
import React from 'react';
import { regionWrapper, table, td, th } from './PropsTable.css';

type PropDef = {
  name: string;
  required?: boolean;
  default?: string | boolean;
  type: string;
  typeSimple: string;
  description?: string;
};

export function PropsTable({
  'aria-label': ariaLabel,
  data,
}: {
  'data': PropDef[];
  'aria-label'?: string;
}) {
  return (
    <Box
      aria-label={ariaLabel}
      className={regionWrapper}
      marginBottom="9"
      role="region"
      tabIndex={0}
    >
      <Box as="table" className={table}>
        <Box as="thead">
          <Box as="tr">
            <Box as="th" className={th}>
              Prop
            </Box>
            <Box as="th" className={th}>
              Type
            </Box>
            <Box as="th" className={th}>
              Default
            </Box>
          </Box>
        </Box>
        <Box as="tbody">
          {data.map(
            (
              {
                default: defaultValue,
                description,
                name,
                required,
                type,
                typeSimple,
              },
              i
            ) => (
              <Box as="tr" key={`${name}-${i}`}>
                <Box as="td" className={td}>
                  <Code>
                    {name}
                    {required ? '*' : null}
                  </Code>
                  {description && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          marginLeft="2"
                          shape="circle"
                          size="xs"
                          style={{ verticalAlign: 'middle' }}
                          variant="ghost"
                        >
                          <InfoIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>{description}</PopoverContent>
                    </Popover>
                  )}
                </Box>
                <Box as="td" className={td}>
                  <Code>{Boolean(typeSimple) ? typeSimple : type} </Code>
                  {Boolean(typeSimple) && (
                    <Popover>
                      <PopoverTrigger asChild>
                        <Button
                          marginLeft="2"
                          shape="circle"
                          size="xs"
                          style={{ verticalAlign: 'middle' }}
                          variant="ghost"
                        >
                          <InfoIcon />
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent>
                        <Code style={{ whiteSpace: 'normal' }}>{type}</Code>
                      </PopoverContent>
                    </Popover>
                  )}
                </Box>
                <Box as="td" className={td}>
                  {Boolean(defaultValue) ? <Code>{defaultValue}</Code> : <>–</>}
                </Box>
              </Box>
            )
          )}
        </Box>
      </Box>
    </Box>
  );
}
