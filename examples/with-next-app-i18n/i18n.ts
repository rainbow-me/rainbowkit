import { notFound } from 'next/navigation';
import { getRequestConfig } from 'next-intl/server';

const locales = ['en-US', 'zh-CN'];

export default getRequestConfig(({ locale }) => {
  if (!locales.includes(locale)) notFound();

  return {
    messages: {},
  };
});
