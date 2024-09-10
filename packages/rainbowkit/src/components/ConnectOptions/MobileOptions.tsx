import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { touchableStyles } from '../../css/touchableStyles';
import { isIOS } from '../../utils/isMobile';
import {
  type WalletConnector,
  useWalletConnectors,
} from '../../wallets/useWalletConnectors';
import { AsyncImage } from '../AsyncImage/AsyncImage';
import { Box } from '../Box/Box';
import { ActionButton } from '../Button/ActionButton';
import { CloseButton } from '../CloseButton/CloseButton';
import { DisclaimerLink } from '../Disclaimer/DisclaimerLink';
import { DisclaimerText } from '../Disclaimer/DisclaimerText';
import { BackIcon } from '../Icons/Back';
import { AppContext } from '../RainbowKitProvider/AppContext';
import { I18nContext } from '../RainbowKitProvider/I18nContext';
import { useCoolMode } from '../RainbowKitProvider/useCoolMode';
import { setWalletConnectDeepLink } from '../RainbowKitProvider/walletConnectDeepLink';
import { Text } from '../Text/Text';
import * as styles from './MobileOptions.css';

const LoadingSpinner = ({ wallet }: { wallet: WalletConnector }) => {
  const width = 80;
  const height = 80;
  const radiusFactor = 20;

  const perimeter = 2 * (width + height - 4 * radiusFactor);

  return (
    <svg className={styles.spinner} viewBox="0 0 86 86" width="86" height="86">
      <title>Loading</title>
      <rect
        x="3"
        y="3"
        width={width}
        height={height}
        rx={radiusFactor}
        ry={radiusFactor}
        strokeDasharray={`${perimeter / 3} ${(2 * perimeter) / 3}`}
        strokeDashoffset={perimeter} // Adjust this value as per your design needs
        className={styles.rotatingBorder}
        style={{
          // Prop style passing works only in `@vanilla-extract/recipes`.
          // Instead downloading packages we can do this
          // manually without passing props
          stroke: wallet?.iconAccent || '#0D3887',
        }}
      />
    </svg>
  );
};

export function WalletButton({
  onClose,
  wallet,
  connecting,
}: {
  wallet: WalletConnector;
  onClose: () => void;
  connecting?: boolean;
}) {
  const {
    connect,
    iconBackground,
    iconUrl,
    id,
    name,
    getMobileUri,
    ready,
    shortName,
    showWalletConnectModal,
  } = wallet;

  const coolModeRef = useCoolMode(iconUrl);
  const initialized = useRef(false);

  const { i18n } = useContext(I18nContext);

  const onConnect = useCallback(async () => {
    const onMobileUri = async () => {
      const mobileUri = await getMobileUri?.();

      if (!mobileUri) return;

      if (mobileUri) {
        setWalletConnectDeepLink({ mobileUri, name });
      }

      if (mobileUri.startsWith('http')) {
        // Workaround for https://github.com/rainbow-me/rainbowkit/issues/524.
        // Using 'window.open' causes issues on iOS in non-Safari browsers and
        // WebViews where a blank tab is left behind after connecting.
        // This is especially bad in some WebView scenarios (e.g. following a
        // link from Twitter) where the user doesn't have any mechanism for
        // closing the blank tab.
        // For whatever reason, links with a target of "_blank" don't suffer
        // from this problem, and programmatically clicking a detached link
        // element with the same attributes also avoids the issue.
        const link = document.createElement('a');
        link.href = mobileUri;
        link.target = '_blank';
        link.rel = 'noreferrer noopener';
        link.click();
      } else {
        window.location.href = mobileUri;
      }
    };

    if (id !== 'walletConnect') onMobileUri();

    // If the id is "walletConnect" then "showWalletConnectModal" will always be true
    if (showWalletConnectModal) {
      showWalletConnectModal();
      onClose?.();
      return;
    }

    connect?.();
  }, [connect, getMobileUri, showWalletConnectModal, onClose, name, id]);

  useEffect(() => {
    // When using `reactStrictMode: true` in development mode the useEffect hook
    // will fire twice. We avoid this by using `useRef` logic here. Works for now.
    if (connecting && !initialized.current) {
      onConnect();
      initialized.current = true;
    }
  }, [connecting, onConnect]);

  return (
    <Box
      as="button"
      color={ready ? 'modalText' : 'modalTextSecondary'}
      disabled={!ready}
      fontFamily="body"
      key={id}
      onClick={onConnect}
      ref={coolModeRef}
      style={{ overflow: 'visible', textAlign: 'center' }}
      testId={`wallet-option-${id}`}
      type="button"
      width="full"
    >
      <Box
        alignItems="center"
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          paddingBottom="8"
          paddingTop="10"
          position="relative"
        >
          {connecting ? <LoadingSpinner wallet={wallet} /> : null}
          <AsyncImage
            background={iconBackground}
            borderRadius="13"
            boxShadow="walletLogo"
            height="60"
            src={iconUrl}
            width="60"
          />
        </Box>
        {!connecting ? (
          <Box display="flex" flexDirection="column" textAlign="center">
            <Text
              as="h2"
              color={wallet.ready ? 'modalText' : 'modalTextSecondary'}
              size="13"
              weight="medium"
            >
              {/* Fix button text clipping in Safari: https://stackoverflow.com/questions/41100273/overflowing-button-text-is-being-clipped-in-safari */}
              <Box as="span" position="relative">
                {shortName ?? name}
                {!wallet.ready && ' (unsupported)'}
              </Box>
            </Text>

            {wallet.recent && (
              <Text color="accentColor" size="12" weight="medium">
                {i18n.t('connect.recent')}
              </Text>
            )}
          </Box>
        ) : null}
      </Box>
    </Box>
  );
}

enum MobileWalletStep {
  Connect = 'CONNECT',
  Get = 'GET',
}

export function MobileOptions({ onClose }: { onClose: () => void }) {
  const titleId = 'rk_connect_title';
  const wallets = useWalletConnectors().filter(
    (wallet) => wallet.isRainbowKitConnector,
  );
  const { disclaimer: Disclaimer, learnMoreUrl } = useContext(AppContext);

  let headerLabel = null;
  let walletContent = null;
  let headerBackgroundContrast = false;
  let headerBackButtonLink: MobileWalletStep | null = null;

  const [walletStep, setWalletStep] = useState<MobileWalletStep>(
    MobileWalletStep.Connect,
  );

  const { i18n } = useContext(I18nContext);

  const ios = isIOS();

  switch (walletStep) {
    case MobileWalletStep.Connect: {
      headerLabel = i18n.t('connect.title');
      headerBackgroundContrast = true;
      walletContent = (
        <Box>
          <Box
            background="profileForeground"
            className={styles.scroll}
            display="flex"
            paddingBottom="20"
            paddingTop="6"
          >
            <Box display="flex" style={{ margin: '0 auto' }}>
              {wallets
                .filter((wallet) => wallet.ready)
                .map((wallet) => {
                  return (
                    <Box key={wallet.id} paddingX="20">
                      <Box width="60">
                        <WalletButton onClose={onClose} wallet={wallet} />
                      </Box>
                    </Box>
                  );
                })}
            </Box>
          </Box>

          <Box
            background="generalBorder"
            height="1"
            marginBottom="32"
            marginTop="-1"
          />

          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap="32"
            paddingX="32"
            style={{ textAlign: 'center' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="8"
              textAlign="center"
            >
              <Text color="modalText" size="16" weight="bold">
                {i18n.t('intro.title')}
              </Text>
              <Text color="modalTextSecondary" size="16">
                {i18n.t('intro.description')}
              </Text>
            </Box>
          </Box>

          <Box paddingTop="32" paddingX="20">
            <Box display="flex" gap="14" justifyContent="center">
              <ActionButton
                label={i18n.t('intro.get.label')}
                onClick={() => setWalletStep(MobileWalletStep.Get)}
                size="large"
                type="secondary"
              />
              <ActionButton
                href={learnMoreUrl}
                label={i18n.t('intro.learn_more.label')}
                size="large"
                type="secondary"
              />
            </Box>
          </Box>
          {Disclaimer && (
            <Box marginTop="28" marginX="32" textAlign="center">
              <Disclaimer Link={DisclaimerLink} Text={DisclaimerText} />
            </Box>
          )}
        </Box>
      );
      break;
    }
    case MobileWalletStep.Get: {
      headerLabel = i18n.t('get.title');
      headerBackButtonLink = MobileWalletStep.Connect;

      const mobileWallets = wallets
        ?.filter(
          (wallet) =>
            wallet.downloadUrls?.ios ||
            wallet.downloadUrls?.android ||
            wallet.downloadUrls?.mobile,
        )
        ?.splice(0, 3);

      walletContent = (
        <Box>
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            height="full"
            marginBottom="36"
            marginTop="5"
            paddingTop="12"
            width="full"
          >
            {mobileWallets.map((wallet, index) => {
              const { downloadUrls, iconBackground, iconUrl, name } = wallet;

              if (
                !downloadUrls?.ios &&
                !downloadUrls?.android &&
                !downloadUrls?.mobile
              ) {
                return null;
              }

              return (
                <Box
                  display="flex"
                  gap="16"
                  key={wallet.id}
                  paddingX="20"
                  width="full"
                >
                  <Box style={{ minHeight: 48, minWidth: 48 }}>
                    <AsyncImage
                      background={iconBackground}
                      borderColor="generalBorder"
                      borderRadius="10"
                      height="48"
                      src={iconUrl}
                      width="48"
                    />
                  </Box>
                  <Box display="flex" flexDirection="column" width="full">
                    <Box alignItems="center" display="flex" height="48">
                      <Box width="full">
                        <Text color="modalText" size="18" weight="bold">
                          {name}
                        </Text>
                      </Box>
                      <ActionButton
                        href={
                          (ios ? downloadUrls?.ios : downloadUrls?.android) ||
                          downloadUrls?.mobile
                        }
                        label={i18n.t('get.action.label')}
                        size="small"
                        type="secondary"
                      />
                    </Box>
                    {index < mobileWallets.length - 1 && (
                      <Box
                        background="generalBorderDim"
                        height="1"
                        marginY="10"
                        width="full"
                      />
                    )}
                  </Box>
                </Box>
              );
            })}
          </Box>
          {/* spacer */}
          <Box style={{ marginBottom: '42px' }} />
          <Box
            alignItems="center"
            display="flex"
            flexDirection="column"
            gap="36"
            paddingX="36"
            style={{ textAlign: 'center' }}
          >
            <Box
              display="flex"
              flexDirection="column"
              gap="12"
              textAlign="center"
            >
              <Text color="modalText" size="16" weight="bold">
                {i18n.t('get.looking_for.title')}
              </Text>
              <Text color="modalTextSecondary" size="16">
                {i18n.t('get.looking_for.mobile.description')}
              </Text>
            </Box>
          </Box>
        </Box>
      );
      break;
    }
  }

  return (
    <Box display="flex" flexDirection="column" paddingBottom="36">
      {/* header section */}
      <Box
        background={
          headerBackgroundContrast ? 'profileForeground' : 'modalBackground'
        }
        display="flex"
        flexDirection="column"
        paddingBottom="4"
        paddingTop="14"
      >
        <Box
          display="flex"
          justifyContent="center"
          paddingBottom="6"
          paddingX="20"
          position="relative"
        >
          {headerBackButtonLink && (
            <Box
              display="flex"
              position="absolute"
              style={{
                left: 0,
                marginBottom: -20,
                marginTop: -20,
              }}
            >
              <Box
                alignItems="center"
                as="button"
                className={touchableStyles({
                  active: 'shrinkSm',
                  hover: 'growLg',
                })}
                color="accentColor"
                display="flex"
                marginLeft="4"
                marginTop="20"
                onClick={() => setWalletStep(headerBackButtonLink!)}
                padding="16"
                style={{ height: 17, willChange: 'transform' }}
                transition="default"
                type="button"
              >
                <BackIcon />
              </Box>
            </Box>
          )}

          <Box marginTop="4" textAlign="center" width="full">
            <Text
              as="h1"
              color="modalText"
              id={titleId}
              size="20"
              weight="bold"
            >
              {headerLabel}
            </Text>
          </Box>

          <Box
            alignItems="center"
            display="flex"
            height="32"
            paddingRight="14"
            position="absolute"
            right="0"
          >
            <Box
              style={{ marginBottom: -20, marginTop: -20 }} // Vertical bleed
            >
              <CloseButton onClose={onClose} />
            </Box>
          </Box>
        </Box>
      </Box>
      <Box display="flex" flexDirection="column">
        {walletContent}
      </Box>
    </Box>
  );
}
