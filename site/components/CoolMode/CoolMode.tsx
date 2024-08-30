import { Box } from 'components/Box/Box';
import { Button, type Props as ButtonProps } from 'components/Button/Button';
import { useCoolMode } from 'lib/useCoolMode';
import React from 'react';
import { cool } from './CoolMode.css';

export function CoolMode() {
  const coolCoinbaseRef = useCoolMode('/coinbase.svg');
  const coolMetaMaskRef = useCoolMode('/metaMask.svg');
  const coolRainbowRef = useCoolMode('/rainbow.svg');
  const coolArgentRef = useCoolMode('/argent.svg');
  const coolWalletConnectRef = useCoolMode('/walletConnect.svg');
  const coolTrustRef = useCoolMode('/trust.svg');

  return (
    <Box className={cool} id="cool-mode-demo">
      <Box ref={coolRainbowRef}>
        <CoolButton src="/rainbow.svg">Rainbow</CoolButton>
      </Box>
      <Box ref={coolWalletConnectRef}>
        <CoolButton src="/walletConnect.svg">WalletConnect</CoolButton>
      </Box>
      <Box ref={coolMetaMaskRef}>
        <CoolButton src="/metaMask.svg">MetaMask</CoolButton>
      </Box>
      <Box ref={coolCoinbaseRef}>
        <CoolButton src="/coinbase.svg">Coinbase</CoolButton>
      </Box>
      <Box ref={coolArgentRef}>
        <CoolButton src="/argent.svg">Argent</CoolButton>
      </Box>
      <Box ref={coolTrustRef}>
        <CoolButton src="/trust.svg">Trust</CoolButton>
      </Box>
    </Box>
  );
}

type CoolButtonProps = ButtonProps & { src: string };

function CoolButton(props: CoolButtonProps) {
  return (
    <Button
      prefix={
        <Box
          as="img"
          borderRadius="2"
          size="7"
          src={props.src}
          style={{ pointerEvents: 'none' }}
        />
      }
      size="xl"
      {...props}
      style={{
        justifyContent: 'center',
        userSelect: 'none',
        width: '100%',
      }}
    />
  );
}
