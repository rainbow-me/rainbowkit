import React from 'react'
import { Modal, useWalletModal } from 'rainbowkit/modal'

const wallets = [
  { name: 'Metamask', connector: new InjectedConnector({}) },
  { name: 'Trezor', connector: new TrezorConnector({}) }
]

const App = () => {
  const { provider, connect, disconnect, isModalOpen, openModal, closeModal, connector, address, isConnected } =
    useWalletModal({
      wallets
    })

  return isConnected ? (
    <>{address}</>
  ) : (
    <>
      {isModalOpen ? (
        <div>
          <button onClick={closeModal}>Close modal</button>
          {wallets.map((wallet) => (
            <button onClick={() => connect(wallet)}>Connect {wallet.name}</button>
          ))}
        </div>
      ) : (
        <div>
          <button onClick={openModal}>Connect to wallets</button>
        </div>
      )}
    </>
  )
}
