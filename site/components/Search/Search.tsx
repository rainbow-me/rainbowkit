import { DocSearchModal } from '@docsearch/react';
import clsx from 'clsx';
import { Box, BoxProps } from 'components/Box/Box';
import { useActionKey } from 'lib/useActionKey';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from 'react';
import { createPortal } from 'react-dom';

const INDEX_NAME = 'rainbowkit';
const API_KEY = '671f4a1482dd79c7a57883c939250293';
const APP_ID = 'JY91C5WNW9';

const SearchContext = createContext({
  isOpen: false,
  onClose: () => {},
  onOpen: () => {},
});

export function SearchProvider({ children }) {
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  const onOpen = useCallback(() => setIsOpen(true), [setIsOpen]);
  const onClose = useCallback(() => setIsOpen(false), [setIsOpen]);

  useDocSearchKeyboardEvents({
    isOpen,
    onClose,
    onOpen,
  });

  return (
    <>
      <Head>
        <link
          crossOrigin="anonymous"
          href={`https://${APP_ID}-dsn.algolia.net`}
          rel="preconnect"
        />
      </Head>
      <SearchContext.Provider
        value={{
          isOpen,
          onClose,
          onOpen,
        }}
      >
        {children}
      </SearchContext.Provider>
      {isOpen &&
        createPortal(
          <DocSearchModal
            apiKey={API_KEY}
            appId={APP_ID}
            hitComponent={Hit}
            indexName={INDEX_NAME}
            initialScrollY={window.scrollY}
            navigator={{
              navigate({ itemUrl }) {
                setIsOpen(false);
                router.push(itemUrl);
              },
            }}
            onClose={onClose}
            placeholder="Search documentation"
            transformItems={items => {
              return items.map((item, index) => {
                const a = document.createElement('a');
                a.href = item.url;

                const hash =
                  a.hash === '#content-wrapper' || a.hash === '#header'
                    ? ''
                    : a.hash;

                if (item.hierarchy?.lvl0) {
                  item.hierarchy.lvl0 = item.hierarchy.lvl0.replace(
                    /&amp;/g,
                    '&'
                  );
                }

                if (item._highlightResult?.hierarchy?.lvl0?.value) {
                  item._highlightResult.hierarchy.lvl0.value =
                    item._highlightResult.hierarchy.lvl0.value.replace(
                      /&amp;/g,
                      '&'
                    );
                }

                return {
                  ...item,
                  __is_child: () =>
                    item.type !== 'lvl1' &&
                    items.length > 1 &&
                    items[0].type === 'lvl1' &&
                    index !== 0,
                  __is_first: () => index === 1,
                  __is_last: () => index === items.length - 1 && index !== 0,
                  __is_parent: () =>
                    item.type === 'lvl1' && items.length > 1 && index === 0,
                  __is_result: () => true,
                  url: `${a.pathname}${hash}`,
                };
              });
            }}
          />,
          document.body
        )}
    </>
  );
}

function Hit({ children, hit }) {
  return (
    <Link href={hit.url} passHref>
      {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
      <a
        className={clsx({
          'DocSearch-Hit--Child': hit.__is_child?.(),
          'DocSearch-Hit--FirstChild': hit.__is_first?.(),
          'DocSearch-Hit--LastChild': hit.__is_last?.(),
          'DocSearch-Hit--Parent': hit.__is_parent?.(),
          'DocSearch-Hit--Result': hit.__is_result?.(),
        })}
      >
        {children}
      </a>
    </Link>
  );
}

type SearchButtonProps = Omit<BoxProps, 'children'> & {
  children: (key?: string) => React.ReactNode;
};

export function SearchButton({ children, ...props }: SearchButtonProps) {
  const { onOpen } = useContext(SearchContext);
  const [key] = useActionKey();

  return (
    <Box as="button" onClick={onOpen} {...props}>
      {children(key)}
    </Box>
  );
}

function useDocSearchKeyboardEvents({ isOpen, onClose, onOpen }) {
  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (
        (event.key === 'Escape' && isOpen) ||
        (event.key === 'k' && (event.metaKey || event.ctrlKey))
      ) {
        event.preventDefault();

        if (isOpen) {
          onClose();
        } else {
          onOpen();
        }
      }
    }

    window.addEventListener('keydown', onKeyDown);
    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onOpen, onClose]);
}
