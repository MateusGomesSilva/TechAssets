import React, { useState } from 'react';
import {
  User,
  KeyRound,
  Sliders,
  Bell,
  Laptop,
  CheckCircle2,
  ChevronRight,
  ShieldCheck,
  Save,
  Smartphone,
  Globe
} from 'lucide-react';

export function UserProfileView({ user, onUpdateUser, onNotify }) {
  const [activeSubMenu, setActiveSubMenu] = useState('pessoais');

  const [formData, setFormData] = useState({
    name: user?.name || 'João da Silva',
    email: user?.email || 'joao.silva@empresa.com',
    role: user?.role || 'Analista de TI',
    department: user?.department || 'Tecnologia da Informação',
    phone: user?.phone || '(35) 99999-9999',
    theme: 'light',
    emailNotifications: true
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const handleSave = (e) => {
    e.preventDefault();
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        ...formData
      });
    }
    if (onNotify) onNotify('Alterações no perfil salvas com sucesso!');
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      if (onNotify) onNotify('Por favor preencha os campos de senha.');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      if (onNotify) onNotify('A nova senha e a confirmação não coincidem.');
      return;
    }
    if (onNotify) onNotify('Senha alterada com sucesso!');
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  return (
    <div className="view-container user-profile-view">
      {/* Breadcrumb (Matching 09-perfil-do-usuario.png) */}
      <div className="detail-breadcrumb-bar">
        <div className="breadcrumb-path">
          <span className="breadcrumb-segment">Perfil</span>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <span className="breadcrumb-current">Minhas informações</span>
        </div>
      </div>

      {/* Main Profile Layout Card */}
      <div className="profile-layout-card">
        {/* Left Sub-nav Column */}
        <aside className="profile-subnav-column">
          <button
            className={`subnav-pill-btn ${activeSubMenu === 'pessoais' ? 'active' : ''}`}
            onClick={() => setActiveSubMenu('pessoais')}
          >
            <User size={17} />
            <span>Informações pessoais</span>
          </button>

          <button
            className={`subnav-pill-btn ${activeSubMenu === 'senha' ? 'active' : ''}`}
            onClick={() => setActiveSubMenu('senha')}
          >
            <KeyRound size={17} />
            <span>Alterar senha</span>
          </button>

          <button
            className={`subnav-pill-btn ${activeSubMenu === 'preferencias' ? 'active' : ''}`}
            onClick={() => setActiveSubMenu('preferencias')}
          >
            <Sliders size={17} />
            <span>Preferências</span>
          </button>

          <button
            className={`subnav-pill-btn ${activeSubMenu === 'notificacoes' ? 'active' : ''}`}
            onClick={() => setActiveSubMenu('notificacoes')}
          >
            <Bell size={17} />
            <span>Notificações</span>
          </button>

          <button
            className={`subnav-pill-btn ${activeSubMenu === 'sessoes' ? 'active' : ''}`}
            onClick={() => setActiveSubMenu('sessoes')}
          >
            <Laptop size={17} />
            <span>Sessões ativas</span>
          </button>
        </aside>

        {/* Middle Column: Form */}
        <main className="profile-form-column">
          {activeSubMenu === 'pessoais' && (
            <form onSubmit={handleSave} className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="user-fullname">Nome completo</label>
                <input
                  id="user-fullname"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-email">E-mail</label>
                <input
                  id="user-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-role">Cargo</label>
                <input
                  id="user-role"
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-dept">Departamento</label>
                <input
                  id="user-dept"
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-phone">Telefone</label>
                <input
                  id="user-phone"
                  type="text"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                />
              </div>

              <div className="profile-action-row">
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  <span>Salvar alterações</span>
                </button>
              </div>
            </form>
          )}

          {activeSubMenu === 'senha' && (
            <form onSubmit={handleChangePassword} className="profile-edit-form">
              <div className="form-group">
                <label>Senha atual</label>
                <input
                  type="password"
                  placeholder="••••••••"
                  value={passwordData.currentPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, currentPassword: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Nova senha</label>
                <input
                  type="password"
                  placeholder="Mínimo de 8 caracteres"
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label>Confirmar nova senha</label>
                <input
                  type="password"
                  placeholder="Repita a nova senha"
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>

              <div className="profile-action-row">
                <button type="submit" className="btn btn-primary">
                  Atualizar Senha
                </button>
              </div>
            </form>
          )}

          {activeSubMenu === 'preferencias' && (
            <div className="profile-edit-form">
              <div className="pref-row">
                <div>
                  <strong>Tema da Interface</strong>
                  <p>Escolha o estilo visual para o workspace</p>
                </div>
                <select
                  value={formData.theme}
                  onChange={(e) => setFormData({ ...formData, theme: e.target.value })}
                >
                  <option value="light">Padrão Claro (Recomendado)</option>
                  <option value="dark">Escuro de Alta Performance</option>
                  <option value="system">Seguir Sistema</option>
                </select>
              </div>

              <div className="pref-row">
                <div>
                  <strong>Idioma do Sistema</strong>
                  <p>Linguagem padrão para relatórios e formulários</p>
                </div>
                <select defaultValue="pt-BR">
                  <option value="pt-BR">Português (Brasil)</option>
                  <option value="en-US">English (US)</option>
                  <option value="es-ES">Español</option>
                </select>
              </div>

              <div className="profile-action-row">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => onNotify && onNotify('Preferências salvas!')}
                >
                  Salvar Preferências
                </button>
              </div>
            </div>
          )}

          {activeSubMenu === 'notificacoes' && (
            <div className="profile-edit-form">
              <div className="pref-row">
                <div>
                  <strong>Alertas de Garantia</strong>
                  <p>Receber avisos 30 dias antes do fim da garantia</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="pref-row">
                <div>
                  <strong>Ordens de Manutenção</strong>
                  <p>Notificar quando um ativo entrar em reparo</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
              <div className="pref-row">
                <div>
                  <strong>Resumo Semanal por E-mail</strong>
                  <p>Boletim consolidado de novos ativos e alocações</p>
                </div>
                <input type="checkbox" defaultChecked />
              </div>
            </div>
          )}

          {activeSubMenu === 'sessoes' && (
            <div className="profile-edit-form">
              <div className="session-item-row">
                <Laptop size={20} className="session-icon" />
                <div className="session-meta">
                  <strong>Chrome em Windows 11</strong>
                  <small>São Paulo, Brasil • Esta sessão (ativa agora)</small>
                </div>
                <span className="badge-active-session">Ativo</span>
              </div>

              <div className="session-item-row">
                <Smartphone size={20} className="session-icon" />
                <div className="session-meta">
                  <strong>TechAssets Mobile iOS</strong>
                  <small>São Paulo, Brasil • Última atividade há 2 horas</small>
                </div>
                <button
                  className="btn-revoke-session"
                  onClick={() => onNotify && onNotify('Sessão encerrada.')}
                >
                  Encerrar
                </button>
              </div>
            </div>
          )}
        </main>

        {/* Right Column: Account Info Card (Matching 09-perfil-do-usuario.png) */}
        <aside className="profile-account-column">
          <div className="account-info-card">
            <h3 className="account-info-title">Informações da conta</h3>

            <div className="account-info-field">
              <span className="info-label">Perfil</span>
              <strong className="info-value">{user?.profileType || 'Administrador'}</strong>
            </div>

            <div className="account-info-field">
              <span className="info-label">Membro desde</span>
              <strong className="info-value">{user?.memberSince || '12/03/2024'}</strong>
            </div>

            <div className="account-info-field">
              <span className="info-label">Último acesso</span>
              <strong className="info-value">{user?.lastAccess || '20/05/2025 às 14:30'}</strong>
            </div>

            <div className="account-security-badge">
              <ShieldCheck size={16} />
              <span>Autenticação em duas etapas ativa</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}

