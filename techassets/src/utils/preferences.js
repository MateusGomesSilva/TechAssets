import { storage } from './storage';

export const SUPPORTED_THEMES = ['light', 'dark', 'system'];
export const SUPPORTED_LANGUAGES = ['pt-BR', 'en-US', 'es-ES'];
export const DEFAULT_PREFERENCES = Object.freeze({ theme: 'light', language: 'pt-BR' });

// Preferences are stored per authenticated account.
// A "device" copy mirrors the active account so the very first paint (and the
// public pages: landing / login) already use the right theme and language.
const USER_PREFIX = 'techassets:prefs:user:';
const DEVICE_KEY = 'techassets:prefs:device';

export function sanitizePreferences(prefs) {
  const p = prefs && typeof prefs === 'object' ? prefs : {};
  return {
    theme: SUPPORTED_THEMES.includes(p.theme) ? p.theme : DEFAULT_PREFERENCES.theme,
    language: SUPPORTED_LANGUAGES.includes(p.language) ? p.language : DEFAULT_PREFERENCES.language
  };
}

function readJson(key) {
  const raw = storage.get(key);
  if (!raw) return null;
  try {
    return JSON.parse(raw);
  } catch {
    return null;
  }
}

export function loadUserPreferences(accountId) {
  if (!accountId) return null;
  const stored = readJson(USER_PREFIX + accountId);
  return stored ? sanitizePreferences(stored) : null;
}

export function saveUserPreferences(accountId, prefs) {
  if (!accountId) return false;
  return storage.set(USER_PREFIX + accountId, JSON.stringify(sanitizePreferences(prefs)));
}

export function loadDevicePreferences() {
  const stored = readJson(DEVICE_KEY);
  if (stored) return sanitizePreferences(stored);
  // Legacy keys written by earlier versions
  return sanitizePreferences({
    theme: storage.get('techassets_theme'),
    language: storage.get('techassets_lang')
  });
}

export function saveDevicePreferences(prefs) {
  return storage.set(DEVICE_KEY, JSON.stringify(sanitizePreferences(prefs)));
}

