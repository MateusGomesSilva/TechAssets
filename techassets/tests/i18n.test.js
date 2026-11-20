import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import ptBR from '../src/i18n/locales/pt-BR.js';
import enUS from '../src/i18n/locales/en-US.js';
import esES from '../src/i18n/locales/es-ES.js';
import {
  categoryLabel,
  createTranslator,
  formatMoment,
  formatPercent,
  maintTypeLabel,
  movementTypeLabel,
  resolveText,
  statusLabel
} from '../src/i18n/core.js';

describe('i18n translations and helpers', () => {
  it('maintains 100% key parity across pt-BR, en-US and es-ES with non-empty strings', () => {
    const ptKeys = Object.keys(ptBR).sort();
    const enKeys = Object.keys(enUS).sort();
    const esKeys = Object.keys(esES).sort();

    assert.deepEqual(enKeys, ptKeys, 'en-US keys must match pt-BR');
    assert.deepEqual(esKeys, ptKeys, 'es-ES keys must match pt-BR');

    for (const [locale, dict] of [
      ['pt-BR', ptBR],
      ['en-US', enUS],
      ['es-ES', esES]
    ]) {
      for (const [key, value] of Object.entries(dict)) {
        assert.equal(typeof value, 'string', `${locale}.${key} must be a string`);
        assert.ok(value.trim().length > 0, `${locale}.${key} must not be empty`);
      }
    }
  });

  it('interpolates parameters, resolves plurals and falls back safely', () => {
    const tPt = createTranslator('pt-BR');
    const tEn = createTranslator('en-US');

    assert.equal(tPt('alert.unassigned', { count: 1 }), '1 ativo sem responsável definido');
    assert.equal(tPt('alert.unassigned', { count: 4 }), '4 ativos sem responsável definido');
    assert.equal(tEn('alert.unassigned', { count: 1 }), '1 asset without an assigned owner');
    assert.equal(tEn('alert.unassigned', { count: 4 }), '4 assets without an assigned owner');
    assert.equal(tEn('non.existent.key'), 'non.existent.key');
  });

  it('translates canonical domain labels and formats moments/percentages', () => {
    const tEn = createTranslator('en-US');

    assert.equal(categoryLabel(tEn, 'Notebook'), tEn('cat.notebook'));
    assert.equal(statusLabel(tEn, 'Em uso'), tEn('status.inUse'));
    assert.equal(maintTypeLabel(tEn, 'Preventiva'), tEn('maint.preventive'));
    assert.equal(movementTypeLabel(tEn, 'Transferência'), tEn('movements.typeTransfer'));
    assert.equal(resolveText(tEn, { i18n: 'movements.supplier' }), tEn('movements.supplier'));
    assert.equal(resolveText(tEn, ''), '—');

    const now = new Date(2026, 4, 15, 12, 0);
    const sameDay = new Date(2026, 4, 15, 9, 30).toISOString();
    assert.ok(formatMoment(sameDay, 'en-US', tEn, now).startsWith(`${tEn('time.today')},`));
    assert.equal(formatPercent(1, 4, 'en-US'), '25.0');
    assert.equal(formatPercent(0, 0, 'en-US'), '0.0');
  });
});
