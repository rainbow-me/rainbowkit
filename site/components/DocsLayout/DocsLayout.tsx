import * as DialogPrimitive from '@radix-ui/react-dialog';
import { Box } from 'components/Box/Box';
import { Button } from 'components/Button/Button';
import {
  DocsMobileMenuContext,
  DocsMobileMenuSlot,
} from 'components/DocsMobileMenu/DocsMobileMenu';
import { Header } from 'components/Header/Header';
import { NextIcon } from 'components/Icons/Next';
import { PreviousIcon } from 'components/Icons/Previous';
import { Link } from 'components/Link/Link';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { Text } from 'components/Text/Text';
import { Wrapper } from 'components/Wrapper/Wrapper';
import { vars } from 'css/vars.css';
import { allDocsRoutes, docsRoutes } from 'lib/docsRoutes';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
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
                  backdropFilter: 'blur(4px)',
                  backgroundColor: vars.colors.backgroundScrim,
                  inset: 0,
                  position: 'fixed',
                  zIndex: 11,
                }}
              />
              <DialogPrimitive.Content
                style={{
                  bottom: 0,
                  left: 0,
                  outline: 'none',
                  overflow: 'auto',
                  position: 'fixed',
                  top: 0,
                  width: `calc(250px + ${vars.space[6]})`,
                  zIndex: 12,
                }}
              >
                <Box
                  backgroundColor="fillElevated"
                  padding="6"
                  style={{ height: '100%' }}
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
            >
              {previous && (
                <Text weight="semibold">
                  <NextLink href={`/docs/${previous.slug}`} passHref>
                    <Link className={paginationItem}>
                      <PreviousIcon />
                      {previous.title}
                    </Link>
                  </NextLink>
                </Text>
              )}
              <span aria-hidden />
              {next && (
                <Text weight="semibold">
                  <NextLink href={`/docs/${next.slug}`} passHref>
                    <Link className={paginationItem}>
                      {next.title}
                      <NextIcon />
                    </Link>
                  </NextLink>
                </Text>
              )}
            </Box>
          </Box>
        </Box>
      </Wrapper>
    </>
  );
}
