import React, { useState } from 'react';
import {
  ChevronRight,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  AlertCircle,
  Package,
  Layers,
  MapPin,
  User,
  Check
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { useI18n, categoryLabel, statusLabel, formatDate } from '../i18n';

export function NewAssetView({ assetIds = [], onAddAsset, onBack, onNavigate, onNotify }) {
  const { t, language } = useI18n();
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    id: (() => {
      let n = Math.floor(Math.random() * 900) + 100;
      while (assetIds.includes(`NB-0${n}`)) n += 1;
      return `NB-0${n}`;
    })(),
    category: 'Notebook',
    model: 'Dell Inspiron 15',
    name: 'Dell Inspiron 15',
    serial: 'ABC1234SXYZ',
    status: 'Disponível',
    date: '2025-05-23',
    warranty: '2027-05-23',
    notes: '',
    person: '—',
    department: 'Estoque Central TI',
    location: 'Estoque',
    supplier: 'Dell Technologies Brasil',
    cost: 'R$ 4.890,00',
    specs: {
      processor: 'Intel Core i5-1335U',
      ram: '16 GB DDR4',
      storage: '512 GB SSD NVMe',
      os: 'Windows 11 Pro'
    }
  });

  const [errors, setErrors] = useState({});

  const validateStep1 = () => {
    const errs = {};
    if (!formData.id.trim()) errs.id = t('newAsset.errId');
    else if (assetIds.some((existing) => existing.toLowerCase() === formData.id.trim().toLowerCase())) errs.id = t('newAsset.errIdDuplicate');
    if (!formData.model.trim()) errs.model = t('newAsset.errModel');
    if (!formData.serial.trim()) errs.serial = t('newAsset.errSerial');
    if (!formData.date) errs.date = t('newAsset.errDate');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.location.trim()) errs.location = t('newAsset.errLocation');
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (validateStep1()) {
        setCurrentStep(2);
      }
    } else if (currentStep === 2) {
      if (validateStep2()) {
        setCurrentStep(3);
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const finalAsset = {
      ...formData,
      id: formData.id.trim(),
      name: formData.name || formData.model,
      date: formData.date.includes('-')
        ? formData.date.split('-').reverse().join('/')
        : formData.date,
      warranty: formData.warranty.includes('-')
        ? formData.warranty.split('-').reverse().join('/')
        : formData.warranty
    };

    onAddAsset(finalAsset);
    if (onNotify) onNotify(t('newAsset.success', { name: finalAsset.name, id: finalAsset.id }));
    onNavigate('assets');
  };

  return (
    <div className="view-container new-asset-view">
      {/* Breadcrumb (Matching 08-novo-ativo.png) */}
      <div className="detail-breadcrumb-bar">
        <button className="breadcrumb-back-btn" onClick={onBack}>
          <ArrowLeft size={16} />
        </button>
        <div className="breadcrumb-path">
          <span className="breadcrumb-segment" onClick={() => onNavigate('assets')}>{t('nav.allAssets')}</span>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <span className="breadcrumb-current">{t('assets.newAsset')}</span>
        </div>
      </div>

      {/* Main Form Container Card */}
      <div className="new-asset-form-card">
        {/* Stepper Navigation Bar (Matching 08-novo-ativo.png) */}
        <div className="wizard-stepper-bar">
          <div
            className={`wizard-step-node ${currentStep === 1 ? 'active' : currentStep > 1 ? 'completed' : ''}`}
            onClick={() => currentStep > 1 && setCurrentStep(1)}
          >
            <span className="step-circle">
              {currentStep > 1 ? <Check size={14} /> : '1'}
            </span>
            <span className="step-label">{t('newAsset.step1')}</span>
          </div>

          <div className="wizard-step-line" />

          <div
            className={`wizard-step-node ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}
            onClick={() => currentStep > 2 && setCurrentStep(2)}
          >
            <span className="step-circle">
              {currentStep > 2 ? <Check size={14} /> : '2'}
            </span>
            <span className="step-label">{t('newAsset.step2')}</span>
          </div>

          <div className="wizard-step-line" />

          <div className={`wizard-step-node ${currentStep === 3 ? 'active' : ''}`}>
            <span className="step-circle">3</span>
            <span className="step-label">{t('newAsset.step3')}</span>
          </div>
        </div>

        {/* STEP 1: Informações Básicas (Exact Layout of 08-novo-ativo.png) */}
        {currentStep === 1 && (
          <div className="step-body-content">
            <div className="form-grid-2col">
              {/* Left Column */}
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="asset-id">{t('newAsset.id')}</label>
                  <input
                    id="asset-id"
                    type="text"
                    value={formData.id}
                    onChange={(e) => setFormData({ ...formData, id: e.target.value })}
                    className={errors.id ? 'input-error' : ''}
                    placeholder="NB-0008"
                    required
                  />
                  {errors.id && <span className="field-error-msg">{errors.id}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="asset-category">{t('newAsset.category')}</label>
                  <select
                    id="asset-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    {['Notebook', 'Celular', 'Tablet', 'Desktop', 'Monitor', 'Acessório'].map((c) => (
                      <option key={c} value={c}>{categoryLabel(t, c)}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="asset-model">{t('newAsset.model')}</label>
                  <input
                    id="asset-model"
                    type="text"
                    value={formData.model}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        model: e.target.value,
                        name: e.target.value
                      })
                    }
                    className={errors.model ? 'input-error' : ''}
                    placeholder="Dell Inspiron 15"
                    required
                  />
                  {errors.model && <span className="field-error-msg">{errors.model}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="asset-serial">{t('newAsset.serial')}</label>
                  <input
                    id="asset-serial"
                    type="text"
                    value={formData.serial}
                    onChange={(e) => setFormData({ ...formData, serial: e.target.value })}
                    className={errors.serial ? 'input-error' : ''}
                    placeholder="ABC1234SXYZ"
                    required
                  />
                  {errors.serial && <span className="field-error-msg">{errors.serial}</span>}
                </div>
              </div>

              {/* Right Column */}
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="asset-status">{t('newAsset.status')}</label>
                  <select
                    id="asset-status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    {['Disponível', 'Em uso', 'Em manutenção', 'Descartado'].map((s) => (
                      <option key={s} value={s}>{statusLabel(t, s)}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="asset-date">{t('newAsset.acquisitionDate')}</label>
                  <div className="input-calendar-wrapper">
                    <input
                      id="asset-date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                    />
                    <Calendar size={18} className="calendar-field-icon" />
                  </div>
                  {errors.date && <span className="field-error-msg">{errors.date}</span>}
                </div>

                <div className="form-group">
                  <label htmlFor="asset-warranty">{t('newAsset.warrantyUntil')}</label>
                  <div className="input-calendar-wrapper">
                    <input
                      id="asset-warranty"
                      type="date"
                      value={formData.warranty}
                      onChange={(e) => setFormData({ ...formData, warranty: e.target.value })}
                    />
                    <Calendar size={18} className="calendar-field-icon" />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="asset-notes">{t('newAsset.notes')}</label>
                  <input
                    id="asset-notes"
                    type="text"
                    placeholder={t('newAsset.notesPlaceholder')}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 2: Responsável e Localização */}
        {currentStep === 2 && (
          <div className="step-body-content">
            <div className="form-grid-2col">
              <div className="form-col">
                <div className="form-group">
                  <label>{t('newAsset.responsible')}</label>
                  <input
                    placeholder={t('newAsset.responsiblePlaceholder')}
                    value={formData.person === '—' ? '' : formData.person}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        person: e.target.value || '—',
                        status: e.target.value ? 'Em uso' : 'Disponível'
                      })
                    }
                  />
                </div>

                <div className="form-group">
                  <label>{t('newAsset.department')}</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    {[['Estoque Central TI', 'dept.stock'], ['Tecnologia da Informação', 'dept.it'], ['Design de Produto', 'dept.design'], ['Marketing & Vendas', 'dept.marketing'], ['Financeiro / Controladoria', 'dept.finance'], ['Recursos Humanos', 'dept.hr']].map(([value, key]) => (
                      <option key={value} value={value}>{t(key)}</option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label>{t('newAsset.location')}</label>
                  <input
                    placeholder={t('newAsset.locationPlaceholder')}
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                  {errors.location && <span className="field-error-msg">{errors.location}</span>}
                </div>
              </div>

              <div className="form-col">
                <div className="form-group">
                  <label>{t('newAsset.supplier')}</label>
                  <input
                    placeholder={t('newAsset.supplierPlaceholder')}
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>{t('newAsset.cost')}</label>
                  <input
                    placeholder={t('newAsset.costPlaceholder')}
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>{t('newAsset.hardware')}</label>
                  <input
                    placeholder={t('newAsset.hardwarePlaceholder')}
                    value={formData.specs.processor}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        specs: { ...formData.specs, processor: e.target.value }
                      })
                    }
                  />
                </div>
              </div>
            </div>
          </div>
        )}

        {/* STEP 3: Revisão e Confirmação */}
        {currentStep === 3 && (
          <div className="step-body-content">
            <div className="review-summary-card">
              <div className="review-header">
                <div>
                  <h3>{formData.model}</h3>
                  <small className="font-mono">{t('assets.colId')}: {formData.id}</small>
                </div>
                <StatusBadge value={formData.status} />
              </div>

              <div className="review-grid">
                <div className="review-item">
                  <span>{t('assets.colCategory')}:</span>
                  <b>{categoryLabel(t, formData.category)}</b>
                </div>
                <div className="review-item">
                  <span>{t('detail.serial')}:</span>
                  <b className="font-mono">{formData.serial}</b>
                </div>
                <div className="review-item">
                  <span>{t('assets.colPerson')}:</span>
                  <b>{formData.person || '—'}</b>
                </div>
                <div className="review-item">
                  <span>{t('assets.colLocation')}:</span>
                  <b>{formData.location}</b>
                </div>
                <div className="review-item">
                  <span>{t('detail.acquisitionDate')}:</span>
                  <b>{formatDate(formData.date, language)}</b>
                </div>
                <div className="review-item">
                  <span>{t('detail.warrantyUntil')}:</span>
                  <b>{formData.warranty ? formatDate(formData.warranty, language) : t('newAsset.warrantyNone')}</b>
                </div>
                <div className="review-item">
                  <span>{t('detail.supplier')}:</span>
                  <b>{formData.supplier}</b>
                </div>
                <div className="review-item">
                  <span>{t('maint.colCost')}:</span>
                  <b>{formData.cost}</b>
                </div>
              </div>

              {formData.notes && (
                <div className="review-notes">
                  <span>{t('detail.notes')}:</span>
                  <p>{formData.notes}</p>
                </div>
              )}
            </div>
          </div>
        )}

        {/* Bottom Form Actions (Matching 08-novo-ativo.png) */}
        <div className="wizard-actions-footer">
          {currentStep > 1 && (
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => setCurrentStep((prev) => prev - 1)}
            >
              {t('common.back')}
            </button>
          )}

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onBack}
          >
            {t('common.cancel')}
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
            >
              {t('common.next')}
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              <CheckCircle2 size={16} />
              <span>{t('newAsset.finish')}</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

