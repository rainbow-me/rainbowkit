import nock from 'nock';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { Chain, chain } from 'wagmi';
import { apiProvider } from './apiProviders';
import { configureChains } from './configureChains';

const alchemyId = 'alchemyId';
const infuraId = 'infuraId';

const avalancheChain: Chain = {
  blockExplorers: {
    default: { name: 'SnowTrace', url: 'https://snowtrace.io' },
    etherscan: { name: 'SnowTrace', url: 'https://snowtrace.io' },
  },
  id: 43_114,
  name: 'Avalanche',
  nativeCurrency: {
    decimals: 18,
    name: 'Avalanche',
    symbol: 'AVAX',
  },
  rpcUrls: {
    default: 'https://api.avax.network/ext/bc/C/rpc',
  },
  testnet: false,
};

describe('configureChains', () => {
  describe('single API provider', () => {
    describe('alchemy', () => {
      it('populate with configuration if all chains support Alchemy', () => {
        const { chains, provider, webSocketProvider } = configureChains(
          [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
          [apiProvider.alchemy(alchemyId)]
        );

        expect(chains.map(chain => chain.rpcUrls.default))
          .toMatchInlineSnapshot(`
          [
            "https://eth-mainnet.alchemyapi.io/v2/alchemyId",
            "https://polygon-mainnet.g.alchemy.com/v2/alchemyId",
            "https://opt-mainnet.g.alchemy.com/v2/alchemyId",
            "https://arb-mainnet.g.alchemy.com/v2/alchemyId",
          ]
        `);

        expect(
          provider({ chainId: chain.mainnet.id }).connection.url
        ).toMatchInlineSnapshot(
          '"https://eth-mainnet.alchemyapi.io/v2/alchemyId"'
        );
        expect(
          provider({ chainId: chain.polygon.id }).connection.url
        ).toMatchInlineSnapshot(
          '"https://polygon-mainnet.g.alchemy.com/v2/alchemyId"'
        );

        expect(
          webSocketProvider({ chainId: chain.mainnet.id }).connection.url
        ).toMatchInlineSnapshot(
          '"wss://eth-mainnet.ws.alchemyapi.io/v2/alchemyId"'
        );
        expect(
          webSocketProvider({ chainId: chain.polygon.id }).connection.url
        ).toMatchInlineSnapshot(
          '"wss://polygon-mainnet.g.alchemy.com/v2/alchemyId"'
        );
      });

      it('throws an error if Alchemy does not support a chain', () => {
        expect(() =>
          configureChains(
            [
              chain.mainnet,
              chain.polygon,
              chain.optimism,
              chain.arbitrum,
              chain.localhost,
            ],
            [apiProvider.alchemy(alchemyId)]
          )
        ).toThrowErrorMatchingInlineSnapshot(`
          "Could not find valid API provider configuration for chain \\"Localhost\\".

You may need to add \`apiProvider.fallback\` to \`configureChains\` so that the chain can fall back to the public RPC URL.
Read more: https://rainbowkit.com/docs/api-providers"
        `);
      });
    });

    describe('infura', () => {
      it('populate with Infura configuration if all chains support Infura', () => {
        const { chains, provider, webSocketProvider } = configureChains(
          [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
          [apiProvider.infura(infuraId)]
        );

        expect(chains.map(chain => chain.rpcUrls.default))
          .toMatchInlineSnapshot(`
          [
            "https://mainnet.infura.io/v3/infuraId",
            "https://polygon-mainnet.infura.io/v3/infuraId",
            "https://optimism-mainnet.infura.io/v3/infuraId",
            "https://arbitrum-mainnet.infura.io/v3/infuraId",
          ]
        `);

        expect(
          provider({ chainId: chain.mainnet.id }).connection.url
        ).toMatchInlineSnapshot('"https://mainnet.infura.io/v3/infuraId"');
        expect(
          provider({ chainId: chain.polygon.id }).connection.url
        ).toMatchInlineSnapshot(
          '"https://polygon-mainnet.infura.io/v3/infuraId"'
        );

        expect(
          webSocketProvider({ chainId: chain.mainnet.id }).connection.url
        ).toMatchInlineSnapshot('"wss://mainnet.infura.io/ws/v3/infuraId"');
        expect(
          webSocketProvider({ chainId: chain.polygon.id }).connection.url
        ).toMatchInlineSnapshot(
          '"wss://polygon-mainnet.infura.io/ws/v3/infuraId"'
        );
      });

      it('throws an error if Infura does not support a chain', () => {
        expect(() =>
          configureChains(
            [
              chain.mainnet,
              chain.polygon,
              chain.optimism,
              chain.arbitrum,
              chain.localhost,
            ],
            [apiProvider.infura(infuraId)]
          )
        ).toThrowErrorMatchingInlineSnapshot(`
          "Could not find valid API provider configuration for chain \\"Localhost\\".

You may need to add \`apiProvider.fallback\` to \`configureChains\` so that the chain can fall back to the public RPC URL.
Read more: https://rainbowkit.com/docs/api-providers"
        `);
      });
    });

    describe('fallback', () => {
      it('populate with fallback configuration if all chains have a default RPC URL', () => {
        const { chains, provider } = configureChains(
          [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
          [apiProvider.fallback()]
        );

        expect(chains.map(chain => chain.rpcUrls.default))
          .toMatchInlineSnapshot(`
          [
            "https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC",
            "https://polygon-rpc.com",
            "https://mainnet.optimism.io",
            "https://arb1.arbitrum.io/rpc",
          ]
        `);

        expect(
          provider({ chainId: chain.mainnet.id }).connection.url
        ).toMatchInlineSnapshot(
          '"https://eth-mainnet.alchemyapi.io/v2/_gg7wSSi0KMBsdKnGVfHDueq6xMB9EkC"'
        );
        expect(
          provider({ chainId: chain.polygon.id }).connection.url
        ).toMatchInlineSnapshot('"https://polygon-rpc.com"');
      });

      it('throws an error if a chain does not have a default RPC URL', () => {
        const polygon = { ...chain.polygon, rpcUrls: { default: '' } };

        expect(() =>
          configureChains(
            [
              chain.mainnet,
              polygon,
              chain.optimism,
              chain.arbitrum,
              chain.localhost,
            ],
            [apiProvider.fallback()]
          )
        ).toThrowErrorMatchingInlineSnapshot(`
          "Could not find valid API provider configuration for chain \\"Polygon\\".

You may need to add \`apiProvider.fallback\` to \`configureChains\` so that the chain can fall back to the public RPC URL.
Read more: https://rainbowkit.com/docs/api-providers"
        `);
      });
    });

    describe('jsonRpc', () => {
      beforeAll(() => {
        [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum].forEach(
          chain => {
            nock(`https://${chain.id}.example.com`).get('/').reply(200, {});
          }
        );
      });

      afterAll(() => {
        nock.cleanAll();
      });

      it('populate with provided RPC URLs for JSON RPC API provider', () => {
        const { chains, provider } = configureChains(
          [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
          [
            apiProvider.jsonRpc(chain => ({
              rpcUrl: `https://${chain.id}.example.com`,
              webSocketRpcUrl: `wss://${chain.id}.example.com`,
            })),
          ]
        );

        expect(chains.map(chain => chain.rpcUrls.default))
          .toMatchInlineSnapshot(`
            [
              "https://1.example.com",
              "https://137.example.com",
              "https://10.example.com",
              "https://42161.example.com",
            ]
          `);

        expect(
          provider({ chainId: chain.mainnet.id }).connection.url
        ).toMatchInlineSnapshot('"https://1.example.com"');
        expect(
          provider({ chainId: chain.polygon.id }).connection.url
        ).toMatchInlineSnapshot('"https://137.example.com"');
      });

      it('throws an error if rpcUrl returns empty string for a chain', () => {
        expect(() =>
          configureChains(
            [chain.mainnet, chain.polygon, chain.optimism, chain.arbitrum],
            [
              apiProvider.jsonRpc(chain => ({
                rpcUrl: chain.id === 1 ? '' : `https://${chain.id}.example.com`,
                webSocketRpcUrl: `wss://${chain.id}.example.com`,
              })),
            ]
          )
        ).toThrowErrorMatchingInlineSnapshot(`
        "Could not find valid API provider configuration for chain \\"Ethereum\\".

You may need to add \`apiProvider.fallback\` to \`configureChains\` so that the chain can fall back to the public RPC URL.
Read more: https://rainbowkit.com/docs/api-providers"
      `);
      });
    });
  });

  describe('multiple API providers', () => {
    it('falls back and finds RPC URL in next provider if previous provider does not support a chain', () => {
      const polygon = {
        ...chain.polygon,
        rpcUrls: { ...chain.polygon.rpcUrls, alchemy: '' },
      };
      const arbitrum = {
        ...chain.arbitrum,
        rpcUrls: { ...chain.arbitrum.rpcUrls, alchemy: '' },
      };

      const { chains, provider } = configureChains(
        [chain.mainnet, polygon, chain.optimism, arbitrum, avalancheChain],
        [
          apiProvider.alchemy(alchemyId),
          apiProvider.infura(infuraId),
          apiProvider.jsonRpc(chain => ({ rpcUrl: chain.rpcUrls.default })),
        ]
      );

      expect(chains.map(chain => chain.rpcUrls.default)).toMatchInlineSnapshot(`
        [
          "https://eth-mainnet.alchemyapi.io/v2/alchemyId",
          "https://polygon-mainnet.infura.io/v3/infuraId",
          "https://opt-mainnet.g.alchemy.com/v2/alchemyId",
          "https://arbitrum-mainnet.infura.io/v3/infuraId",
          "https://api.avax.network/ext/bc/C/rpc",
        ]
      `);

      expect(
        provider({ chainId: chain.mainnet.id }).connection.url
      ).toMatchInlineSnapshot(
        '"https://eth-mainnet.alchemyapi.io/v2/alchemyId"'
      );
      expect(
        provider({ chainId: chain.polygon.id }).connection.url
      ).toMatchInlineSnapshot(
        '"https://polygon-mainnet.infura.io/v3/infuraId"'
      );
      expect(
        provider({ chainId: avalancheChain.id }).connection.url
      ).toMatchInlineSnapshot('"https://api.avax.network/ext/bc/C/rpc"');
    });

    it('throws an error if none of the providers contain an RPC URL for a chain', () => {
      expect(() =>
        configureChains(
          [
            chain.mainnet,
            chain.polygon,
            chain.optimism,
            chain.arbitrum,
            avalancheChain,
          ],
          [
            apiProvider.alchemy(alchemyId),
            apiProvider.infura(infuraId),
            apiProvider.jsonRpc(chain => ({
              rpcUrl:
                chain.id === avalancheChain.id ? '' : chain.rpcUrls.default,
            })),
          ]
        )
      ).toThrowErrorMatchingInlineSnapshot(`
      "Could not find valid API provider configuration for chain \\"Avalanche\\".

You may need to add \`apiProvider.fallback\` to \`configureChains\` so that the chain can fall back to the public RPC URL.
Read more: https://rainbowkit.com/docs/api-providers"
    `);
    });
  });
});
