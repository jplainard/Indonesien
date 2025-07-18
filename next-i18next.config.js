module.exports = {
  i18n: {
    defaultLocale: 'fr',
    locales: ['fr', 'en', 'id'],
    localeDetection: true
  },
  reloadOnPrerender: process.env.NODE_ENV === 'development',
};
