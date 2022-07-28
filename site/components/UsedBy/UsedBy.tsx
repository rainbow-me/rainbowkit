import { Box } from 'components/Box/Box';
import { Text } from 'components/Text/Text';
import NextImage from 'next/image';
import React from 'react';
import { grid } from './UsedBy.css';

const frens = [
  {
    asset: 'zora',
    description: 'Built to be built on: the NFT marketplace protocol.',
    name: 'Zora',
  },
  {
    asset: 'ens',
    description: 'Your identity across web3, one name to rule them all.',
    name: 'ENS',
  },
  {
    asset: 'nftx-yield',
    description:
      'Stake and earn yield on the our decentralized NFT marketplace.',
    name: 'NFTX Yield',
  },
  {
    asset: 'showtime',
    description: 'Web3 social network. Drop free NFTs to your community.',
    name: 'Showtime',
  },
  {
    asset: 'beyond',
    description: 'Focus on growing your community and business.',
    name: 'Beyond',
  },
  {
    asset: 'partybid',
    description: 'PartyBid is the protocol for buying NFTs as a team.',
    name: 'PartyBid',
  },
  {
    asset: 'joinlist',
    description:
      'Joinlist makes it simple, fast and delightful to collect wallets.',
    name: 'Joinlist',
  },
  {
    asset: 'interface',
    description: 'Explore web3 thru a readable mobile feed.',
    name: 'Interface',
  },
  {
    asset: 'invisiblefriends',
    description: '5000 animated invisible characters by Markus Magnusson.',
    name: 'Invisible Friends',
  },
  {
    asset: 'tinyfaces',
    description:
      'NFTs with soft lighting, vintage colours and quirky costumes.',
    name: 'Tinyfaces',
  },
  {
    asset: 'mannys',
    description:
      'Browser based 3D NFT video game manifesting across the blockchain.',
    name: 'Mannys',
  },
  {
    asset: 'allstarz',
    description: 'NFT collections celebrating music, art, and fashion cycles.',
    name: 'Allstarz',
  },
];

export function UsedBy() {
  return (
    <>
      <Text
        align={{ md: 'center', xs: 'left' }}
        as="h2"
        size={{ md: '9', xs: '7' }}
        style={{ lineHeight: 1 }}
        weight="bold"
      >
        Real frens use RainbowKit
      </Text>
      <Text
        align={{ md: 'center', xs: 'left' }}
        as="p"
        marginTop={{ md: '9', xs: '7' }}
        marginX="auto"
        size={{ md: '5', xs: '4' }}
        style={{ lineHeight: '28px', maxWidth: 720 }}
        weight="semibold"
      >
        World-class Web3 products are using RainbowKit to power their login
        experience, save time and boost quality.
      </Text>

      <Box marginTop={{ md: '11', xs: '10' }} marginX="auto">
        <Box className={grid}>
          {frens.map(fren => (
            <Box
              backgroundColor="backgroundElevated"
              borderRadius="3"
              key={fren.name}
              padding="7"
              textAlign="center"
            >
              <Box
                as="span"
                borderRadius="round"
                display="inline-block"
                style={{
                  boxShadow: '0px 12px 36px rgba(0, 0, 0, 0.4)',
                  height: 96,
                  width: 96,
                }}
              >
                <NextImage
                  alt={fren.name}
                  height={96}
                  src={`/frens/${fren.asset}.png`}
                  width={96}
                />
              </Box>
              <Text
                marginBottom="2"
                marginTop="4"
                variant="title3"
                weight="bold"
              >
                {fren.name}
              </Text>
              <Text color="labelTertiary">{fren.description}</Text>
            </Box>
          ))}
        </Box>
      </Box>
    </>
  );
}
