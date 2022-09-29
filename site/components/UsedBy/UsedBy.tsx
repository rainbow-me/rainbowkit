import { Box } from 'components/Box/Box';
import { Text } from 'components/Text/Text';
import NextImage from 'next/image';
import React from 'react';
import { grid } from './UsedBy.css';

const frens = [
  {
    asset: 'optimism',
    name: 'Optimism Bridge',
  },
  {
    asset: 'zora',
    name: 'Zora',
  },
  {
    asset: 'ens',
    name: 'ENS',
  },
  {
    asset: 'nftx-yield',
    name: 'NFTX Yield',
  },
  {
    asset: 'showtime',
    name: 'Showtime',
  },
  {
    asset: 'tinyfaces',
    name: 'TinyFaces',
  },
  {
    asset: 'beyond',
    name: 'Beyond',
  },
  {
    asset: 'partybid',
    name: 'PartyBid',
  },
  {
    asset: 'invisiblefriends',
    name: 'Invisible Friends',
  },
  {
    asset: 'mannys',
    name: 'Mannys',
  },
  {
    asset: 'allstarz',
    name: 'Allstarz',
  },
  {
    asset: 'interface',
    name: 'Interface',
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
            <Box key={fren.name} textAlign="center">
              <Box
                as="span"
                borderRadius="round"
                display="inline-block"
                height={{
                  lg: '_48',
                  xs: '11',
                }}
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
          ))}
        </Box>
      </Box>
    </>
  );
}
