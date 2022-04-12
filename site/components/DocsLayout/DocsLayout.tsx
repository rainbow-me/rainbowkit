/* eslint-disable sort-keys-fix/sort-keys-fix */
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import {
  DocsMobileMenuContext,
  DocsMobileMenuSlot,
} from 'components/DocsMobileMenu/DocsMobileMenu';
import { Header } from 'components/Header/Header';
import { Link } from 'components/Link/Link';
import { vars } from 'css/vars.css';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import { allDocsRoutes, docsRoutes } from '../../lib/docsRoutes';
import { Sidebar } from '../Sidebar/Sidebar';
import { Wrapper } from '../Wrapper/Wrapper';
import { content, navigationSidebar, paginationItem } from './DocsLayout.css';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const currentPageSlug = router.query.slug;
  const currentPageIndex = allDocsRoutes.findIndex(
    page => page.slug === currentPageSlug
  );
  const previous = allDocsRoutes[currentPageIndex - 1];
  const next = allDocsRoutes[currentPageIndex + 1];
  const docsMobileMenuRef = React.useRef<HTMLDivElement>(null);

  // Listen to route change so we can programatically close
  // the docs mobile menu when changing routes.
  useEffect(() => {
    const handleRouteChange = () => setIsOpen(false);
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <>
      <Header docsMobileMenuRef={docsMobileMenuRef} />

      <DocsMobileMenuContext.Provider value={docsMobileMenuRef}>
        <DocsMobileMenuSlot>
          <DialogPrimitive.Root onOpenChange={setIsOpen} open={isOpen}>
            <Box display={{ lg: 'none' }}>
              <DialogPrimitive.Trigger asChild>
                <Button>Menu</Button>
              </DialogPrimitive.Trigger>
            </Box>
            <DialogPrimitive.Portal>
              <DialogPrimitive.Overlay
                style={{
                  position: 'fixed',
                  inset: 0,
                  zIndex: 11,
                  backgroundColor: vars.colors.backgroundScrim,
                  backdropFilter: 'blur(4px)',
                }}
              />
              <DialogPrimitive.Content
                style={{
                  outline: 'none',
                  position: 'fixed',
                  top: 0,
                  bottom: 0,
                  left: 0,
                  right: 0,
                  zIndex: 12,
                  overflow: 'auto',
                  pointerEvents: 'none',
                }}
              >
                <Box
                  backgroundColor="fillElevated"
                  padding="6"
                  pointerEvents="none"
                  style={{
                    width: `calc(250px + ${vars.space[6]})`,
                    height: '100%',
                  }}
                >
                  <Sidebar routes={docsRoutes} />
                </Box>
              </DialogPrimitive.Content>
            </DialogPrimitive.Portal>
          </DialogPrimitive.Root>
        </DocsMobileMenuSlot>
      </DocsMobileMenuContext.Provider>

      <Wrapper>
        <Box className={navigationSidebar}>
          <Sidebar routes={docsRoutes} />
        </Box>

        <Box className={content}>
          <Box paddingLeft={{ lg: '10' }}>
            <>{children}</>

            <Box
              borderTopWidth="1"
              display="flex"
              justifyContent="space-between"
              marginTop="9"
              paddingTop="8"
              style={{ fontWeight: '600' }}
            >
              {previous && (
                <NextLink href={`/docs/${previous.slug}`} passHref>
                  <Link className={paginationItem}>
                    <PreviousIcon />
                    {previous.title}
                  </Link>
                </NextLink>
              )}
              <span aria-hidden />
              {next && (
                <NextLink href={`/docs/${next.slug}`} passHref>
                  <Link className={paginationItem}>
                    {next.title}
                    <NextIcon />
                  </Link>
                </NextLink>
              )}
            </Box>
          </Box>
        </Box>
      </Wrapper>
    </>
  );
}

export const PreviousIcon = props => (
  <svg
    fill="none"
    height="17"
    viewBox="0 0 11 17"
    width="11"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path
      d="M0.99707 8.6543C0.99707 9.08496 1.15527 9.44531 1.51562 9.79688L8.16016 16.3096C8.43262 16.5732 8.74902 16.7051 9.13574 16.7051C9.90918 16.7051 10.5508 16.0811 10.5508 15.3076C10.5508 14.9121 10.3838 14.5605 10.0938 14.2705L4.30176 8.64551L10.0938 3.0293C10.3838 2.74805 10.5508 2.3877 10.5508 2.00098C10.5508 1.23633 9.90918 0.603516 9.13574 0.603516C8.74902 0.603516 8.43262 0.735352 8.16016 0.999023L1.51562 7.51172C1.15527 7.85449 1.00586 8.21484 0.99707 8.6543Z"
      fill="currentColor"
    />
  </svg>
);

export const NextIcon = () => (
  <PreviousIcon style={{ transform: 'rotate(180deg)' }} />
);
