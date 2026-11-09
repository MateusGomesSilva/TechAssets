import React from 'react';
import { BarChart3, TrendingUp, Package, Wrench, ShieldCheck, Download, Printer } from 'lucide-react';

export function ReportsView({ assets = [], onNotify }) {
  const total = assets.length;
  const inUse = assets.filter((a) => a.status === 'Em uso').length;
  const available = assets.filter((a) => a.status === 'Disponível').length;
  const maintenance = assets.filter((a) => a.status === 'Em manutenção').length;

  return (
    <div className="view-container reports-view">
      <div className="view-header">
        <div className="view-title-block">
          <h1 className="view-title">Relatórios & Indicadores</h1>
          <p className="view-subtitle">Análise consolidada do ciclo de vida dos ativos corporativos.</p>
        </div>
        <div className="view-header-actions">
          <button
            className="btn btn-secondary"
            onClick={() => window.print()}
          >
            <Printer size={16} /> Imprimir Relatório
          </button>
          <button
            className="btn btn-primary"
            onClick={() => onNotify && onNotify('Exportação de relatório em PDF gerada!')}
          >
            <Download size={16} /> Exportar PDF
          </button>
        </div>
      </div>

      <div className="kpi-grid">
        <div className="kpi-card">
          <span className="kpi-title">Taxa de Utilização</span>
          <span className="kpi-number text-success">
            {total ? Math.round((inUse / total) * 100) : 0}%
          </span>
          <div className="kpi-trend positive">
            <TrendingUp size={14} />
            <span>Alocação saudável</span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Patrimônio Ativo</span>
          <span className="kpi-number">R$ 184.200</span>
          <div className="kpi-trend neutral">
            <span>Valor inventariado</span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Disponibilidade</span>
          <span className="kpi-number text-warning">{available} equipamentos</span>
          <div className="kpi-trend neutral">
            <span>Prontos para onboarding</span>
          </div>
        </div>

        <div className="kpi-card">
          <span className="kpi-title">Índice de Reparos</span>
          <span className="kpi-number text-purple">{maintenance} equipamentos</span>
          <div className="kpi-trend positive">
            <span>-2,4% vs mês anterior</span>
          </div>
        </div>
      </div>

      <div className="card-full-panel">
        <h3 className="card-title">Resumo Executivo de TI</h3>
        <p className="text-muted-dash">
          Este painel consolida o inventário atual de equipamentos, depreciação acumulada, conformidade com garantias contratuais de fabricantes (Apple, Dell, Lenovo, Samsung) e previsão orçamentária para o próximo trimestre.
        </p>
      </div>
    </div>
  );
}

