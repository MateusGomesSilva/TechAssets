import React, { useState } from 'react';
import {
  Plus,
  Wrench,
  CheckCircle2,
  TrendingUp,
  Clock3,
  Calendar,
  Filter,
  Search,
  ChevronRight,
  ArrowLeft,
  X,
  FileText
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export function MaintenanceView({
  maintenances = [],
  onAddMaintenance,
  onBack,
  onNotify
}) {
  const [showModal, setShowModal] = useState(false);
  const [filterType, setFilterType] = useState('Todos');
  const [searchTerm, setSearchTerm] = useState('');

  // New maintenance form state
  const [newRecord, setNewRecord] = useState({
    date: new Date().toLocaleDateString('pt-BR'),
    type: 'Preventiva',
    description: '',
    provider: '',
    cost: 'R$ 0,00',
    status: 'Concluída',
    assetName: 'MacBook Pro 14” (NB-0001)'
  });

  const filtered = maintenances.filter((m) => {
    const matchType = filterType === 'Todos' || m.type === filterType;
    const matchSearch =
      m.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      m.provider.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (m.assetName && m.assetName.toLowerCase().includes(searchTerm.toLowerCase()));
    return matchType && matchSearch;
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (!newRecord.description || !newRecord.provider) {
      if (onNotify) onNotify('Por favor preencha a descrição e o responsável.');
      return;
    }

    const created = {
      id: `MNT-${String(maintenances.length + 1).padStart(3, '0')}`,
      ...newRecord
    };

    onAddMaintenance(created);
    setShowModal(false);
    setNewRecord({
      date: new Date().toLocaleDateString('pt-BR'),
      type: 'Preventiva',
      description: '',
      provider: '',
      cost: 'R$ 0,00',
      status: 'Concluída',
      assetName: 'MacBook Pro 14” (NB-0001)'
    });
    if (onNotify) onNotify('Ordem de manutenção registrada com sucesso!');
  };

  return (
    <div className="view-container maintenance-view">
      {/* Breadcrumb matching 07-manutencoes.png */}
      <div className="detail-breadcrumb-bar">
        {onBack && (
          <button className="breadcrumb-back-btn" onClick={onBack}>
            <ArrowLeft size={16} />
          </button>
        )}
        <div className="breadcrumb-path">
          <span className="breadcrumb-segment" onClick={onBack}>Ativos</span>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <span className="breadcrumb-segment">MacBook Pro 14” (NB-0001)</span>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <span className="breadcrumb-current">Manutenções</span>
        </div>
        <div className="breadcrumb-action-right">
          <button
            className="btn btn-primary"
            onClick={() => setShowModal(true)}
          >
            <Plus size={16} />
            <span>Nova manutenção</span>
          </button>
        </div>
      </div>

      {/* KPI Cards Summary */}
      <div className="kpi-grid">
        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Ordens abertas</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-warning">03</span>
          </div>
          <div className="kpi-trend neutral">
            <span>Aguardando atendimento</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Concluídas no mês</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-success">12</span>
          </div>
          <div className="kpi-trend positive">
            <TrendingUp size={14} />
            <span>+18% vs mês anterior</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Custo no mês</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number">R$ 1.240</span>
          </div>
          <div className="kpi-trend positive">
            <span>-5% economia</span>
          </div>
        </div>

        <div className="kpi-card">
          <div className="kpi-header">
            <span className="kpi-title">Tempo médio</span>
          </div>
          <div className="kpi-value-row">
            <span className="kpi-number text-purple">2,4 dias</span>
          </div>
          <div className="kpi-trend neutral">
            <span>-0,5 dia de resolução</span>
          </div>
        </div>
      </div>

      {/* Main Table Card (Matching 07-manutencoes.png) */}
      <div className="maintenance-table-card">
        <div className="maintenance-filter-bar">
          <div className="toolbar-search-box search-sm">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Filtrar por serviço, prestador..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="type-filter-pills">
            {['Todos', 'Preventiva', 'Corretiva'].map((t) => (
              <button
                key={t}
                className={`category-pill ${filterType === t ? 'active' : ''}`}
                onClick={() => setFilterType(t)}
              >
                {t}
              </button>
            ))}
          </div>
        </div>

        <div className="table-responsive-container">
          <table className="clean-data-table maintenance-table">
            <thead>
              <tr>
                <th>Data</th>
                <th>Tipo</th>
                <th>Descrição</th>
                <th>Responsável</th>
                <th>Custo</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {filtered.length > 0 ? (
                filtered.map((row) => (
                  <tr key={row.id} className="table-row-hover">
                    <td className="td-date">{row.date}</td>
                    <td className="td-type">
                      <span className={`type-tag type-${row.type.toLowerCase()}`}>
                        {row.type}
                      </span>
                    </td>
                    <td className="td-description">
                      <strong>{row.description}</strong>
                      {row.assetName && (
                        <small className="maintenance-asset-tag">{row.assetName}</small>
                      )}
                    </td>
                    <td className="td-provider">{row.provider}</td>
                    <td className="td-cost">{row.cost}</td>
                    <td className="td-status">
                      <StatusBadge value={row.status} size="sm" />
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="td-empty-state">
                    Nenhum registro de manutenção encontrado.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal: New Maintenance */}
      {showModal && (
        <div className="modal-backdrop-scrim" onClick={() => setShowModal(false)}>
          <div className="modal-box-card" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h2>Registrar Nova Manutenção</h2>
              <button className="modal-close-btn" onClick={() => setShowModal(false)}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleSave}>
              <div className="modal-body-form">
                <div className="form-group">
                  <label>Equipamento / Ativo *</label>
                  <input
                    value={newRecord.assetName}
                    onChange={(e) => setNewRecord({ ...newRecord, assetName: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Tipo de Manutenção *</label>
                    <select
                      value={newRecord.type}
                      onChange={(e) => setNewRecord({ ...newRecord, type: e.target.value })}
                    >
                      <option value="Preventiva">Preventiva</option>
                      <option value="Corretiva">Corretiva</option>
                      <option value="Upgrade">Upgrade</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label>Data *</label>
                    <input
                      type="date"
                      defaultValue={new Date().toISOString().slice(0, 10)}
                      onChange={(e) => {
                        const [y, m, d] = e.target.value.split('-');
                        setNewRecord({ ...newRecord, date: `${d}/${m}/${y}` });
                      }}
                      required
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Descrição do Serviço *</label>
                  <textarea
                    rows={3}
                    placeholder="Ex.: Limpeza interna, troca de pasta térmica e substituição do teclado"
                    value={newRecord.description}
                    onChange={(e) => setNewRecord({ ...newRecord, description: e.target.value })}
                    required
                  />
                </div>

                <div className="form-row-2col">
                  <div className="form-group">
                    <label>Responsável / Assistência Técnica *</label>
                    <input
                      placeholder="Ex.: Apple Care, TechFix ou Equipe TI"
                      value={newRecord.provider}
                      onChange={(e) => setNewRecord({ ...newRecord, provider: e.target.value })}
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label>Custo Estimado (R$)</label>
                    <input
                      placeholder="Ex.: R$ 180,00"
                      value={newRecord.cost}
                      onChange={(e) => setNewRecord({ ...newRecord, cost: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Status</label>
                  <select
                    value={newRecord.status}
                    onChange={(e) => setNewRecord({ ...newRecord, status: e.target.value })}
                  >
                    <option value="Concluída">Concluída</option>
                    <option value="Em andamento">Em andamento</option>
                    <option value="Agendada">Agendada</option>
                  </select>
                </div>
              </div>

              <div className="modal-actions-bar">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => setShowModal(false)}
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Salvar Manutenção
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

