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
// See https://vue-i18n.intlify.dev/guide/advanced/typescript.html#global-resource-schema-type-definition
/* eslint-disable @typescript-eslint/no-empty-interface */
declare module 'vue-i18n' {
  // define the locale messages schema
  export interface DefineLocaleMessage extends MessageSchema {}

  // define the datetime format schema
  export interface DefineDateTimeFormat {}

  // define the number format schema
  export interface DefineNumberFormat {}
}
/* eslint-enable @typescript-eslint/no-empty-interface */

export default boot(({ app }) => {
  const userLang = navigator.language;
  let defaultLocale = 'en-US';

  if (userLang.startsWith('fr')) {
    defaultLocale = 'fr';
  } else if (userLang.startsWith('ar')) {
    defaultLocale = 'ar';
  }

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
