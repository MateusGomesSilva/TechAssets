import React, { useState } from 'react';
import {
  Menu,
  Search,
  Bell,
  HelpCircle,
  ChevronDown,
  User,
  Settings,
  LogOut,
  Layers,
  AlertTriangle,
  Clock3,
  ShieldCheck,
  Check
} from 'lucide-react';

export function Topbar({
  onOpenMobile,
  searchTerm,
  onSearchChange,
  onOpenCommandPalette,
  onNavigate,
  user,
  alerts = [],
  onLogout,
  currentPage
}) {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showScreenPicker, setShowScreenPicker] = useState(false);

  const screens = [
    { id: 'landing', label: '1. Início / Banner Hero (01)' },
    { id: 'login', label: '2. Login / Autenticação (02)' },
    { id: 'dashboard', label: '3. Dashboard Geral (03)' },
    { id: 'assets', label: '4. Lista de Ativos (04)' },
    { id: 'asset-detail', label: '5. Detalhes do Ativo (05)' },
    { id: 'maintenances', label: '6. Manutenções (07)' },
    { id: 'new-asset', label: '7. Novo Ativo / Cadastro (08)' },
    { id: 'profile', label: '8. Perfil do Usuário (09)' }
  ];

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-trigger"
          onClick={onOpenMobile}
          aria-label="Abrir menu de navegação"
        >
          <Menu size={22} />
        </button>

        {/* Global Search Bar with Ctrl+K shortcut prompt */}
        <div
          className="topbar-search-wrapper"
          onClick={onOpenCommandPalette}
          role="search"
          title="Clique ou pressione Ctrl+K para busca global"
        >
          <Search size={17} className="search-icon" />
          <input
            type="text"
            className="topbar-search-input"
            placeholder="Buscar ativo, patrimônio, responsável..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={(e) => {
              if (onOpenCommandPalette) {
                e.target.blur();
                onOpenCommandPalette();
              }
            }}
          />
          <kbd className="topbar-kbd-shortcut">Ctrl K</kbd>
        </div>
      </div>

      <div className="topbar-right">
        {/* Quick Screen Switcher Demo pill */}
        <div className="screen-picker-wrapper">
          <button
            className="screen-picker-btn"
            onClick={() => {
              setShowScreenPicker(!showScreenPicker);
              setShowNotifications(false);
              setShowUserMenu(false);
            }}
            title="Navegador rápido de telas do projeto"
          >
            <Layers size={15} />
            <span className="screen-picker-label">Módulos de Referência</span>
            <ChevronDown size={14} />
          </button>

          {showScreenPicker && (
            <div className="dropdown-panel screen-dropdown">
              <div className="dropdown-header">
                <b>Telas & Módulos TechAssets</b>
                <small>Clique para alternar imediatamente:</small>
              </div>
              <div className="dropdown-items-list">
                {screens.map((sc) => (
                  <button
                    key={sc.id}
                    className={`dropdown-item-btn ${currentPage === sc.id ? 'active' : ''}`}
                    onClick={() => {
                      onNavigate(sc.id);
                      setShowScreenPicker(false);
                    }}
                  >
                    <span>{sc.label}</span>
                    {currentPage === sc.id && <Check size={14} className="check-icon" />}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Help button */}
        <button
          className="topbar-icon-btn"
          title="Central de Ajuda"
          onClick={() => onNavigate('support')}
          aria-label="Central de Ajuda"
        >
          <HelpCircle size={19} />
        </button>

        {/* Notifications button */}
        <div className="topbar-notifications-wrapper">
          <button
            className="topbar-icon-btn notification-btn"
            title="Notificações e Alertas"
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
              setShowScreenPicker(false);
            }}
            aria-label="Notificações"
          >
            <Bell size={19} />
            <span className="notification-badge-dot" />
          </button>

          {showNotifications && (
            <div className="dropdown-panel notification-dropdown">
              <div className="dropdown-header">
                <b>Alertas e Notificações</b>
                <span className="badge-count">{alerts.length} pendências</span>
              </div>
              <div className="dropdown-items-list">
                {alerts.map((al) => (
                  <div key={al.id} className="notification-item">
                    <div className={`notif-icon notif-${al.tone}`}>
                      {al.tone === 'danger' ? (
                        <AlertTriangle size={15} />
                      ) : al.tone === 'warning' ? (
                        <ShieldCheck size={15} />
                      ) : (
                        <Clock3 size={15} />
                      )}
                    </div>
                    <div className="notif-content">
                      <p className="notif-title">{al.text}</p>
                      <small className="notif-subtitle">{al.subtext}</small>
                    </div>
                  </div>
                ))}
              </div>
              <div className="dropdown-footer">
                <button
                  className="dropdown-footer-link"
                  onClick={() => {
                    onNavigate('maintenances');
                    setShowNotifications(false);
                  }}
                >
                  Ver todas as manutenções
                </button>
              </div>
            </div>
          )}
        </div>

        {/* User profile button */}
        <div className="topbar-user-wrapper">
          <button
            className="topbar-user-btn"
            onClick={() => {
              setShowUserMenu(!showUserMenu);
              setShowNotifications(false);
              setShowScreenPicker(false);
            }}
            aria-label="Menu do usuário"
          >
            <div className="topbar-avatar">{user?.avatarText || 'JS'}</div>
            <div className="topbar-user-meta">
              <span className="topbar-user-name">{user?.name || 'João da Silva'}</span>
              <span className="topbar-user-role">{user?.profileType || 'Administrador'}</span>
            </div>
            <ChevronDown size={15} className="topbar-chevron" />
          </button>

          {showUserMenu && (
            <div className="dropdown-panel user-dropdown">
              <div className="dropdown-user-header">
                <b>{user?.name}</b>
                <small>{user?.email}</small>
              </div>
              <div className="dropdown-divider" />
              <button
                className="dropdown-menu-item"
                onClick={() => {
                  onNavigate('profile');
                  setShowUserMenu(false);
                }}
              >
                <User size={16} />
                <span>Meu Perfil</span>
              </button>
              <button
                className="dropdown-menu-item"
                onClick={() => {
                  onNavigate('settings');
                  setShowUserMenu(false);
                }}
              >
                <Settings size={16} />
                <span>Configurações</span>
              </button>
              <div className="dropdown-divider" />
              <button
                className="dropdown-menu-item item-logout"
                onClick={() => {
                  setShowUserMenu(false);
                  if (onLogout) onLogout();
                }}
              >
                <LogOut size={16} />
                <span>Sair da conta</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
