import { getRequestConfig } from 'next-intl/server';

export default getRequestConfig(() => {
  return {
    messages: {}, // We don't use any messages
  };
});
