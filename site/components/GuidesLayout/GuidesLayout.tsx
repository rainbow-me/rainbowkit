import { Box } from 'components/Box/Box';
import { Header } from 'components/Header/Header';
import { Wrapper } from 'components/Wrapper/Wrapper';
import { useCoolMode } from 'lib/useCoolMode';
import type React from 'react';
import type { Ref } from 'react';
import { useAccount } from 'wagmi';
import { content } from './GuidesLayout.css';

export function GuidesLayout({ children }: { children: React.ReactNode }) {
  const { isConnected } = useAccount();
  const ref = useCoolMode(
    '/rainbow.svg',
    !isConnected,
    true,
  ) as Ref<HTMLDivElement>;

  return (
    <div ref={ref}>
      <Header sticky />
      <Wrapper>
        <Box className={content}>
          <Box paddingLeft={{ lg: '12' }} paddingRight={{ lg: '12' }}>
            {children}
          </Box>
        </Box>
      </Wrapper>
    </div>
  );
}
