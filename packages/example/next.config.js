/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  webpack: (config) => {
    config.externals.push('pino-pretty', 'lokijs', 'encoding');
    return config;
  },
  i18n: {
    defaultLocale: 'en-US',
    locales: [
      'ar-AR',
      'de-DE',
      'en-US',
      'es-419',
      'fr-FR',
      'hi-IN',
      'id-ID',
      'ja-JP',
      'ko-KR',
      'pt-BR',
      'ru-RU',
      'th-TH',
      'tr-TR',
      'uk-UA',
      'vi-VN',
      'zh-CN',
      'zh-HK',
      'zh-TW',
    ],
  },
};
