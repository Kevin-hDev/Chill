// src/i18n/ui.ts
export const languages = {
  en: 'EN',
  fr: 'FR',
} as const;

export const defaultLang = 'en' as const;
export type Lang = keyof typeof languages;
