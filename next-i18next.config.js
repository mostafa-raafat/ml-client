const path = require('path');

module.exports = {
  i18n: {
    defaultLocale: 'en',
    locales: ['en', 'eg', 'fk'],
    localeDetection: true,
  },
  localePath: path.resolve('./src/locales'),
};
