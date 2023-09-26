import { Box } from 'components/Box/Box';
import NextImage from 'next/legacy/image';
import React from 'react';
import {
  MODAL_COMPACT_SIZE,
  MODAL_SIZE,
  PHONE_SIZE,
  compactModalWrapper,
  heroWrapper,
  modalWrapper,
  phoneWrapper,
} from './Hero.css';

export function Hero() {
  return (
    <Box position="relative">
      <Box
        backgroundColor="purple90"
        position="absolute"
        style={{
          borderRadius: '100%',
          filter: 'blur(150px)',
          height: '80%',
          left: '50%',
          top: '50%',
          transform: 'translate3d(-50%, -50%, 0)',
          width: '50vw',
          zIndex: '1',
        }}
      />
      <Box marginX="auto" position="relative" style={{ zIndex: '2' }}>
        <Box className={heroWrapper}>
          <Box className={modalWrapper}>
            <NextImage
              height={MODAL_SIZE.height}
              src="/hero-modal.png"
              width={MODAL_SIZE.width}
            />
          </Box>
          <Box className={compactModalWrapper}>
            <NextImage
              height={MODAL_COMPACT_SIZE.height}
              src="/hero-compact.png"
              width={MODAL_COMPACT_SIZE.width}
            />
          </Box>
          <Box className={phoneWrapper}>
            <NextImage
              height={PHONE_SIZE.height}
              src="/hero-iphone.png"
              width={PHONE_SIZE.width}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
