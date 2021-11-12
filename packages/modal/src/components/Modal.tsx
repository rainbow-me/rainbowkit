import React, { Attributes, DetailedHTMLProps, useEffect, useMemo, useState } from 'react'
import type { ModalProps } from '../types'
import close from '../../assets/close.svg'
import next from '../../assets/next.svg'
import { globalStyle, style, styleVariants } from '@vanilla-extract/css'
import type { Wallet } from '@rainbow-me/kit-utils'

import { getWalletInfo } from '@rainbow-me/kit-utils'

type BoxProps = React.ClassAttributes<HTMLDivElement> & React.HTMLAttributes<HTMLDivElement>

const ModalTitleClassName = style({
  fontStyle: 'normal',
  fontWeight: 800,
  fontSize: '20px',
  lineHeight: '24px',
  letterSpacing: '0.4px',
  fontFeatureSettings: "'ss08' on, 'cv09' on",
  color: '#25292e',
  display: 'block',
  marginBottom: '4px'
}) /* styled.span`
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;

  letter-spacing: 0.4px;
  font-feature-settings: 'ss08' on, 'cv09' on;

  color: #25292e;

  display: block;
  margin-bottom: 4px;
` */

export const ModalTitle = ({ className, children, ...props }: BoxProps) => (
  <div className={`${ModalTitleClassName} ${className}`} {...props}>
    {children}
  </div>
)

/* styled.div<{ $isConnecting: boolean }>`
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  z-index: 999;
  position: fixed;
  background: rgba(0, 0, 0, 0.5);
  display: ${(props) => (props.$isConnecting ? 'flex' : 'none')};
  justify-content: center;
  align-items: center;
`
 */

export const ModalOverlay = ({ className, children, isConnecting, ...props }: BoxProps & { isConnecting: boolean }) => (
  <div
    className={`${style({
      width: '100%',
      height: '100vh',
      top: 0,
      left: 0,
      zIndex: 999,
      position: 'fixed',
      background: 'rgba(0, 0, 0, 0.5)',
      justifyContent: 'center',
      alignItems: 'center',
      display: isConnecting ? 'flex' : 'none'
    })} ${className}`}
    {...props}
  >
    {children}
  </div>
)

export const StyledModalClassName = style({
  minHeight: '525px',
  width: '390px',
  padding: '24px',
  position: 'relative',
  background: 'white',
  borderRadius: '24px',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between'
}) /* styled.div`
  min-height: 525px;
  width: 390px;
  padding: 24px;
  position: relative;
  background: #ffffff;
  border-radius: 24px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
` */

export const StyledModal = ({ className, children, ...props }: BoxProps) => (
  <div className={`${StyledModalClassName} ${className}`} {...props}>
    {children}
  </div>
)

const CaptionClassName = style({
  fontStyle: 'normal',
  fontWeight: 'bold',
  fontSize: '1rem',
  lineHeight: '19px',
  letterSpacing: '0.5px',
  fontFeatureSettings: "'ss08' on, 'cv09' on",
  color: 'rgba(60, 66, 82, 0.6)',
  display: 'block'
}) /*  styled.span`
  font-style: normal;
  font-weight: bold;
  font-size: 1rem;
  line-height: 19px;

  letter-spacing: 0.5px;
  font-feature-settings: 'ss08' on, 'cv09' on;

  color: rgba(60, 66, 82, 0.6);

  display: block;
` */

export const Caption = ({ className, children, ...props }: BoxProps) => (
  <div className={`${CaptionClassName} ${className}`} {...props}>
    {children}
  </div>
)

const CloseButtonClassName = style({
  textAlign: 'center',
  letterSpacing: '0.4px',
  color: 'rgba(60, 66, 82, 0.8)',
  fontWeight: 900,
  fontSize: '14px',
  lineHeight: '17px',
  position: 'absolute',
  right: 24,
  top: 24
}) /* styled.button`
  text-align: center;
  letter-spacing: 0.4px;

  color: rgba(60, 66, 82, 0.8);

  font-weight: 900;
  font-size: 14px;
  line-height: 17px;

  position: absolute;

  right: 24px;
  top: 24px;
` */

export const CloseButton = ({ className, children, ...props }: BoxProps) => (
  <div className={`${CloseButtonClassName} ${className}`} {...props}>
    {children}
  </div>
)

const WalletLabelClassName = style({
  fontStyle: 'normal',
  fontWeight: 800,
  fontSize: '20px',
  lineHeight: '24px',
  display: 'flex',
  alignItems: 'center',
  letterSpacing: '0.5px',
  fontFeatureSettings: "'pnum' on, 'lnum' on",
  color: '#25292e',
  textTransform: 'capitalize'
}) /* styled.span`
  font-style: normal;
  font-weight: 800;
  font-size: 20px;
  line-height: 24px;

  display: flex;
  align-items: center;
  letter-spacing: 0.5px;
  font-feature-settings: 'pnum' on, 'lnum' on;

  color: #25292e;

  text-transform: capitalize;
` */

export const WalletLabel = ({ className, children, ...props }: BoxProps) => (
  <div className={`${WalletLabelClassName} ${className}`} {...props}>
    {children}
  </div>
)

/* styled.ul`
  margin-top: 24px;
  list-style-type: none;
  padding-left: 0;

  li {
    margin-bottom: 12px;
    padding: 11px;
    width: unset;
  }

  li button {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    width: 100%;
    background: none;
    border: none;
  }

  li img:first-child {
    margin-right: 12px;
    height: 34px;
    width: 34px;
  }
` */

const TermsClassName = style({
  fontWeight: 600,
  color: 'rgba(60, 66, 82, 0.6)',
  fontSize: '14px',
  lineHeight: 1.5
})

globalStyle(`${TermsClassName} > a`, {
  color: '#a0c7ff',
  fontWeight: 700,
  textDecoration: 'none',
  ':hover': {
    textDecoration: 'underline'
  }
})

const Terms = ({ className, children, ...props }: BoxProps) => (
  <div className={`${TermsClassName} ${className}`} {...props}>
    {children}
  </div>
)

const MoreWalletsClassName = style({
  width: '100%',
  display: 'flex',
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: '11px'
}) /* styled.button`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 11px;
  & > div {
    display: inherit;
    flex-direction: inherit;
  }
` */

const MoreWallets = ({ className, children, ...props }: BoxProps) => (
  <div className={`${MoreWalletsClassName} ${className}`} {...props}>
    {children}
  </div>
)

const Icon = ({
  logoURI,
  name,
  className,
  ...props
}: { logoURI: string; name: string } & React.DetailedHTMLProps<
  React.ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>) => (
  <img
    className={`${style({
      borderRadius: '10px',
      filter: 'drop-shadow(0px 4px 12px rgba(0, 30, 89, 0.3))'
    })} ${className}`}
    src={logoURI}
    alt={name}
    {...props}
  />
)

const WalletIcon = ({ wallet, connect }: { wallet: Wallet } & Partial<Pick<ModalProps, 'connect'>>) => {
  const { name, logoURI } = useMemo(() => getWalletInfo(wallet.name), [wallet.name])

  return (
    <li key={name}>
      <button onClick={() => (connect ? connect(wallet) : undefined)}>
        <WalletLabel>
          <Icon {...{ name, logoURI }} />
          {name}
        </WalletLabel>
        <img src={next} alt={`Select ${name}`} />
      </button>
    </li>
  )
}

const MoreWalletsIcon = ({ wallet }: { wallet: Wallet }) => {
  const { name, logoURI } = useMemo(() => getWalletInfo(wallet.name), [wallet.name])

  return (
    <div key={name}>
      <Icon
        {...{ name, logoURI }}
        className={style({
          height: '1rem',
          width: '1rem'
        })}
      />
    </div>
  )
}

const BackButtonClassName = style({
  width: '100%',
  padding: '11px',
  display: 'flex'
}) /* styled.button`
  width: 100%;
  padding: 11px;
  display: flex;
` */

const BackButton = ({ className, children, ...props }: BoxProps) => (
  <div className={`${BackButtonClassName} ${className}`} {...props}>
    {children}
  </div>
)

const MoreWalletsGroupClassName = style({
  marginRight: '12px',
  display: 'grid',
  gridTemplateColumns: '1fr 1fr',
  gridTemplateRows: '1fr 1fr',
  gap: '2px',
  width: 'max-content'
}) /* styled.div`
  margin-right: 12px;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-gap: 2px;
  width: max-content;
` */

const MoreWalletsGroup = ({ className, children, ...props }: BoxProps) => (
  <div className={`${MoreWalletsGroupClassName} ${className}`} {...props}>
    {children}
  </div>
)

/**
 * Rainbow-styled Modal
 */
export const Modal = ({ wallets, connect, setConnecting, isConnecting, terms, classNames }: ModalProps) => {
  const { visibleWallets, hiddenWallets } = useMemo(() => {
    const visibleWallets: Wallet[] = []
    const hiddenWallets: Wallet[] = []

    for (const wallet of wallets) {
      if (wallet.hidden) {
        hiddenWallets.push(wallet)
      } else visibleWallets.push(wallet)
    }
    return { visibleWallets, hiddenWallets }
  }, [wallets])

  const [isHiddenWalletsOpened, setHiddenWalletsOpened] = useState(false)

  return (
    <ModalOverlay
      isConnecting={isConnecting}
      className={isConnecting ? `${classNames?.overlay}` : `${classNames?.hidden}`}
    >
      <StyledModal className={classNames?.modal}>
        <CloseButton className={classNames?.close} onClick={() => setConnecting(false)}>
          <img src={close} alt="close" title="close" />
        </CloseButton>
        <div>
          <ModalTitle className={classNames?.title}>Connect to a wallet</ModalTitle>
          <Caption className={classNames?.caption}>Choose your preferred wallet</Caption>

          <div
            className={`${style({
              marginTop: '24px',
              listStyleType: 'none',
              paddingLeft: 0
            })} ${classNames?.wallets}`}
          >
            {(isHiddenWalletsOpened ? hiddenWallets : visibleWallets).map((c) => {
              return <WalletIcon key={c.name} connect={connect} wallet={c} />
            })}
          </div>
          {hiddenWallets.length !== 0 && !isHiddenWalletsOpened && (
            <MoreWallets onClick={() => setHiddenWalletsOpened(true)}>
              <div
                className={style({
                  display: 'inherit',
                  flexDirection: 'inherit'
                })}
              >
                <MoreWalletsGroup>
                  {hiddenWallets.map((w) => (
                    <MoreWalletsIcon wallet={w} key={w.name} />
                  ))}
                </MoreWalletsGroup>
                <WalletLabel>More wallets</WalletLabel>
              </div>

              <img src={next} alt="Open more wallets" />
            </MoreWallets>
          )}
          {isHiddenWalletsOpened && (
            <BackButton onClick={() => setHiddenWalletsOpened(false)}>
              <Caption
                className={style({
                  color: '#25292e',
                  fontSize: '20px',
                  '::before': {
                    content: '<- '
                  }
                })}
              >
                Back
              </Caption>
            </BackButton>
          )}
        </div>
        {terms && <Terms className={classNames?.terms}>{terms}</Terms>}
      </StyledModal>
    </ModalOverlay>
  )
}
