import { Box } from 'components/Box/Box';
import { Text } from 'components/Text/Text';
import NextImage from 'next/image';
import Link from 'next/link';
import React from 'react';
import { grid } from './UsedBy.css';

const frens = [
  {
    asset: 'coinbase',
    name: 'Coinbase',
    url: 'https://bridge.base.org/',
  },
  {
    asset: 'optimism',
    name: 'Optimism Bridge',
    url: 'https://app.optimism.io/bridge',
  },
  {
    asset: 'arbitrum',
    name: 'Arbitrum DAO',
    url: 'https://arbitrum.foundation/',
  },
  {
    asset: 'zora',
    name: 'Zora',
    url: 'https://zora.co/',
  },
  {
    asset: 'ens',
    name: 'ENS',
    url: 'https://alpha.ens.domains/',
  },
  {
    asset: 'matcha',
    name: 'Matcha',
    url: 'https://www.matcha.xyz/',
  },
  {
    asset: 'looksrare',
    name: 'LooksRare',
    url: 'https://looksrare.org/',
  },
  {
    asset: 'defillama',
    name: 'DefiLlama',
    url: 'https://swap.defillama.com/',
  },
  {
    asset: 'nftx-yield',
    name: 'NFTX Yield',
    url: 'https://yield.nftx.io/',
  },
  {
    asset: 'pooltogether',
    name: 'PoolTogether',
    url: 'https://app.pooltogether.com/',
  },
  {
    asset: 'warpcast',
    name: 'Warpcast',
    url: 'https://warpcast.com/',
  },
  {
    asset: 'showtime',
    name: 'Showtime',
    url: 'https://showtime.xyz/',
  },
  {
    asset: 'art-blocks',
    name: 'Art Blocks',
    url: 'https://www.artblocks.io/',
  },
  {
    asset: 'cool-cats',
    name: 'Cool Cats',
    url: 'https://coolcatsnft.com/',
  },
  {
    asset: 'partybid',
    name: 'PartyBid',
    url: 'https://www.partybid.app/',
  },
  {
    asset: 'superrare',
    name: 'SuperRare',
    url: 'https://superrare.com/',
  },
  {
    asset: 'doodles',
    name: 'Doodles',
    url: 'https://doodles.app/',
  },
  {
    asset: 'trader-joe',
    name: 'Trader Joe',
    url: 'https://traderjoexyz.com/',
  },
];

export function UsedBy() {
  return (
    <>
      <Text
        align="center"
        as="p"
        marginTop={{ md: '0', xs: '11' }}
        marginX="auto"
        size={{ md: '5', xs: '4' }}
        style={{ lineHeight: '28px', maxWidth: 720 }}
        weight="semibold"
      >
        The siqqest Web3 teams are using RainbowKit to improve their products,
        delight their users and save time when building.
      </Text>

      <Box marginTop={{ md: '11', xs: '10' }} marginX="auto">
        <Box className={grid}>
          {frens.map(fren => (
            <Link href={fren.url} key={fren.name}>
              <a href={fren.url} style={{ textDecoration: 'none' }}>
                <Box textAlign="center">
                  <Box
                    as="span"
                    borderRadius="round"
                    display="inline-block"
                    height={{
                      lg: '_48',
                      xs: '11',
                    }}
                    overflow="hidden"
                    style={{
                      boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.4)',
                    }}
                    width={{
                      lg: '_48',
                      xs: '11',
                    }}
                  >
                    <NextImage
                      alt={fren.name}
                      height={64}
                      layout="responsive"
                      src={`/frens/${fren.asset}.png`}
                      width={64}
                    />
                  </Box>
                  <Text
                    color="labelSecondary"
                    marginTop="2"
                    size={{
                      lg: '3',
                      xs: '2',
                    }}
                    variant={null}
                    weight="semibold"
                  >
                    {fren.name}
                  </Text>
                </Box>
              </a>
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
}
