import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import {
  WARRANTY_ALERT_DAYS,
  calculateAlerts,
  getAlertAssetIds,
  hasNoOwner,
  isActiveAsset,
  isPendingMaintenance
} from '../src/utils/alerts.js';
import { createTranslator } from '../src/i18n/core.js';

describe('alerts utility', () => {
  const fixedNow = new Date(2026, 4, 15, 14, 30); // 15/05/2026

  it('classifies active assets, pending maintenances and unassigned owners', () => {
    assert.equal(isActiveAsset({ status: 'Em uso' }), true);
    assert.equal(isActiveAsset({ status: 'Descartado' }), false);
    assert.equal(isActiveAsset({ status: 'Descarte' }), false);

    assert.equal(isPendingMaintenance({ status: 'Em andamento' }), true);
    assert.equal(isPendingMaintenance({ status: 'Agendada' }), true);
    assert.equal(isPendingMaintenance({ status: 'Concluída' }), false);
    assert.equal(isPendingMaintenance({ status: 'Cancelada' }), false);

    assert.equal(hasNoOwner({ person: '' }), true);
    assert.equal(hasNoOwner({ person: '—' }), true);
    assert.equal(hasNoOwner({ person: 'Sem responsável' }), true);
    assert.equal(hasNoOwner({ person: 'Ana Silva' }), false);
  });

  it('computes overdue maintenance, unassigned and expiring warranty accurately', () => {
    const assets = [
      { id: 'AST-1', status: 'Em manutenção', person: 'Carlos', warranty: '20/05/2026' }, // expires in 5 days
      { id: 'AST-2', status: 'Disponível', person: '—', warranty: '14/06/2026' }, // exactly +30 days
      { id: 'AST-3', status: 'Em uso', person: 'Maria', warranty: '15/06/2026' }, // +31 days (outside window)
      { id: 'AST-4', status: 'Em uso', person: 'João', warranty: '14/05/2026' }, // already expired
      { id: 'AST-5', status: 'Descartado', person: '', warranty: '20/05/2026' } // discarded -> ignored
    ];

    const maintenances = [
      { assetId: 'AST-1', date: '10/05/2026', status: 'Em andamento' }, // overdue
      { assetId: 'AST-1', date: '01/05/2026', status: 'Pendente' }, // duplicate asset -> counts once
      { assetId: 'AST-2', date: '10/05/2026', status: 'Concluída' }, // finished -> ignored
      { assetId: 'AST-3', date: '15/05/2026', status: 'Agendada' }, // today -> not overdue
      { assetId: 'AST-5', date: '01/05/2026', status: 'Pendente' } // discarded asset -> ignored
    ];

    const result = getAlertAssetIds(assets, maintenances, fixedNow);

    assert.equal(WARRANTY_ALERT_DAYS, 30);
    assert.deepEqual([...result.overdue], ['AST-1']);
    assert.deepEqual([...result.unassigned], ['AST-2']);
    assert.deepEqual([...result.warranty], ['AST-1', 'AST-2']);
  });

  it('builds translated alert summaries with neutral tone when counts are zero', () => {
    const t = createTranslator('pt-BR');
    const alerts = calculateAlerts(
      [{ id: 'AST-1', status: 'Em uso', person: 'Ana', warranty: '31/12/2027' }],
      [],
      t,
      fixedNow
    );

    assert.equal(alerts.length, 3);
    assert.ok(alerts.every((a) => a.count === 0 && a.tone === 'neutral'));
  });
});
