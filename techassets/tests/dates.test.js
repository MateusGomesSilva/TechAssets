import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  formatBRL,
  parseCurrency,
  parseDate,
  startOfDay,
  toInputDate,
  toStorageDate
} from '../src/utils/dates.js';

describe('dates and currency utilities', () => {
  it('parses DD/MM/YYYY and YYYY-MM-DD dates in local time', () => {
    const br = parseDate('05/09/2026');
    assert.equal(br.getFullYear(), 2026);
    assert.equal(br.getMonth(), 8);
    assert.equal(br.getDate(), 5);

    const iso = parseDate('2026-09-05');
    assert.equal(iso.getFullYear(), 2026);
    assert.equal(iso.getMonth(), 8);
    assert.equal(iso.getDate(), 5);

    assert.equal(parseDate(''), null);
    assert.equal(parseDate('not-a-date'), null);
    assert.equal(parseDate(new Date('invalid')), null);
  });

  it('converts between storage (DD/MM/YYYY) and HTML input (YYYY-MM-DD) formats', () => {
    assert.equal(toStorageDate('2026-03-07'), '07/03/2026');
    assert.equal(toInputDate('07/03/2026'), '2026-03-07');
    assert.equal(toStorageDate('invalid'), '');
    assert.equal(toInputDate(null), '');
  });

  it('normalizes startOfDay to midnight', () => {
    const d = startOfDay(new Date(2026, 10, 19, 21, 45, 30, 500));
    assert.equal(d.getHours(), 0);
    assert.equal(d.getMinutes(), 0);
    assert.equal(d.getSeconds(), 0);
    assert.equal(d.getMilliseconds(), 0);
  });

  it('parses and formats BRL currency values', () => {
    assert.equal(parseCurrency('R$ 1.234,56'), 1234.56);
    assert.equal(parseCurrency('450,00'), 450);
    assert.equal(parseCurrency(99.5), 99.5);
    assert.equal(parseCurrency(''), 0);
    assert.match(formatBRL(1234.56), /1\.234,56/);
  });
});
