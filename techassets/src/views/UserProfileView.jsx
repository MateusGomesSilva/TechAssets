import React, { useState, useEffect } from 'react';
import {
  User,
  KeyRound,
  Sliders,
  Bell,
  Laptop,
  ChevronRight,
  ShieldCheck,
  Save,
  Smartphone
} from 'lucide-react';
import { useI18n, createTranslator, formatDate, profileTypeLabel } from '../i18n';
import { usePreferences } from '../preferences/PreferencesProvider';
import { parseDate } from '../utils/dates';

function formatLastAccess(value, language, t) {
  const d = parseDate(value);
  if (!d) return value || '—';
  const datePart = formatDate(d, language);
  const timePart = new Intl.DateTimeFormat(language, {
    hour: '2-digit',
    minute: '2-digit'
  }).format(d);
  return t('settings.dateAtTime', { date: datePart, time: timePart });
}

function initialsFromName(name) {
  const parts = String(name || '').trim().split(/\s+/).filter(Boolean);
  if (parts.length === 0) return 'US';
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase();
  return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
}

export function UserProfileView({ user, onUpdateUser, onNotify, mode = 'settings' }) {
  const { t, language } = useI18n();
  const { theme, language: prefLanguage, resolvedTheme, savePreferences } = usePreferences();

  const [activeSubMenu, setActiveSubMenu] = useState('pessoais');
  const [selectedTheme, setSelectedTheme] = useState(theme);
  const [selectedLang, setSelectedLang] = useState(prefLanguage);

  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    role: user?.role || '',
    department: user?.department || '',
    phone: user?.phone || ''
  });

  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });

  const [notifications, setNotifications] = useState({
    warranty: true,
    maintenance: true,
    weeklySummary: true
  });

  const [mobileSessionActive, setMobileSessionActive] = useState(true);

  useEffect(() => {
    setFormData({
      name: user?.name || '',
      email: user?.email || '',
      role: user?.role || '',
      department: user?.department || '',
      phone: user?.phone || ''
    });
  }, [user]);

  useEffect(() => {
    setSelectedTheme(theme);
  }, [theme]);

  useEffect(() => {
    setSelectedLang(prefLanguage);
  }, [prefLanguage]);

  const handleSavePersonal = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.email.trim()) {
      if (onNotify) onNotify(t('settings.personalError'), 'error');
      return;
    }
    if (onUpdateUser) {
      onUpdateUser({
        ...user,
        ...formData,
        name: formData.name.trim(),
        email: formData.email.trim(),
        avatarText: initialsFromName(formData.name)
      });
    }
    if (onNotify) onNotify(t('settings.saveSuccess'));
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    if (!passwordData.currentPassword || !passwordData.newPassword) {
      if (onNotify) onNotify(t('settings.passEmpty'), 'error');
      return;
    }
    if (passwordData.newPassword.length < 8) {
      if (onNotify) onNotify(t('settings.passTooShort'), 'error');
      return;
    }
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      if (onNotify) onNotify(t('settings.passMismatch'), 'error');
      return;
    }
    if (onNotify) onNotify(t('settings.passSuccess'));
    setPasswordData({ currentPassword: '', newPassword: '', confirmPassword: '' });
  };

  // Immediate application + persistence for theme and language
  const handleThemeChange = (nextTheme) => {
    setSelectedTheme(nextTheme);
    savePreferences({ theme: nextTheme });
  };

  const handleLanguageChange = (nextLang) => {
    setSelectedLang(nextLang);
    savePreferences({ language: nextLang });
  };

  const handleSavePreferences = (e) => {
    e.preventDefault();
    const saved = savePreferences({ theme: selectedTheme, language: selectedLang });
    const nextT = createTranslator(saved.language);
    if (onNotify) onNotify(nextT('settings.prefsSuccess'));
  };

  const subMenuTitles = {
    pessoais: t('settings.myInfo'),
    senha: t('settings.tabPassword'),
    preferencias: t('settings.tabPreferences'),
    notificacoes: t('settings.tabNotifications'),
    sessoes: t('settings.tabSessions')
  };

  const rootBreadcrumb = mode === 'profile' ? t('settings.breadcrumbProfile') : t('nav.settings');

  return (
    <div className="view-container user-profile-view">
      {/* Breadcrumb */}
      <div className="detail-breadcrumb-bar">
        <div className="breadcrumb-path">
          <span className="breadcrumb-segment">{rootBreadcrumb}</span>
          <ChevronRight size={14} className="breadcrumb-sep" />
          <span className="breadcrumb-current">{subMenuTitles[activeSubMenu]}</span>
        </div>
      </div>

      {/* Main Profile / Settings Layout Card */}
      <div className="profile-layout-card">
        {/* Left Sub-nav Column */}
        <aside className="profile-subnav-column">
          <button
            type="button"
            className={`subnav-pill-btn ${activeSubMenu === 'pessoais' ? 'active' : ''}`}
            onClick={() => setActiveSubMenu('pessoais')}
          >
            <User size={17} />
            <span>{t('settings.tabPersonal')}</span>
          </button>

          <button
            type="button"
            className={`subnav-pill-btn ${activeSubMenu === 'senha' ? 'active' : ''}`}
            onClick={() => setActiveSubMenu('senha')}
          >
            <KeyRound size={17} />
            <span>{t('settings.tabPassword')}</span>
          </button>

          <button
            type="button"
            className={`subnav-pill-btn ${activeSubMenu === 'preferencias' ? 'active' : ''}`}
            onClick={() => setActiveSubMenu('preferencias')}
          >
            <Sliders size={17} />
            <span>{t('settings.tabPreferences')}</span>
          </button>

          <button
            type="button"
            className={`subnav-pill-btn ${activeSubMenu === 'notificacoes' ? 'active' : ''}`}
            onClick={() => setActiveSubMenu('notificacoes')}
          >
            <Bell size={17} />
            <span>{t('settings.tabNotifications')}</span>
          </button>

          <button
            type="button"
            className={`subnav-pill-btn ${activeSubMenu === 'sessoes' ? 'active' : ''}`}
            onClick={() => setActiveSubMenu('sessoes')}
          >
            <Laptop size={17} />
            <span>{t('settings.tabSessions')}</span>
          </button>
        </aside>

        {/* Middle Column: Form */}
        <main className="profile-form-column">
          {activeSubMenu === 'pessoais' && (
            <form onSubmit={handleSavePersonal} className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="user-fullname">{t('settings.fullName')}</label>
                <input
                  id="user-fullname"
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-email">{t('settings.email')}</label>
                <input
                  id="user-email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-role">{t('settings.role')}</label>
                <input
                  id="user-role"
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData({ ...formData, role: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-dept">{t('settings.department')}</label>
                <input
                  id="user-dept"
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="user-phone">{t('settings.phone')}</label>
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
                  <span>{t('settings.saveChanges')}</span>
                </button>
              </div>
            </form>
          )}

          {activeSubMenu === 'senha' && (
            <form onSubmit={handleChangePassword} className="profile-edit-form">
              <div className="form-group">
                <label htmlFor="pass-current">{t('settings.currentPass')}</label>
                <input
                  id="pass-current"
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
                <label htmlFor="pass-new">{t('settings.newPass')}</label>
                <input
                  id="pass-new"
                  type="password"
                  placeholder={t('settings.newPassPlaceholder')}
                  value={passwordData.newPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, newPassword: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="pass-confirm">{t('settings.confirmPass')}</label>
                <input
                  id="pass-confirm"
                  type="password"
                  placeholder={t('settings.confirmPassPlaceholder')}
                  value={passwordData.confirmPassword}
                  onChange={(e) =>
                    setPasswordData({ ...passwordData, confirmPassword: e.target.value })
                  }
                  required
                />
              </div>

              <div className="profile-action-row">
                <button type="submit" className="btn btn-primary">
                  {t('settings.updatePass')}
                </button>
              </div>
            </form>
          )}

          {activeSubMenu === 'preferencias' && (
            <form onSubmit={handleSavePreferences} className="profile-edit-form">
              <div className="pref-row">
                <div>
                  <label htmlFor="pref-theme-select" className="pref-label">
                    <strong>{t('settings.themeTitle')}</strong>
                  </label>
                  <p>
                    {t('settings.themeDesc')}
                    {selectedTheme === 'system' && (
                      <>
                        {' '}
                        ({t('settings.systemDetected', {
                          mode: resolvedTheme === 'dark' ? t('settings.modeDark') : t('settings.modeLight')
                        })})
                      </>
                    )}
                  </p>
                </div>
                <select
                  id="pref-theme-select"
                  className="pref-select"
                  value={selectedTheme}
                  onChange={(e) => handleThemeChange(e.target.value)}
                >
                  <option value="light">{t('settings.themeLight')}</option>
                  <option value="dark">{t('settings.themeDark')}</option>
                  <option value="system">{t('settings.themeSystem')}</option>
                </select>
              </div>

              <div className="pref-row">
                <div>
                  <label htmlFor="pref-lang-select" className="pref-label">
                    <strong>{t('settings.langTitle')}</strong>
                  </label>
                  <p>{t('settings.langDesc')}</p>
                </div>
                <select
                  id="pref-lang-select"
                  className="pref-select"
                  value={selectedLang}
                  onChange={(e) => handleLanguageChange(e.target.value)}
                >
                  <option value="pt-BR">{t('settings.langPt')}</option>
                  <option value="en-US">{t('settings.langEn')}</option>
                  <option value="es-ES">{t('settings.langEs')}</option>
                </select>
              </div>

              <div className="profile-action-row">
                <button type="submit" className="btn btn-primary">
                  <Save size={16} />
                  <span>{t('settings.savePrefs')}</span>
                </button>
              </div>
            </form>
          )}

          {activeSubMenu === 'notificacoes' && (
            <div className="profile-edit-form">
              <div className="pref-row">
                <div>
                  <strong>{t('settings.notifWarrantyTitle')}</strong>
                  <p>{t('settings.notifWarrantyDesc')}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.warranty}
                  onChange={(e) => {
                    setNotifications({ ...notifications, warranty: e.target.checked });
                    if (onNotify) onNotify(t('settings.notifSaved'));
                  }}
                />
              </div>
              <div className="pref-row">
                <div>
                  <strong>{t('settings.notifMaintTitle')}</strong>
                  <p>{t('settings.notifMaintDesc')}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.maintenance}
                  onChange={(e) => {
                    setNotifications({ ...notifications, maintenance: e.target.checked });
                    if (onNotify) onNotify(t('settings.notifSaved'));
                  }}
                />
              </div>
              <div className="pref-row">
                <div>
                  <strong>{t('settings.notifSummaryTitle')}</strong>
                  <p>{t('settings.notifSummaryDesc')}</p>
                </div>
                <input
                  type="checkbox"
                  checked={notifications.weeklySummary}
                  onChange={(e) => {
                    setNotifications({ ...notifications, weeklySummary: e.target.checked });
                    if (onNotify) onNotify(t('settings.notifSaved'));
                  }}
                />
              </div>
            </div>
          )}

          {activeSubMenu === 'sessoes' && (
            <div className="profile-edit-form">
              <div className="session-item-row">
                <Laptop size={20} className="session-icon" />
                <div className="session-meta">
                  <strong>{t('settings.sessionCurrentDevice')}</strong>
                  <small>{t('settings.sessionCurrentMeta')}</small>
                </div>
                <span className="badge-active-session">{t('settings.sessionActive')}</span>
              </div>

              {mobileSessionActive && (
                <div className="session-item-row">
                  <Smartphone size={20} className="session-icon" />
                  <div className="session-meta">
                    <strong>{t('settings.sessionMobileDevice')}</strong>
                    <small>{t('settings.sessionMobileMeta')}</small>
                  </div>
                  <button
                    type="button"
                    className="btn-revoke-session"
                    onClick={() => {
                      setMobileSessionActive(false);
                      if (onNotify) onNotify(t('settings.sessionRevoked'));
                    }}
                  >
                    {t('settings.sessionRevoke')}
                  </button>
                </div>
              )}
            </div>
          )}
        </main>

        {/* Right Column: Account Info Card */}
        <aside className="profile-account-column">
          <div className="account-info-card">
            <h3 className="account-info-title">{t('settings.accountInfo')}</h3>

            <div className="account-info-field">
              <span className="info-label">{t('settings.accountProfile')}</span>
              <strong className="info-value">
                {profileTypeLabel(t, user?.profileType) || t('nav.admin')}
              </strong>
            </div>

            <div className="account-info-field">
              <span className="info-label">{t('settings.memberSince')}</span>
              <strong className="info-value">{formatDate(user?.memberSince, language)}</strong>
            </div>

            <div className="account-info-field">
              <span className="info-label">{t('settings.lastAccess')}</span>
              <strong className="info-value">
                {formatLastAccess(user?.lastAccess, language, t)}
              </strong>
            </div>

            <div className="account-security-badge">
              <ShieldCheck size={16} />
              <span>{t('settings.twoFactorActive')}</span>
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
}
