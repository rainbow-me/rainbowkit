/* eslint-disable sort-keys-fix/sort-keys-fix */
/* eslint-disable jsx-a11y/anchor-is-valid */
import * as DialogPrimitive from '@radix-ui/react-dialog';
import { vars } from 'css/vars.css';
import NextLink from 'next/link';
import { useRouter } from 'next/router';
import React from 'react';
import { allDocsRoutes, docsRoutes } from '../../lib/docsRoutes';
import { Sidebar } from '../Sidebar/Sidebar';
import { Wrapper } from '../Wrapper/Wrapper';
import {
  content,
  modalTriggerWrapper,
  navigationSidebar,
  pagination,
  paginationItem,
} from './DocsLayout.css';

export function DocsLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = React.useState(false);
  const currentPageSlug = router.query.slug;
  const currentPageIndex = allDocsRoutes.findIndex(
    page => page.slug === currentPageSlug
  );
  const previous = allDocsRoutes[currentPageIndex - 1];
  const next = allDocsRoutes[currentPageIndex + 1];

  return (
    <Wrapper>
      <DialogPrimitive.Root onOpenChange={setIsOpen} open={isOpen}>
        <div className={modalTriggerWrapper}>
          <DialogPrimitive.Trigger>Menu</DialogPrimitive.Trigger>
        </div>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 11,
              backgroundColor: vars.colors.backgroundElevated,
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
            <div
              style={{
                pointerEvents: 'auto',
                width: `calc(250px + ${vars.space[6]})`,
                padding: vars.space[6],
                height: '100%',
                backgroundColor: vars.colors.fillElevated,
              }}
            >
              <Sidebar routes={docsRoutes} />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>

      <div className={navigationSidebar}>
        <Sidebar routes={docsRoutes} />
      </div>

      <div className={content}>
        <div
          style={{ paddingLeft: vars.space[10], paddingRight: vars.space[6] }}
        >
          <>{children}</>

          <div className={pagination}>
            {previous && (
              <NextLink href={`/docs/${previous.slug}`} passHref>
                <a className={paginationItem}>
                  <PreviousIcon />
                  {previous.title}
                </a>
              </NextLink>
            )}
            <span aria-hidden />
            {next && (
              <NextLink href={`/docs/${next.slug}`} passHref>
                <a className={paginationItem}>
                  {next.title}
                  <NextIcon />
                </a>
              </NextLink>
            )}
          </div>
        </div>
      </div>
    </Wrapper>
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
