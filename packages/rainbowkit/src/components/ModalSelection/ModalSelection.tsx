import React from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box } from '../Box/Box';
import { I18nContext } from '../RainbowKitProvider/I18nContext';
import { useCoolMode } from '../RainbowKitProvider/useCoolMode';
import { Text } from '../Text/Text';
import * as styles from './ModalSelection.css';

type Props = {
  onClick?: React.MouseEventHandler<HTMLElement> | undefined;
  as?: React.ElementType<any>;
  currentlySelected?: boolean;
  ready?: boolean;
  recent?: boolean;
  name: string;
  iconUrl: string | (() => Promise<string>);
  iconBackground?: string;
  testId?: string;
  isRainbowKitConnector?: boolean;
};

export const ModalSelection = ({
  as = 'button',
  currentlySelected = false,
  iconBackground,
  iconUrl,
  name,
  onClick,
  ready,
  recent,
  testId,
  isRainbowKitConnector,
  ...urlProps
}: Props) => {
  const coolModeRef = useCoolMode(iconUrl);
  const [isMouseOver, setIsMouseOver] = React.useState<boolean>(false);

  const { i18n } = React.useContext(I18nContext);

  return (
    <Box
      display="flex"
      flexDirection="column"
      onMouseEnter={() => setIsMouseOver(true)}
      onMouseLeave={() => setIsMouseOver(false)}
      ref={coolModeRef}
    >
      <Box
        as={as}
        borderRadius="menuButton"
        borderStyle="solid"
        borderWidth="1"
        className={
          !currentlySelected
            ? [
                styles.transparentBorder,
                touchableStyles({
                  active: 'shrink',
                }),
              ]
            : undefined
        }
        disabled={currentlySelected}
        onClick={onClick}
        padding="5"
        style={{ willChange: 'transform' }}
        testId={testId}
        transition="default"
        width="full"
        {...(currentlySelected
          ? {
              background: 'accentColor',
              borderColor: 'selectedOptionBorder',
              boxShadow: 'selectedWallet',
            }
          : {
              background: { hover: 'menuItemBackground' },
            })}
        {...urlProps}
      >
        <Box
          color={currentlySelected ? 'accentColorForeground' : 'modalText'}
          disabled={!ready}
          fontFamily="body"
          fontSize="16"
          fontWeight="bold"
          transition="default"
        >
          <Box alignItems="center" display="flex" flexDirection="row" gap="12">
            <AsyncImage
              background={iconBackground}
              {...(!isMouseOver && isRainbowKitConnector
                ? { borderColor: 'actionButtonBorder' }
                : {})}
              // We want to use pure <img /> element
              // to avoid bugs with eip6963 icons as sometimes
              // background: url(...) does not work
              useAsImage={!isRainbowKitConnector}
              borderRadius="6"
              height="28"
              src={iconUrl}
              width="28"
            />
            <Box>
              <Box
                style={{ marginTop: recent ? -2 : undefined }}
                maxWidth="200"
              >
                {name}
              </Box>
              {recent && (
                <Text
                  color={
                    currentlySelected ? 'accentColorForeground' : 'accentColor'
                  }
                  size="12"
                  style={{ lineHeight: 1, marginTop: -1 }}
                  weight="medium"
                >
                  {i18n.t('connect.recent')}
                </Text>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

ModalSelection.displayName = 'ModalSelection';
