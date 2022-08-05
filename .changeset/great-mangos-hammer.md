---
'@rainbow-me/rainbowkit': minor
---

Added support for authentication.

RainbowKit now provides first-class support for [Sign-In with Ethereum](https://login.xyz) and [NextAuth.js](https://next-auth.js.org) via the `@rainbow-me/rainbowkit-siwe-next-auth` package, as well as lower-level APIs for integrating with custom back-ends and message formats.

For more information on how to integrate this feature into your application, check out the full [RainbowKit authentication guide.](https://www.rainbowkit.com/docs/authentication)

**Migration guide for custom ConnectButton implementations**

If you're using `ConnectButton.Custom` and want to make use of authentication, you'll want to update the logic in your render prop to use the new `authenticationStatus` property, which is either `"loading"` (during initial page load), `"unauthenticated"` or `"authenticated"`.

For example, if you wanted to display the "Connect Wallet" state when the user has connected their wallet but haven't authenticated, you can calculate the state in the following way:

```tsx
<ConnectButton.Custom>
  {({
    account,
    chain,
    openAccountModal,
    openChainModal,
    openConnectModal,
    authenticationStatus,
    mounted,
  }) => {
    const ready = mounted && authenticationStatus !== 'loading';
    const connected =
      ready &&
      account &&
      chain &&
      (!authenticationStatus || authenticationStatus === 'authenticated');

    return (
      <div
        {...(!ready && {
          'aria-hidden': true,
          'style': {
            opacity: 0,
          },
        })}
      >
        {/* etc... */}
      </div>
    );
  }}
</ConnectButton.Custom>
```

For a more complete example and API documentation, check out the [custom ConnectButton documentation.](https://www.rainbowkit.com/docs/custom-connect-button)
