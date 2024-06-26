# Implementation of MetaMask Wallet Connector

  Rainbow kit relies on the [Wagmi library](https://github.com/wevm/wagmi/tree/main) and its connectors, but it wraps the connector in a custom “wallet” to add more functionality. The Wagmi [metamask connector](https://github.com/wevm/wagmi/blob/main/packages/connectors/src/metaMask.ts) use the [metamask sdk](https://github.com/MetaMask/metamask-sdk/tree/main).

  Due to specific usage of Wagmi by RainbowKit, we had to fix some issues.

## Fix the `getChainId` function
  RainbowKit requests the chainId from the connector before connecting to it. 
  In our case, we need to start the MetaMask connector even if the browser extension is not installed, to allow connection through the QR code. 
  However, the current implementation of the `getChainId` function in the MetaMask connector throws an error if the browser extension is not installed.

  See the folowing call stack:
  - [rainbowkit/packages/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx#selectWallet](https://github.com/EdouardBougon/rainbowkit/blob/497614b30db7e636b4e560f1b81f6a1315e13429/packages/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx#L149)
    - [rainbowkit/packages/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx#connectToWallet](https://github.com/EdouardBougon/rainbowkit/blob/497614b30db7e636b4e560f1b81f6a1315e13429/packages/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx#L161)
        - [wagmi/packages/connectors/src/metaMask.ts#connect](https://github.com/wevm/wagmi/blob/4e9493aa0fb2d7801040a4000e8c634eb0aba608/packages/connectors/src/metaMask.ts#L61)
          - [metamask-sdk/packages/sdk/src/sdk.ts#connect](https://github.com/MetaMask/metamask-sdk/blob/23127c42357e93fa23968e769051ded8bcb9f718/packages/sdk/src/sdk.ts#L274)
            - [metamask-sdk/packages/sdk/src/services/MetaMaskSDK/ConnectionManager/connect.ts#connect](https://github.com/MetaMask/metamask-sdk/blob/23127c42357e93fa23968e769051ded8bcb9f718/packages/sdk/src/services/MetaMaskSDK/ConnectionManager/connect.ts#L16)
              - [metamask-sdk/packages/sdk/src/provider/initializeMobileProvider.ts#sendRequest](https://github.com/MetaMask/metamask-sdk/blob/90f2b7e96bcb7cca2f6c409909435325a615e2c1/packages/sdk/src/provider/initializeMobileProvider.ts#L122)
                - [metamask-sdk/packages/sdk/src/provider/initializeMobileProvider.ts#return chainId](https://github.com/MetaMask/metamask-sdk/blob/23127c42357e93fa23968e769051ded8bcb9f718/packages/sdk/src/provider/initializeMobileProvider.ts#L193)

  To avoid this error, we decided to override the `getChainId` function of the connector to return the first id in the chain list if the call throws an error.


## Fixing the Emission of `display_uri`
  RainbowKit uses the `display_uri` event to display the QR code for wallet connection. 
  It starts listening to this event before connecting to the wallet, repeating the process at each connection attempt. 
  However, the MetaMask SDK only emits this event once, during the first connection attempt. 
  If the user closes the connection modal and tries to connect again, the QR code will not be displayed.

  See the folowing call stack:

  - [rainbowkit/packages/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx#selectWallet](https://github.com/EdouardBougon/rainbowkit/blob/497614b30db7e636b4e560f1b81f6a1315e13429/packages/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx#L149)
    - [rainbowkit/packages/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx#onQrCode](https://github.com/EdouardBougon/rainbowkit/blob/497614b30db7e636b4e560f1b81f6a1315e13429/packages/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx#L131)
      - [rainbowkit/packages/rainbowkit/src/wallets/useWalletConnectors.ts#getQrCodeUri](https://github.com/EdouardBougon/rainbowkit/blob/497614b30db7e636b4e560f1b81f6a1315e13429/packages/rainbowkit/src/wallets/useWalletConnectors.ts#L210) 
        - [rainbowkit/packages/rainbowkit/src/wallets/useWalletConnectors.ts#getWalletConnectUri](https://github.com/EdouardBougon/rainbowkit/blob/497614b30db7e636b4e560f1b81f6a1315e13429/packages/rainbowkit/src/wallets/useWalletConnectors.ts#L121) (Start listening to the display_uri event)
    - [rainbowkit/packages/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx#connectToWallet](https://github.com/EdouardBougon/rainbowkit/blob/497614b30db7e636b4e560f1b81f6a1315e13429/packages/rainbowkit/src/components/ConnectOptions/DesktopOptions.tsx#L161)
      - [wagmi/packages/connectors/src/metaMask.ts#connect](https://github.com/wevm/wagmi/blob/4e9493aa0fb2d7801040a4000e8c634eb0aba608/packages/connectors/src/metaMask.ts#L61)
        - [metamask-sdk/packages/sdk/src/sdk.ts#connect](https://github.com/MetaMask/metamask-sdk/blob/23127c42357e93fa23968e769051ded8bcb9f718/packages/sdk/src/sdk.ts#L274)
          - [metamask-sdk/packages/sdk/src/services/MetaMaskSDK/ConnectionManager/connect.ts#connect](https://github.com/MetaMask/metamask-sdk/blob/23127c42357e93fa23968e769051ded8bcb9f718/packages/sdk/src/services/MetaMaskSDK/ConnectionManager/connect.ts#L16)
            - [metamask-sdk/packages/sdk/src/sdk.ts#init](https://github.com/MetaMask/metamask-sdk/blob/23127c42357e93fa23968e769051ded8bcb9f718/packages/sdk/src/sdk.ts#L266)
              - [❌ metamask-sdk/packages/sdk/src/services/MetaMaskSDK/InitializerManager/initializeMetaMaskSDK.ts#initializeMetaMaskSDK](https://github.com/MetaMask/metamask-sdk/blob/23127c42357e93fa23968e769051ded8bcb9f718/packages/sdk/src/services/MetaMaskSDK/InitializerManager/initializeMetaMaskSDK.ts#L16) (If we already attempted to connect, the second attempt will stop here)
                - [metamask-sdk/packages/sdk/src/services/MetaMaskSDK/InitializerManager/performSDKInitialization.ts#performSDKInitialization](https://github.com/MetaMask/metamask-sdk/blob/23127c42357e93fa23968e769051ded8bcb9f718/packages/sdk/src/services/MetaMaskSDK/InitializerManager/performSDKInitialization.ts#L41)
                  - [metamask-sdk/packages/sdk/src/services/RemoteConnection/RemoteConnection.ts#startConnection](https://github.com/MetaMask/metamask-sdk/blob/23127c42357e93fa23968e769051ded8bcb9f718/packages/sdk/src/services/RemoteConnection/RemoteConnection.ts#L154)
                    - [metamask-sdk/packages/sdk/src/services/RemoteConnection/ConnectionManager/startConnection.ts#startConnection](https://github.com/MetaMask/metamask-sdk/blob/23127c42357e93fa23968e769051ded8bcb9f718/packages/sdk/src/services/RemoteConnection/ConnectionManager/startConnection.ts#L26)
                      - [provider.emit('display_uri', qrcodeLink);](https://github.com/MetaMask/metamask-sdk/blob/23127c42357e93fa23968e769051ded8bcb9f718/packages/sdk/src/services/RemoteConnection/ConnectionManager/startConnection.ts#L112)

  The ❌ mark where the second connection attempt will stop.

  To resolve this, we added a specific condition in RainbowKit to get the displayUri content [here](https://github.com/EdouardBougon/rainbowkit/blob/497614b30db7e636b4e560f1b81f6a1315e13429/packages/rainbowkit/src/wallets/useWalletConnectors.ts#L103). 
  The `display_uri` value is cached in the connector and will be deleted if the connection is closed, and updated if the connector emit a new `display_uri` event.


## Exposed parameters
We decided only the folowing parameters are relevant to be exposed to the user:
    - `infuraAPIKey`

We don't want that the user access to the modal content, or any other parameters that could be used to change the behavior of the connector.