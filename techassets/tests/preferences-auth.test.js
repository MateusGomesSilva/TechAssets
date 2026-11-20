import { describe, it, beforeEach } from 'node:test';
import assert from 'node:assert/strict';
import {
  DEFAULT_PREFERENCES,
  loadDevicePreferences,
  loadUserPreferences,
  sanitizePreferences,
  saveDevicePreferences,
  saveUserPreferences
} from '../src/utils/preferences.js';
import {
  buildUser,
  endSession,
  getSession,
  normalizeAccountId,
  startSession
} from '../src/utils/auth.js';
import { resolveTheme } from '../src/utils/theme.js';

function createMemoryStorage() {
  const map = new Map();
  return {
    getItem: (k) => (map.has(k) ? map.get(k) : null),
    setItem: (k, v) => map.set(k, String(v)),
    removeItem: (k) => map.delete(k)
  };
}

describe('preferences, auth and theme utilities', () => {
  beforeEach(() => {
    globalThis.window = { localStorage: createMemoryStorage() };
  });

  it('sanitizes invalid preferences back to defaults', () => {
    assert.deepEqual(sanitizePreferences(null), DEFAULT_PREFERENCES);
    assert.deepEqual(
      sanitizePreferences({ theme: 'neon', language: 'fr-FR' }),
      DEFAULT_PREFERENCES
    );
    assert.deepEqual(
      sanitizePreferences({ theme: 'dark', language: 'en-US' }),
      { theme: 'dark', language: 'en-US' }
    );
  });

  it('persists device and per-account preferences independently', () => {
    saveDevicePreferences({ theme: 'dark', language: 'es-ES' });
    assert.deepEqual(loadDevicePreferences(), { theme: 'dark', language: 'es-ES' });

    saveUserPreferences('maria@empresa.com', { theme: 'system', language: 'en-US' });
    assert.deepEqual(loadUserPreferences('maria@empresa.com'), {
      theme: 'system',
      language: 'en-US'
    });
    assert.equal(loadUserPreferences('outro@empresa.com'), null);
  });

  it('normalizes account ids, builds user profiles and manages sessions', () => {
    assert.equal(normalizeAccountId('  Maria.Silva@Tech.COM '), 'maria.silva@tech.com');

    const custom = buildUser('maria.silva@tech.com');
    assert.equal(custom.name, 'Maria Silva');
    assert.equal(custom.avatarText, 'MS');
    assert.equal(custom.email, 'maria.silva@tech.com');

    assert.equal(getSession(), null);
    const started = startSession('Maria.Silva@Tech.COM');
    assert.equal(started.accountId, 'maria.silva@tech.com');
    assert.equal(getSession().accountId, 'maria.silva@tech.com');

    endSession();
    assert.equal(getSession(), null);
  });

  it('resolves explicit and system themes safely', () => {
    assert.equal(resolveTheme('dark'), 'dark');
    assert.equal(resolveTheme('light'), 'light');
    assert.equal(resolveTheme('system'), 'light');

    globalThis.window.matchMedia = () => ({ matches: true });
    assert.equal(resolveTheme('system'), 'dark');
  });
});
