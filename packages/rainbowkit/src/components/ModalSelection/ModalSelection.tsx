import React from 'react';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box } from '../Box/Box';
import { HoverClassName, SelectedClassName } from './ModalSelection.css';

type Props = {
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  as?: React.ElementType<any>;
  currentlySelected?: boolean;
  ready?: boolean;
  name: string;
  iconUrl: string | (() => Promise<string>);
  iconBackground?: string;
};

export const ModalSelection = React.forwardRef(
  (
    {
      as = 'button',
      currentlySelected = false,
      iconBackground,
      iconUrl,
      name,
      onClick,
      ready,
      ...urlProps
    }: Props,
    ref: React.Ref<HTMLElement>
  ) => {
    return (
      <Box
        as={as}
        className={currentlySelected ? SelectedClassName : HoverClassName}
        disabled={currentlySelected}
        onClick={onClick}
        ref={ref}
        style={{ willChange: 'transform' }}
        {...urlProps}
      >
        <Box
          color={currentlySelected ? 'actionButtonText' : 'modalText'}
          disabled={!ready}
          fontFamily="body"
          fontSize="16"
          fontWeight="bold"
          transition="default"
        >
          <Box alignItems="center" display="flex" flexDirection="row" gap="12">
            <AsyncImage
              background={iconBackground}
              borderColor="actionButtonBorder"
              borderRadius="6"
              height="28"
              src={iconUrl}
              width="28"
            />
            <div>{name}</div>
          </Box>
        </Box>
      </Box>
    );
  }
);

ModalSelection.displayName = 'ModalSelection';
