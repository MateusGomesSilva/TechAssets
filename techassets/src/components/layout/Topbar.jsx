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
  AlertTriangle,
  Clock3,
  ShieldCheck,
  CheckCircle2
} from 'lucide-react';
import { useI18n, profileTypeLabel } from '../../i18n';

function AlertIcon({ tone, size = 15 }) {
  if (tone === 'danger') return <AlertTriangle size={size} />;
  if (tone === 'warning') return <ShieldCheck size={size} />;
  if (tone === 'info') return <Clock3 size={size} />;
  return <CheckCircle2 size={size} />;
}

export function Topbar({
  onOpenMobile,
  searchTerm,
  onSearchChange,
  onOpenCommandPalette,
  onNavigate,
  user,
  alerts = [],
  onLogout
}) {
  const { t } = useI18n();
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);

  // Only real pending situations are listed / counted
  const activeAlerts = alerts.filter((al) => al.count > 0);
  const pendingTotal = activeAlerts.reduce((sum, al) => sum + al.count, 0);

  return (
    <header className="app-topbar">
      <div className="topbar-left">
        <button
          className="mobile-menu-trigger"
          onClick={onOpenMobile}
          aria-label={t('topbar.openMenu')}
        >
          <Menu size={22} />
        </button>

        {/* Global Search Bar with Ctrl+K shortcut prompt */}
        <div
          className="topbar-search-wrapper"
          onClick={onOpenCommandPalette}
          role="search"
          title={t('topbar.searchHint')}
        >
          <Search size={17} className="search-icon" />
          <input
            type="text"
            className="topbar-search-input"
            placeholder={t('topbar.search')}
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={(e) => {
              if (onOpenCommandPalette) {
                e.target.blur();
                onOpenCommandPalette();
              }
            }}
          />
          <kbd className="topbar-kbd-shortcut">{t('topbar.shortcut')}</kbd>
        </div>
      </div>

      <div className="topbar-right">
        {/* Help button */}
        <button
          className="topbar-icon-btn"
          title={t('topbar.help')}
          onClick={() => onNavigate('support')}
          aria-label={t('topbar.help')}
        >
          <HelpCircle size={19} />
        </button>

        {/* Notifications button */}
        <div className="topbar-notifications-wrapper">
          <button
            className="topbar-icon-btn notification-btn"
            title={t('topbar.notificationsTitle')}
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowUserMenu(false);
            }}
            aria-label={t('topbar.notifications')}
          >
            <Bell size={19} />
            {pendingTotal > 0 && <span className="notification-badge-dot" />}
          </button>

          {showNotifications && (
            <div className="dropdown-panel notification-dropdown">
              <div className="dropdown-header">
                <b>{t('topbar.alertsTitle')}</b>
                <span className="badge-count">
                  {t('topbar.pendingCount', { count: pendingTotal })}
                </span>
              </div>
              <div className="dropdown-items-list">
                {activeAlerts.length === 0 && (
                  <div className="notification-item notification-empty">
                    <div className="notif-icon notif-neutral">
                      <CheckCircle2 size={15} />
                    </div>
                    <div className="notif-content">
                      <p className="notif-title">{t('topbar.noNotifications')}</p>
                    </div>
                  </div>
                )}
                {activeAlerts.map((al) => (
                  <div
                    key={al.id}
                    className="notification-item"
                    onClick={() => {
                      onNavigate(al.route || 'maintenances');
                      setShowNotifications(false);
                    }}
                  >
                    <div className={`notif-icon notif-${al.tone}`}>
                      <AlertIcon tone={al.tone} />
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
                  {t('topbar.viewAllMaintenances')}
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
            }}
            aria-label={t('topbar.userMenu')}
          >
            <div className="topbar-avatar">{user?.avatarText}</div>
            <div className="topbar-user-meta">
              <span className="topbar-user-name">{user?.name}</span>
              <span className="topbar-user-role">
                {profileTypeLabel(t, user?.profileType) || t('nav.admin')}
              </span>
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
                <span>{t('topbar.profile')}</span>
              </button>
              <button
                className="dropdown-menu-item"
                onClick={() => {
                  onNavigate('settings');
                  setShowUserMenu(false);
                }}
              >
                <Settings size={16} />
                <span>{t('topbar.settings')}</span>
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
                <span>{t('topbar.logout')}</span>
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
}
