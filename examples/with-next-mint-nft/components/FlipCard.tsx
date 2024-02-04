import React from 'react';
import { motion } from 'framer-motion';

let AnimatedBox = motion.div;

// Framer animations
const duration = 0.3;
const flipVariants = {
  shown: {
    rotateY: 0,
    transition: {
      duration,
    },
  },
  frontFlipped: {
    rotateY: -180,
    transition: {
      duration,
    },
  },
  backFlipped: {
    rotateY: 180,
    transition: {
      duration,
    },
  },
};

export default function FlipCard({ children }: any) {
  return (
    <AnimatedBox
      style={{
        perspective: 1000,
      }}
    >
      <AnimatedBox
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          width: 300,
          height: 300,
        }}
      >
        {children}
      </AnimatedBox>
    </AnimatedBox>
  );
}

export function FrontCard({ isCardFlipped, children }: any) {
  return (
    <AnimatedCardFace
      variants={flipVariants}
      animate={isCardFlipped ? 'frontFlipped' : 'shown'}
    >
      {children}
    </AnimatedCardFace>
  );
}

export function BackCard({ isCardFlipped, children }: any) {
  return (
    <AnimatedCardFace
      variants={flipVariants}
      initial={{ rotateY: 180 }}
      animate={isCardFlipped ? 'shown' : 'backFlipped'}
      style={
        isCardFlipped
          ? {
              backgroundColor: '#7A70FF',
              backgroundImage: 'linear-gradient(-370deg, #3898FF, #7A70FF)',
              color: 'white',
            }
          : {}
      }
    >
      {children}
    </AnimatedCardFace>
  );
}

function AnimatedCardFace({ children, style, ...rest }: any) {
  return (
    <AnimatedBox
      style={{
        position: 'absolute',
        backfaceVisibility: 'hidden',
        height: '100%',
        overflow: 'hidden',
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        borderRadius: 12,
        ...style,
      }}
      {...rest}
    >
      <div
        style={{
          position: 'relative',
          flexDirection: 'column',
          flex: 1,
          display: 'flex',
          alignItems: 'flex-end',
        }}
      >
        <div style={{ flex: 1, width: '100%' }}>{children}</div>
      </div>
    </AnimatedBox>
  );
}
