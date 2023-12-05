import React, { useContext } from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { Box } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { DisclaimerLink } from '../Disclaimer/DisclaimerLink';
import { DisclaimerText } from '../Disclaimer/DisclaimerText';
import { AssetsIcon } from '../Icons/Assets';
import { LoginIcon } from '../Icons/Login';
import { AppContext } from '../RainbowKitProvider/AppContext';
import { I18nContext } from '../RainbowKitProvider/I18nContext';
import { Text } from '../Text/Text';

export function ConnectModalIntro({
  compactModeEnabled = false,
  getWallet,
}: {
  compactModeEnabled?: boolean;
  getWallet: () => void;
}) {
  const { disclaimer: Disclaimer, learnMoreUrl } = useContext(AppContext);
  const { i18n } = useContext(I18nContext);

  return (
    <>
      <Box
        alignItems="center"
        color="accentColor"
        display="flex"
        flexDirection="column"
        height="full"
        justifyContent="space-around"
      >
        <Box marginBottom="10">
          {!compactModeEnabled && (
            <Text color="modalText" size="18" weight="heavy">
              {i18n.t('intro.title')}
            </Text>
          )}
        </Box>
        <Box
          display="flex"
          flexDirection="column"
          gap="32"
          justifyContent="center"
          marginY="20"
          style={{ maxWidth: 312 }}
        >
          <Box alignItems="center" display="flex" flexDirection="row" gap="16">
            <Box borderRadius="6" height="48" minWidth="48" width="48">
              <AssetsIcon />
            </Box>
            <Box display="flex" flexDirection="column" gap="4">
              <Text color="modalText" size="14" weight="bold">
                {i18n.t('intro.digital_asset.title')}
              </Text>
              <Text color="modalTextSecondary" size="14" weight="medium">
                {i18n.t('intro.digital_asset.description')}
              </Text>
            </Box>
          </Box>
          <Box alignItems="center" display="flex" flexDirection="row" gap="16">
            <Box borderRadius="6" height="48" minWidth="48" width="48">
              <LoginIcon />
            </Box>
            <Box display="flex" flexDirection="column" gap="4">
              <Text color="modalText" size="14" weight="bold">
                {i18n.t('intro.login.title')}
              </Text>
              <Text color="modalTextSecondary" size="14" weight="medium">
                {i18n.t('intro.login.description')}
              </Text>
            </Box>
          </Box>
        </Box>
        <Box
          alignItems="center"
          display="flex"
          flexDirection="column"
          gap="12"
          justifyContent="center"
          margin="10"
        >
          <ActionButton label={i18n.t('intro.get.label')} onClick={getWallet} />
          <Box
            as="a"
            className={touchableStyles({ active: 'shrink', hover: 'grow' })}
            display="block"
            href={learnMoreUrl}
            paddingX="12"
            paddingY="4"
            rel="noreferrer"
            style={{ willChange: 'transform' }}
            target="_blank"
            transition="default"
          >
            <Text color="accentColor" size="14" weight="bold">
              {i18n.t('intro.learn_more.label')}
            </Text>
          </Box>
        </Box>
        {Disclaimer && !compactModeEnabled && (
          <Box marginBottom="8" marginTop="12" textAlign="center">
            <Disclaimer Link={DisclaimerLink} Text={DisclaimerText} />
          </Box>
        )}
      </Box>
    </>
  );
}
