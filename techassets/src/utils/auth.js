import { storage } from './storage';
import { INITIAL_USER } from '../data/mockData';

const SESSION_KEY = 'techassets:session';

export function normalizeAccountId(email) {
  return String(email || '').trim().toLowerCase();
}

export function getSession() {
  const raw = storage.get(SESSION_KEY);
  if (!raw) return null;
  try {
    const parsed = JSON.parse(raw);
    return parsed && parsed.accountId ? parsed : null;
  } catch {
    return null;
  }
}

export function startSession(email) {
  const session = { accountId: normalizeAccountId(email), startedAt: new Date().toISOString() };
  storage.set(SESSION_KEY, JSON.stringify(session));
  return session;
}

export function endSession() {
  storage.remove(SESSION_KEY);
}

function initialsFrom(name) {
  const parts = String(name).split(/\s+/).filter(Boolean);
  const letters = parts.length > 1 ? parts[0][0] + parts[parts.length - 1][0] : String(name).slice(0, 2);
  return letters.toUpperCase();
}

// Builds the user profile shown in the interface for an account id (login e-mail).
export function buildUser(accountId) {
  const id = normalizeAccountId(accountId);
  if (!id || id === normalizeAccountId(INITIAL_USER.email)) return INITIAL_USER;

  const local = id.split('@')[0] || id;
  const name = local
    .split(/[._-]+/)
    .filter(Boolean)
    .map((p) => p.charAt(0).toUpperCase() + p.slice(1))
    .join(' ');
  return {
    ...INITIAL_USER,
    name: name || id,
    email: id,
    avatarText: initialsFrom(name || id)
  };
}

