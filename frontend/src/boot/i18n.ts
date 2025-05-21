import { boot } from 'quasar/wrappers';
import { createI18n } from 'vue-i18n';

import messages from 'src/i18n';


export type MessageLanguages = keyof typeof messages;
// Type-define 'en-US' as the master schema for the resource
export type MessageSchema = (typeof messages)['en-US'];

export const getNavigatorLanguage = () =>
  navigator.languages && navigator.languages.length
    ? navigator.languages[0]
    : navigator.language || 'en-US';
// If problem with type: See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition

import { Quasar } from 'quasar';
import langEn from 'quasar/lang/en-US';
import langAr from 'quasar/lang/ar';

export default boot(({ app }) => {
  const userLang = navigator.language;
  let defaultLocale = 'en-US';

  if (userLang.startsWith('fr')) {
    defaultLocale = 'fr';
  } else if (userLang.startsWith('ar')) {
    defaultLocale = 'ar';
  }


  const wantArabic = defaultLocale === 'ar';
  Quasar.lang.set(wantArabic ? langAr : langEn);   // flips dir automatically


  // Set the default locale for i18
  const i18n = createI18n({
    locale: defaultLocale,
    legacy: false,
    messages,
    fallbackLocale: 'en',
    warnHtmlMessage: false,
    wrapperComponent: 'i18n',
    escapeParameter: true,
    useI18nComponentName: true,
    missingWarn: false,
    fallbackWarn: false, // deactivate to see missing keys
  });

  // Set i18n instance on app
  app.use(i18n);
});
