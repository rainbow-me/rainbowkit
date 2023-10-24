import React, { useContext } from 'react';
import { Box } from '../Box/Box';
import { CloseButton } from '../CloseButton/CloseButton';
import { WalletButton } from '../ConnectOptions/MobileOptions';
import { I18nContext } from '../RainbowKitProvider/I18nContext';
import { RainbowButtonContext } from '../RainbowKitProvider/RainbowButtonContext';
import { Text } from '../Text/Text';

const MobileLinking = ({ onClose }: { onClose: () => void }) => {
  const { connector } = useContext(RainbowButtonContext);
  const i18n = useContext(I18nContext);
  const connectorName = connector?.name || '';

  return (
    <Box>
      <Box
        display="flex"
        paddingBottom="32"
        justifyContent="center"
        alignItems="center"
        background="profileForeground"
        flexDirection="column"
      >
        <Box
          width="full"
          display="flex"
          justifyContent="flex-end"
          marginTop="18"
          marginRight="24"
        >
          <CloseButton onClose={onClose} />
        </Box>
        <Box width="60">
          <WalletButton
            isCustomConnector
            onClose={onClose}
            wallet={connector!}
          />
        </Box>
        <Box marginTop="20">
          <Text
            textAlign="center"
            color="modalText"
            size="18"
            weight="semibold"
          >
            {i18n.t('connect.status.connect_mobile', {
              wallet: connectorName,
            })}
          </Text>
        </Box>

        <Box maxWidth="310" marginTop="8">
          <Text textAlign="center" color="modalText" size="16" weight="medium">
            {i18n.t('connect.status.confirm_mobile', {
              wallet: connectorName,
            })}
          </Text>
        </Box>
      </Box>
    </Box>
  );
};

export default MobileLinking;
