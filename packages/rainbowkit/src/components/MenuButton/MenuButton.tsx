import React from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { isMobile } from '../../utils/isMobile';
import { Box } from '../Box/Box';
import * as styles from './MenuButton.css';

type Props = {
  children?: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  currentlySelected?: boolean;
  testId?: string;
};

export const MenuButton = React.forwardRef(
  (
    {
      children,
      currentlySelected = false,
      onClick,
      testId,
      ...urlProps
    }: Props,
    ref: React.Ref<HTMLElement>
  ) => {
    const mobile = isMobile();
    return (
      <Box
        as="button"
        borderRadius="menuButton"
        disabled={currentlySelected}
        display="flex"
        onClick={onClick}
        ref={ref}
        testId={testId}
        type="button"
      >
        <Box
          borderRadius="menuButton"
          className={[
            mobile ? styles.unsetBackgroundOnHover : undefined,
            !currentlySelected && touchableStyles({ active: 'shrink' }),
          ]}
          padding={mobile ? '8' : '6'}
          transition="default"
          width="full"
          {...(currentlySelected
            ? {
                background: 'accentColor',
                borderColor: 'selectedOptionBorder',
                borderStyle: 'solid',
                borderWidth: '1',
                boxShadow: 'selectedOption',
                color: 'accentColorForeground',
              }
            : {
                background: { hover: 'menuItemBackground' },
                color: 'modalText',
                transition: 'default',
              })}
          {...urlProps}
        >
          {children}
        </Box>
      </Box>
    );
  }
);

MenuButton.displayName = 'MenuButton';
