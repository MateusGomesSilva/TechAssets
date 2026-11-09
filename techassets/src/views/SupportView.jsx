import React from 'react';
import { HelpCircle, Mail, MessageSquare, BookOpen, ExternalLink, ShieldCheck } from 'lucide-react';

export function SupportView({ onNotify }) {
  return (
    <div className="view-container support-view">
      <div className="view-header">
        <div className="view-title-block">
          <h1 className="view-title">Central de Ajuda & Suporte</h1>
          <p className="view-subtitle">Documentação, guias de boas práticas e atendimento aos colaboradores.</p>
        </div>
      </div>

      <div className="support-cards-grid">
        <div className="support-card">
          <BookOpen size={28} className="support-card-icon" />
          <h3>Manual de Gestão Patrimonial</h3>
          <p>Consulte políticas de alocação de equipamentos, termos de responsabilidade e critérios de descarte.</p>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNotify && onNotify('Manual disponível para download.')}
          >
            Acessar Manual <ExternalLink size={13} />
          </button>
        </div>

        <div className="support-card">
          <MessageSquare size={28} className="support-card-icon" />
          <h3>Abertura de Chamados</h3>
          <p>Precisa de suporte com um ativo com defeito ou nova solicitação de hardware?</p>
          <button
            className="btn btn-primary btn-sm"
            onClick={() => onNotify && onNotify('Chamado de suporte aberto no ServiceDesk.')}
          >
            Abrir Chamado
          </button>
        </div>

        <div className="support-card">
          <Mail size={28} className="support-card-icon" />
          <h3>Contato com a Equipe de TI</h3>
          <p>E-mail: ti-patrimonio@empresa.com.br<br />Ramal interno: 4402 (Seg a Sex das 8h às 18h)</p>
          <button
            className="btn btn-secondary btn-sm"
            onClick={() => onNotify && onNotify('Mensagem enviada para ti-patrimonio@empresa.com.br')}
          >
            Enviar E-mail
          </button>
        </div>
      </div>
    </div>
  );
}

