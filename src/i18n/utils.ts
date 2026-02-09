// src/i18n/utils.ts
import { defaultLang, type Lang } from './ui';
import en from './en.json';
import fr from './fr.json';

const translations: Record<Lang, Record<string, any>> = { en, fr };

export function getLangFromUrl(url: URL): Lang {
  const [, lang] = url.pathname.split('/');
  if (lang === 'fr') return 'fr';
  return defaultLang;
}

export function t(lang: Lang, key: string): string {
  const keys = key.split('.');
  let value: any = translations[lang];
  for (const k of keys) {
    value = value?.[k];
  }
  return (value as string) ?? key;
}

export function getLocalePath(lang: Lang, path: string): string {
  if (lang === defaultLang) return path;
  return `/${lang}${path}`;
}
