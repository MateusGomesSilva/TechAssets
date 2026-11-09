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

export function NewAssetView({ onAddAsset, onBack, onNavigate, onNotify }) {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    id: `NB-000${Math.floor(Math.random() * 90) + 10}`,
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
    if (!formData.id.trim()) errs.id = 'Patrimônio é obrigatório';
    if (!formData.model.trim()) errs.model = 'Modelo é obrigatório';
    if (!formData.serial.trim()) errs.serial = 'Número de série é obrigatório';
    if (!formData.date) errs.date = 'Data de aquisição é obrigatória';
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const validateStep2 = () => {
    const errs = {};
    if (!formData.location.trim()) errs.location = 'Localização é obrigatória';
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
      name: formData.name || formData.model,
      date: formData.date.includes('-')
        ? formData.date.split('-').reverse().join('/')
        : formData.date,
      warranty: formData.warranty.includes('-')
        ? formData.warranty.split('-').reverse().join('/')
        : formData.warranty
    };

    onAddAsset(finalAsset);
    if (onNotify) onNotify(`Ativo ${finalAsset.name} (${finalAsset.id}) cadastrado com sucesso!`);
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
          <span className="breadcrumb-segment" onClick={() => onNavigate('assets')}>Ativos</span>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <span className="breadcrumb-current">Novo ativo</span>
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
            <span className="step-label">Informações básicas</span>
          </div>

          <div className="wizard-step-line" />

          <div
            className={`wizard-step-node ${currentStep === 2 ? 'active' : currentStep > 2 ? 'completed' : ''}`}
            onClick={() => currentStep > 2 && setCurrentStep(2)}
          >
            <span className="step-circle">
              {currentStep > 2 ? <Check size={14} /> : '2'}
            </span>
            <span className="step-label">Responsável e localização</span>
          </div>

          <div className="wizard-step-line" />

          <div className={`wizard-step-node ${currentStep === 3 ? 'active' : ''}`}>
            <span className="step-circle">3</span>
            <span className="step-label">Revisão</span>
          </div>
        </div>

        {/* STEP 1: Informações Básicas (Exact Layout of 08-novo-ativo.png) */}
        {currentStep === 1 && (
          <div className="step-body-content">
            <div className="form-grid-2col">
              {/* Left Column */}
              <div className="form-col">
                <div className="form-group">
                  <label htmlFor="asset-id">Patrimônio *</label>
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
                  <label htmlFor="asset-category">Categoria *</label>
                  <select
                    id="asset-category"
                    value={formData.category}
                    onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                  >
                    <option value="Notebook">Notebook</option>
                    <option value="Celular">Celular</option>
                    <option value="Tablet">Tablet</option>
                    <option value="Desktop">Desktop</option>
                    <option value="Monitor">Monitor</option>
                    <option value="Acessório">Acessório</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="asset-model">Modelo *</label>
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
                  <label htmlFor="asset-serial">Número de série *</label>
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
                  <label htmlFor="asset-status">Estado *</label>
                  <select
                    id="asset-status"
                    value={formData.status}
                    onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                  >
                    <option value="Disponível">Disponível</option>
                    <option value="Em uso">Em uso</option>
                    <option value="Em manutenção">Em manutenção</option>
                    <option value="Descartado">Descartado</option>
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="asset-date">Data de aquisição *</label>
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
                  <label htmlFor="asset-warranty">Garantia até</label>
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
                  <label htmlFor="asset-notes">Observações</label>
                  <input
                    id="asset-notes"
                    type="text"
                    placeholder="Digite uma observação (opcional)"
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
                  <label>Responsável / Colaborador</label>
                  <input
                    placeholder="Ex.: João da Silva (ou deixe vazio para Disponível)"
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
                  <label>Departamento</label>
                  <select
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  >
                    <option value="Estoque Central TI">Estoque Central TI</option>
                    <option value="Tecnologia da Informação">Tecnologia da Informação</option>
                    <option value="Design de Produto">Design de Produto</option>
                    <option value="Marketing & Vendas">Marketing & Vendas</option>
                    <option value="Financeiro / Controladoria">Financeiro / Controladoria</option>
                    <option value="Recursos Humanos">Recursos Humanos</option>
                  </select>
                </div>

                <div className="form-group">
                  <label>Localização Física *</label>
                  <input
                    placeholder="Ex.: Estoque TI, Sede SP - Andar 4, Home Office"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                    required
                  />
                  {errors.location && <span className="field-error-msg">{errors.location}</span>}
                </div>
              </div>

              <div className="form-col">
                <div className="form-group">
                  <label>Fornecedor / Loja</label>
                  <input
                    placeholder="Ex.: Dell Technologies, Apple Brasil, Kabum"
                    value={formData.supplier}
                    onChange={(e) => setFormData({ ...formData, supplier: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Valor de Aquisição (R$)</label>
                  <input
                    placeholder="Ex.: R$ 4.890,00"
                    value={formData.cost}
                    onChange={(e) => setFormData({ ...formData, cost: e.target.value })}
                  />
                </div>

                <div className="form-group">
                  <label>Processador / Hardware</label>
                  <input
                    placeholder="Ex.: Intel Core i7, Apple M2, 16GB RAM"
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
                  <small className="font-mono">Patrimônio: {formData.id}</small>
                </div>
                <StatusBadge value={formData.status} />
              </div>

              <div className="review-grid">
                <div className="review-item">
                  <span>Categoria:</span>
                  <b>{formData.category}</b>
                </div>
                <div className="review-item">
                  <span>Número de Série:</span>
                  <b className="font-mono">{formData.serial}</b>
                </div>
                <div className="review-item">
                  <span>Responsável:</span>
                  <b>{formData.person || '—'}</b>
                </div>
                <div className="review-item">
                  <span>Localização:</span>
                  <b>{formData.location}</b>
                </div>
                <div className="review-item">
                  <span>Data de Compra:</span>
                  <b>{formData.date}</b>
                </div>
                <div className="review-item">
                  <span>Garantia até:</span>
                  <b>{formData.warranty || 'Não informada'}</b>
                </div>
                <div className="review-item">
                  <span>Fornecedor:</span>
                  <b>{formData.supplier}</b>
                </div>
                <div className="review-item">
                  <span>Custo:</span>
                  <b>{formData.cost}</b>
                </div>
              </div>

              {formData.notes && (
                <div className="review-notes">
                  <span>Observações:</span>
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
              Voltar
            </button>
          )}

          <button
            type="button"
            className="btn btn-secondary"
            onClick={onBack}
          >
            Cancelar
          </button>

          {currentStep < 3 ? (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleNext}
            >
              Próximo
            </button>
          ) : (
            <button
              type="button"
              className="btn btn-primary"
              onClick={handleSubmit}
            >
              <CheckCircle2 size={16} />
              <span>Cadastrar ativo</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

