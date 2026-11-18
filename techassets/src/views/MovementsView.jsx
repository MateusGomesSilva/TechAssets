import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { useI18n, movementTypeLabel, formatMoment, resolveText } from '../i18n';

export function MovementsView({ assets = [], movements = [], onTransferAsset, onNotify }) {
  const { t, language } = useI18n();
  const [showModal, setShowModal] = useState(false);
  const [form, setForm] = useState({ assetId: '', person: '', location: '' });

  const openModal = () => {
    const first = assets[0];
    setForm({
      assetId: first?.id || '',
      person: first && first.person !== '—' ? first.person : '',
      location: first?.location || ''
    });
    setShowModal(true);
  };

  const handleAssetChange = (assetId) => {
    const asset = assets.find((a) => a.id === assetId);
    setForm({
      assetId,
      person: asset && asset.person !== '—' ? asset.person : '',
      location: asset?.location || ''
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const asset = assets.find((a) => a.id === form.assetId);
    if (!asset || !form.location.trim()) {
      if (onNotify) onNotify(t('movements.errFields'), 'error');
      return;
    }
    const currentPerson = asset.person === '—' ? '' : asset.person;
    if (currentPerson === form.person.trim() && asset.location === form.location.trim()) {
      if (onNotify) onNotify(t('movements.errNoChange'), 'error');
      return;
    }
    const ok = onTransferAsset(form.assetId, { person: form.person, location: form.location });
    setShowModal(false);
    if (ok && onNotify) onNotify(t('movements.success'));
  };

  return (
    <div className="view-container movements-view">
      <div className="view-header">
        <div className="view-title-block">
          <h1 className="view-title">{t('movements.title')}</h1>
          <p className="view-subtitle">{t('movements.subtitle')}</p>
        </div>
        <div className="view-header-actions">
          <button className="btn btn-primary" onClick={openModal} disabled={assets.length === 0}>
            <Plus size={16} /> {t('movements.new')}
          </button>
        </div>
      </div>

      <div className="card-full-panel">
        {movements.length === 0 ? (
          <p className="text-muted-dash">{t('movements.empty')}</p>
        ) : (
          <div className="timeline-clean">
            {movements.map((m) => (
              <div key={m.id} className="timeline-item">
                <div className="timeline-dot" />
                <div className="timeline-body">
                  <div className="timeline-meta">
                    <span className={`movement-tag ${m.tagTone}`}>{movementTypeLabel(t, m.type)}</span>
                    <span className="timeline-date">{formatMoment(m.at, language, t)}</span>
                  </div>
                  <h3 className="movement-asset-name">{m.assetName}</h3>
                  <p className="timeline-route">
                    {resolveText(t, m.from)} → {resolveText(t, m.to)}
                  </p>
                  <small className="timeline-author">
                    {t('movements.assetCode')}: {m.assetId}
                  </small>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal: transfer an asset (updates the record and logs the movement) */}
      {showModal && (
        <div className="modal-backdrop-scrim" onClick={() => setShowModal(false)}>
          <div className="modal-box-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>{t('movements.modalTitle')}</h2>
              <button
                className="modal-close-btn"
                onClick={() => setShowModal(false)}
                aria-label={t('common.close')}
              >
                <X size={18} />
              </button>
            </div>
            <form className="modal-body-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="mov-asset">{t('movements.asset')}</label>
                <select
                  id="mov-asset"
                  value={form.assetId}
                  onChange={(e) => handleAssetChange(e.target.value)}
                >
                  {assets.map((a) => (
                    <option key={a.id} value={a.id}>
                      {a.name} ({a.id})
                    </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="mov-person">{t('movements.newPerson')}</label>
                <input
                  id="mov-person"
                  value={form.person}
                  placeholder={t('movements.personPlaceholder')}
                  onChange={(e) => setForm({ ...form, person: e.target.value })}
                />
              </div>
              <div className="form-group">
                <label htmlFor="mov-location">{t('movements.newLocation')}</label>
                <input
                  id="mov-location"
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  required
                />
              </div>
              <div className="modal-actions-bar">
                <button type="button" className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  {t('common.cancel')}
                </button>
                <button type="submit" className="btn btn-primary">
                  {t('movements.confirm')}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
