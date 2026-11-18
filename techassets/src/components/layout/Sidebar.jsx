import React from 'react';
import {
  LayoutDashboard,
  Package,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Headphones,
  ArrowLeftRight,
  Wrench,
  BarChart3,
  HelpCircle,
  Settings,
  X,
  LogOut,
  FolderOpen
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';
import { useI18n, profileTypeLabel } from '../../i18n';

export function Sidebar({
  currentPage,
  currentCategory = null,
  onNavigate,
  mobileOpen,
  onCloseMobile,
  user,
  maintenanceCount = 0,
  onLogout
}) {
  const { t } = useI18n();

  const mainNav = [
    { id: 'dashboard', label: t('nav.dashboard'), icon: LayoutDashboard },
    { id: 'assets', label: t('nav.allAssets'), icon: Package }
  ];

  const categoryNav = [
    { id: 'cat-Notebooks', label: t('cat.notebooks'), icon: Laptop, category: 'Notebooks' },
    { id: 'cat-Celulares', label: t('cat.cellphones'), icon: Smartphone, category: 'Celulares' },
    { id: 'cat-Tablets', label: t('cat.tablets'), icon: Tablet, category: 'Tablets' },
    { id: 'cat-Desktops', label: t('cat.desktops'), icon: Monitor, category: 'Desktops' },
    { id: 'cat-Monitores', label: t('cat.monitors'), icon: Monitor, category: 'Monitores' },
    { id: 'cat-Acessórios', label: t('cat.accessories'), icon: Headphones, category: 'Acessórios' }
  ];

  const operationNav = [
    { id: 'inventory', label: t('nav.generalInventory'), icon: FolderOpen },
    { id: 'movements', label: t('nav.movements'), icon: ArrowLeftRight },
    { id: 'maintenances', label: t('nav.maintenances'), icon: Wrench, badge: maintenanceCount },
    { id: 'reports', label: t('nav.reports'), icon: BarChart3 }
  ];

  const bottomNav = [
    { id: 'support', label: t('nav.support'), icon: HelpCircle },
    { id: 'settings', label: t('nav.settings'), icon: Settings }
  ];

  const isCategoryMatch = (selected, itemCategory) => {
    if (!selected || !itemCategory) return false;
    const s = selected.toLowerCase().trim();
    const c = itemCategory.toLowerCase().trim();
    if (s === c) return true;
    if (s.startsWith(c) || c.startsWith(s)) return true;
    if ((s === 'acessórios' || s === 'acessorios' || s === 'accessories' || s === 'accesorios') && (c === 'acessório' || c === 'acessorio' || c === 'accessory' || c === 'accesorio')) return true;
    if ((c === 'acessórios' || c === 'acessorios' || c === 'accessories' || c === 'accesorios') && (s === 'acessório' || s === 'acessorio' || s === 'accessory' || s === 'accesorio')) return true;
    if ((s === 'monitores' || s === 'monitors') && (c === 'monitor')) return true;
    if ((s === 'celulares' || s === 'cellphones' || s === 'móviles' || s === 'moviles') && (c === 'celular' || c === 'cellphone' || c === 'móvil' || c === 'movil')) return true;
    return false;
  };

  const isCurrent = (id, category) => {
    if (category) {
      return currentPage === 'assets' && isCategoryMatch(currentCategory, category);
    }
    if (id === 'assets') {
      return currentPage === 'assets' && !currentCategory;
    }
    if (id === 'settings') {
      // Account settings page (also reached from the user card / user menu)
      return currentPage === 'settings' || currentPage === 'profile';
    }
    return currentPage === id;
  };

  const handleNav = (id, category) => {
    if (category) {
      onNavigate('assets', { category });
    } else {
      if (id === 'assets' || id === 'inventory') {
        onNavigate('assets', { clearCategory: true });
      } else {
        onNavigate(id);
      }
    }
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {mobileOpen && <div className="sidebar-scrim" onClick={onCloseMobile} />}
      <aside className={`app-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <BrandLogo size="default" clickable onClick={() => handleNav('landing')} />
          <button className="sidebar-close-btn" onClick={onCloseMobile} aria-label={t('nav.closeMenu')}>
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-section-title">{t('nav.main')}</span>
            {mainNav.map((item) => {
              const Icon = item.icon;
              const active = isCurrent(item.id);
              return (
                <button
                  key={item.id}
                  className={`nav-button ${active ? 'active' : ''}`}
                  onClick={() => handleNav(item.id)}
                >
                  <Icon size={18} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="nav-section">
            <span className="nav-section-title">{t('nav.categories')}</span>
            {categoryNav.map((item) => {
              const Icon = item.icon;
              const active = isCurrent(item.id, item.category);
              return (
                <button
                  key={item.id}
                  className={`nav-button ${active ? 'active' : ''}`}
                  onClick={() => handleNav(item.id, item.category)}
                >
                  <Icon size={18} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </button>
              );
            })}
          </div>

          <div className="nav-section">
            <span className="nav-section-title">{t('nav.operations')}</span>
            {operationNav.map((item) => {
              const Icon = item.icon;
              const active = isCurrent(item.id);
              return (
                <button
                  key={item.id}
                  className={`nav-button ${active ? 'active' : ''}`}
                  onClick={() => handleNav(item.id)}
                >
                  <Icon size={18} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                  {item.badge > 0 ? (
                    <span className="nav-counter">{item.badge}</span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="nav-section nav-section-bottom">
            <span className="nav-section-title">{t('nav.system')}</span>
            {bottomNav.map((item) => {
              const Icon = item.icon;
              const active = isCurrent(item.id);
              return (
                <button
                  key={item.id}
                  className={`nav-button ${active ? 'active' : ''}`}
                  onClick={() => handleNav(item.id)}
                >
                  <Icon size={18} className="nav-icon" />
                  <span className="nav-label">{item.label}</span>
                </button>
              );
            })}
          </div>
        </nav>

        <div className="sidebar-footer">
          <div 
            className="sidebar-user-card" 
            onClick={() => handleNav('profile')}
            title={t('topbar.profile')}
          >
            <div className="user-avatar-circle">{user?.avatarText}</div>
            <div className="user-info">
              <span className="user-name">{user?.name}</span>
              <span className="user-role">{profileTypeLabel(t, user?.profileType) || t('nav.admin')}</span>
            </div>
          </div>
          <button 
            className="sidebar-logout-btn" 
            onClick={onLogout}
            title={t('nav.logoutTitle')}
            aria-label={t('nav.logout')}
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}

