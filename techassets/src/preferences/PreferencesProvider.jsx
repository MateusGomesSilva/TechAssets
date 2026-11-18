import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState
} from 'react';
import { I18nContext } from '../i18n';
import { createTranslator } from '../i18n/core.js';
import { applyTheme, subscribeSystemTheme } from '../utils/theme';
import {
  DEFAULT_PREFERENCES,
  loadDevicePreferences,
  loadUserPreferences,
  sanitizePreferences,
  saveDevicePreferences,
  saveUserPreferences
} from '../utils/preferences';
import { getSession } from '../utils/auth';

const PreferencesContext = createContext(null);

function initialPreferences() {
  const session = getSession();
  if (session) return loadUserPreferences(session.accountId) || { ...DEFAULT_PREFERENCES };
  return loadDevicePreferences();
}

/**
 * Owns the user preferences (theme + language):
 *  - `applied`  → what the interface is showing right now (may be an unsaved preview)
 *  - `saved`    → what is persisted for the authenticated account
 * Theme and language are applied to the whole app from here, so every page follows them.
 */
export function PreferencesProvider({ children }) {
  const [saved, setSaved] = useState(initialPreferences);
  const [applied, setApplied] = useState(saved);
  const [resolvedTheme, setResolvedTheme] = useState(() => applyTheme(saved.theme));

  const accountRef = useRef(getSession()?.accountId || null);
  const savedRef = useRef(saved);
  savedRef.current = saved;

  // Theme → <html data-theme>
  useLayoutEffect(() => {
    setResolvedTheme(applyTheme(applied.theme));
  }, [applied.theme]);

  // "Follow system": react to OS / browser appearance changes
  useEffect(() => {
    if (applied.theme !== 'system') return undefined;
    return subscribeSystemTheme(() => setResolvedTheme(applyTheme('system')));
  }, [applied.theme]);

  // Language → <html lang> & <title>
  useEffect(() => {
    document.documentElement.lang = applied.language;
    const tr = createTranslator(applied.language);
    document.title = tr('app.title');
  }, [applied.language]);

  // Loads the preferences of the account that just authenticated (or defaults)
  const activateAccount = useCallback((accountId) => {
    accountRef.current = accountId;
    const prefs = loadUserPreferences(accountId) || { ...DEFAULT_PREFERENCES };
    saveDevicePreferences(prefs);
    setSaved(prefs);
    setApplied(prefs);
  }, []);

  const deactivateAccount = useCallback(() => {
    accountRef.current = null;
  }, []);

  // Live preview while the user is choosing (not persisted)
  const previewPreferences = useCallback((partial) => {
    setApplied((prev) => sanitizePreferences({ ...prev, ...partial }));
  }, []);

  const revertPreview = useCallback(() => {
    setApplied(savedRef.current);
  }, []);

  // Persists for the authenticated account (and mirrors on the device for the first paint)
  const savePreferences = useCallback((partial) => {
    const next = sanitizePreferences({ ...savedRef.current, ...partial });
    if (accountRef.current) saveUserPreferences(accountRef.current, next);
    saveDevicePreferences(next);
    setSaved(next);
    setApplied(next);
    return next;
  }, []);

  const t = useMemo(() => createTranslator(applied.language), [applied.language]);
  const i18nValue = useMemo(() => ({ language: applied.language, t }), [applied.language, t]);

  const value = useMemo(
    () => ({
      theme: applied.theme,
      language: applied.language,
      resolvedTheme,
      saved,
      activateAccount,
      deactivateAccount,
      previewPreferences,
      revertPreview,
      savePreferences
    }),
    [
      applied,
      resolvedTheme,
      saved,
      activateAccount,
      deactivateAccount,
      previewPreferences,
      revertPreview,
      savePreferences
    ]
  );

  return (
    <PreferencesContext.Provider value={value}>
      <I18nContext.Provider value={i18nValue}>{children}</I18nContext.Provider>
    </PreferencesContext.Provider>
  );
}

export function usePreferences() {
  const ctx = useContext(PreferencesContext);
  if (!ctx) throw new Error('usePreferences must be used inside <PreferencesProvider>');
  return ctx;
}

