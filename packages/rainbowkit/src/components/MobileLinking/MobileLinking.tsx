import React, { useContext } from 'react';
import { Box } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { WalletButton } from '../ConnectOptions/MobileOptions';
import { RainbowButtonContext } from '../RainbowKitProvider/RainbowButtonContext';
import { Text } from '../Text/Text';

const MobileLinking = ({ onClose }: { onClose: () => void }) => {
  const { connector } = useContext(RainbowButtonContext);

  return (
    <Box>
      <Box
        display="flex"
        paddingTop="24"
        paddingBottom="32"
        justifyContent="center"
        alignItems="center"
        background="profileForeground"
        flexDirection="column"
      >
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
            Continue in {connector?.name}
          </Text>
        </Box>

        <Box maxWidth="310" marginTop="8">
          <Text textAlign="center" color="modalText" size="16" weight="medium">
            Accept connection request in the wallet
          </Text>
        </Box>

        <Box
          display="flex"
          flexDirection="column"
          alignItems="center"
          marginTop="16"
        >
          <ActionButton label={'Dismiss'} size="medium" onClick={onClose} />
        </Box>
      </Box>
    </Box>
  );
};

export default MobileLinking;
