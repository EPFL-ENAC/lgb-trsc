# I18n Implementation Specification for TRSC Project

## Overview

This document outlines the implementation strategy for internationalizing (i18n) the Transnational Red Sea Center (TRSC) web application. The application currently supports three languages: English (en-US), French (fr), and Arabic (ar).

## Translation Files Structure

The translations are organized in the following structure:

```
src/
├── assets/
│   └── i18n/
│       ├── en-US/
│       │   └── layout.json
│       ├── fr/
│       │   └── layout.json
│       └── ar/
│           └── layout.json
├── i18n/
│   ├── index.ts
│   ├── en-US/
│   │   └── index.ts
│   ├── fr/
│   │   └── index.ts
│   └── ar/
│       └── index.ts
└── boot/
    └── i18n.ts
```

## Implementation Strategy

### 1. Create Translation Keys

For each component that requires internationalization, we create a structured set of translation keys in separate JSON files for each supported language. For example, for the MainLayout component:

```json
{
  "layout": {
    "header": {
      "title": "Transnational Red Sea Center",
      "menu": { ... },
      "projects": { ... }
    },
    "footer": { ... }
  }
}
```

### 2. Import Translation Files

The translation files are imported in the respective language index files:

```typescript
// src/i18n/en-US/index.ts
import layout from '../../assets/i18n/en-US/layout.json';

export default {
  // existing translations
  ...layout
};
```

### 3. Use Translation Keys in Components

In the Vue components, we use the translation keys with the `t()` function from the Vue I18n composition API:

```vue
<template>
  <div>{{ t('layout.header.title') }}</div>
</template>

<script setup>
import { useI18n } from 'vue-i18n';
const { t } = useI18n();
</script>
```

### 4. Handle Special Cases

For specific formatting needs like line breaks, we create computed properties:

```typescript
const titleLines = computed(() => {
  const title = t('layout.header.title');
  const words = title.split(' ');
  
  // Custom formatting logic
  // ...
  
  return [part1, part2, part3];
});
```

### 5. RTL Support

For right-to-left (RTL) languages like Arabic, we use:

1. CSS selectors based on the `dir` attribute:
   ```css
   [dir="rtl"] .some-class {
     text-align: right;
   }
   ```

2. Dynamic setting of the `dir` attribute based on the language:
   ```typescript
   watch(lang, (newLang) => {
     if (newLang.includes('ar')) {
       document.documentElement.setAttribute('dir', 'rtl');
       Quasar.lang.set(langAr);
     } else {
       document.documentElement.removeAttribute('dir');
       // ...
     }
   });
   ```

## Component-specific Internationalization

### MainLayout.vue

The MainLayout component has been internationalized with the following features:

1. Title with line breaks
2. Menu items
3. Research project list 
4. Footer content
5. RTL layout adjustments

### Guidelines for New Components

When creating new components:

1. Create translation files in all supported languages
2. Use the Vue I18n composition API
3. Add RTL-specific styles if needed
4. Handle special cases of text formatting with computed properties

## Testing

For each language:

1. Test the application layout (especially for RTL)
2. Verify all translated text is displayed correctly
3. Check special characters render properly
4. Ensure dynamic content is correctly localized

## Best Practices

1. Always use translation keys, not hardcoded strings
2. Group related translations in logical structures
3. Use component-scoped translations when appropriate
4. Avoid direct HTML manipulation in translations
5. Test all languages after each significant change

## Future Considerations

1. Consider extracting translation keys to a single source of truth
2. Implement a translation management system for better collaboration
3. Add automated tests for i18n functionality
4. Support for additional languages as needed
