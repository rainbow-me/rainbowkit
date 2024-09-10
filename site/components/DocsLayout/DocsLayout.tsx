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
import { SearchIcon } from 'components/Icons/Search';
import { Link } from 'components/Link/Link';
import { SearchButton, SearchProvider } from 'components/Search/Search';
import { Sidebar } from 'components/Sidebar/Sidebar';
import { Text } from 'components/Text/Text';
import { Wrapper } from 'components/Wrapper/Wrapper';
import { vars } from 'css/vars.css';
import { allDocsRoutes, docsRoutes } from 'lib/docsRoutes';
import { useCoolMode } from 'lib/useCoolMode';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React, { type Ref, useCallback, useEffect } from 'react';
import { useAccount } from 'wagmi';
import {
  content,
  navigationSidebar,
  navigationSidebarScroller,
  paginationItem,
} from './DocsLayout.css';
import { allDocs } from '.contentlayer/generated';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const currentPageSlug = router.query.slug;
  const currentPageIndex = allDocsRoutes.findIndex(
    (page) => page.slug === currentPageSlug,
  );
  const previous = allDocs.find(
    (doc) =>
      doc.slug === allDocsRoutes[currentPageIndex - 1]?.slug &&
      doc.locale === router.locale,
  );
  const next = allDocs.find(
    (doc) =>
      doc.slug === allDocsRoutes[currentPageIndex + 1]?.slug &&
      doc.locale === router.locale,
  );
  const docsMobileMenuRef = React.useRef<HTMLDivElement>(null);

  const { isConnected } = useAccount();
  const ref = useCoolMode(
    '/rainbow.svg',
    !isConnected,
    true,
  ) as Ref<HTMLDivElement>;

  const handleRouteChange = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Listen to route change so we can programatically close
  // the docs mobile menu when changing routes.
  useEffect(() => {
    router.events.on('routeChangeStart', handleRouteChange);
    return () => router.events.off('routeChangeStart', handleRouteChange);
  }, [handleRouteChange, router]);

  return (
    <SearchProvider>
      <div ref={ref}>
        <Header docsMobileMenuRef={docsMobileMenuRef} sticky />

        <DocsMobileMenuContext.Provider value={docsMobileMenuRef}>
          <DocsMobileMenuSlot>
            <DialogPrimitive.Root onOpenChange={setIsOpen} open={isOpen}>
              <Box alignItems="center" display={{ lg: 'none', xs: 'flex' }}>
                <DialogPrimitive.Trigger asChild>
                  <Button>Menu</Button>
                </DialogPrimitive.Trigger>
                <SearchButton marginLeft="4">
                  {() => (
                    <Button as="span" shape="circle" variant="gray">
                      <SearchIcon />
                    </Button>
                  )}
                </SearchButton>
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
                    position: 'fixed',
                    top: 0,
                    width: `calc(250px + ${vars.space[6]})`,
                    zIndex: 12,
                  }}
                >
                  <Box
                    backgroundColor="fillElevated"
                    padding="6"
                    style={{ height: '100%', overflow: 'auto' }}
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
            <Box className={navigationSidebarScroller}>
              <Sidebar routes={docsRoutes} />
            </Box>
          </Box>

          <Box className={content}>
            <Box paddingLeft={{ lg: '10' }}>
              {children}

              <Box
                borderTopWidth="1"
                display="flex"
                justifyContent="space-between"
                marginTop="9"
                paddingTop="8"
              >
                {previous && (
                  <Text weight="semibold">
                    <NextLink
                      href={`/docs/${previous.slug}`}
                      legacyBehavior
                      passHref
                    >
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
                    <NextLink
                      href={`/docs/${next.slug}`}
                      legacyBehavior
                      passHref
                    >
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
      </div>
    </SearchProvider>
  );
}
