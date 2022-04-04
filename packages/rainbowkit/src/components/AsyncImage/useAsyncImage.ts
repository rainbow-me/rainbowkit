import { useEffect, useReducer } from 'react';

export type AsyncImageSrc = () => Promise<string>;

const cachedUrls = new Map<AsyncImageSrc, string>();

// Store requests in a cache so we don't fetch the same image twice
const cachedRequestPromises = new Map<AsyncImageSrc, Promise<string>>();

async function loadAsyncImage(loadImageUrl: () => Promise<string>) {
  const cachedRequestPromise = cachedRequestPromises.get(loadImageUrl);

  // Don't fetch if we already have a request in progress / completed
  if (cachedRequestPromise) {
    return cachedRequestPromise;
  }

  const requestPromise = loadImageUrl().then(async url => {
    // Uncomment to simulate slow image loading:
    // await new Promise(resolve =>
    //   setTimeout(resolve, 2000 + Math.random() * 1000)
    // );

    cachedUrls.set(loadImageUrl, url);

    return url;
  });

  cachedRequestPromises.set(loadImageUrl, requestPromise);

  return requestPromise;
}

export async function loadImages(...urls: (string | AsyncImageSrc)[]) {
  return await Promise.all(
    urls.map(url => (typeof url === 'function' ? loadAsyncImage(url) : url))
  );
}

function useForceUpdate() {
  const [, forceUpdate] = useReducer(x => x + 1, 0);

  return forceUpdate;
}

export function useAsyncImage(
  url?: string | AsyncImageSrc
): string | undefined {
  const cachedUrl = typeof url === 'function' ? cachedUrls.get(url) : undefined;
  const forceUpdate = useForceUpdate();

  useEffect(() => {
    if (typeof url === 'function' && !cachedUrl) {
      loadAsyncImage(url).then(forceUpdate);
    }
  }, [url, cachedUrl, forceUpdate]);

  return typeof url === 'function' ? cachedUrl : url;
}
