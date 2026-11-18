import { createContext, useContext } from 'react';
import { createTranslator } from './core.js';
import { DEFAULT_LANGUAGE } from './translations.js';

// The provider lives in PreferencesProvider (the language is a per-user preference).
export const I18nContext = createContext({
  language: DEFAULT_LANGUAGE,
  t: createTranslator(DEFAULT_LANGUAGE)
});

export function useI18n() {
  return useContext(I18nContext);
}

export * from './core.js';
