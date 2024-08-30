import * as PopoverPrimitive from '@radix-ui/react-popover';
import type React from 'react';
import { forwardRef } from 'react';
import { content } from './Popover.css';

export const Popover = PopoverPrimitive.Root;
export const PopoverTrigger = PopoverPrimitive.Trigger;

export const PopoverContent = forwardRef<
  React.ElementRef<typeof PopoverPrimitive.Content>,
  React.ComponentProps<typeof PopoverPrimitive.Content>
>(({ children, ...props }, forwardedRef) => (
  <PopoverPrimitive.Content
    className={content}
    side="top"
    sideOffset={5}
    {...props}
    ref={forwardedRef}
  >
    {children}
  </PopoverPrimitive.Content>
));

PopoverContent.displayName = 'PopoverContent';
