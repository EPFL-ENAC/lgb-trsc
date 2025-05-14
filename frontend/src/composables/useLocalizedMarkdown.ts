import { ref, watch, Ref } from 'vue';
import { useI18n } from 'vue-i18n';

interface MarkdownContent {
  en: string;
  fr: string;
  ar: string;
}

export function useLocalizedMarkdown(contentByLocale: MarkdownContent): Ref<string> {
  const { locale } = useI18n();
  const content = ref(contentByLocale.en); // default language

  watch(locale, (newLocale) => {
    switch (newLocale) {
      case 'fr':
        content.value = contentByLocale.fr;
        break;
      case 'ar':
        content.value = contentByLocale.ar;
        break;
      case 'en':
      default:
        content.value = contentByLocale.en;
        break;
    }
  }, { immediate: true });

  return content;
}