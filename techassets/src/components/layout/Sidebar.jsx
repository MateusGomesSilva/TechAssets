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
  User,
  X,
  LogOut,
  FolderOpen
} from 'lucide-react';
import { BrandLogo } from '../common/BrandLogo';

export function Sidebar({
  currentPage,
  onNavigate,
  mobileOpen,
  onCloseMobile,
  user,
  maintenanceCount = 3,
  onLogout
}) {
  const mainNav = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'assets', label: 'Ativos', icon: Package }
  ];

  const categoryNav = [
    { id: 'cat-Notebooks', label: 'Notebooks', icon: Laptop, category: 'Notebooks' },
    { id: 'cat-Celulares', label: 'Celulares', icon: Smartphone, category: 'Celulares' },
    { id: 'cat-Tablets', label: 'Tablets', icon: Tablet, category: 'Tablets' },
    { id: 'cat-Desktops', label: 'Desktops', icon: Monitor, category: 'Desktops' },
    { id: 'cat-Monitores', label: 'Monitores', icon: Monitor, category: 'Monitores' },
    { id: 'cat-Acessórios', label: 'Acessórios', icon: Headphones, category: 'Acessórios' }
  ];

  const operationNav = [
    { id: 'inventory', label: 'Inventário Geral', icon: FolderOpen },
    { id: 'movements', label: 'Movimentações', icon: ArrowLeftRight },
    { id: 'maintenances', label: 'Manutenções', icon: Wrench, badge: maintenanceCount },
    { id: 'reports', label: 'Relatórios', icon: BarChart3 }
  ];

  const bottomNav = [
    { id: 'support', label: 'Suporte', icon: HelpCircle },
    { id: 'profile', label: 'Perfil do Usuário', icon: User },
    { id: 'settings', label: 'Configurações', icon: Settings }
  ];

  const isCurrent = (id, category) => {
    if (category) {
      return currentPage === 'assets' && window.__currentCategoryFilter === category;
    }
    return currentPage === id;
  };

  const handleNav = (id, category) => {
    if (category) {
      window.__currentCategoryFilter = category;
      onNavigate('assets', { category });
    } else {
      window.__currentCategoryFilter = null;
      onNavigate(id);
    }
    if (onCloseMobile) onCloseMobile();
  };

  return (
    <>
      {mobileOpen && <div className="sidebar-scrim" onClick={onCloseMobile} />}
      <aside className={`app-sidebar ${mobileOpen ? 'open' : ''}`}>
        <div className="sidebar-header">
          <BrandLogo variant="light" size="default" clickable onClick={() => handleNav('landing')} />
          <button className="sidebar-close-btn" onClick={onCloseMobile} aria-label="Fechar menu">
            <X size={20} />
          </button>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-section">
            <span className="nav-section-title">PRINCIPAL</span>
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
            <span className="nav-section-title">CATEGORIAS</span>
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
            <span className="nav-section-title">OPERAÇÃO & GESTÃO</span>
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
                  {item.badge ? (
                    <span className="nav-counter">{item.badge}</span>
                  ) : null}
                </button>
              );
            })}
          </div>

          <div className="nav-section nav-section-bottom">
            <span className="nav-section-title">SISTEMA</span>
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
            title="Ver meu perfil"
          >
            <div className="user-avatar-circle">{user?.avatarText || 'JS'}</div>
            <div className="user-info">
              <span className="user-name">{user?.name || 'João da Silva'}</span>
              <span className="user-role">{user?.profileType || 'Administrador'}</span>
            </div>
          </div>
          <button 
            className="sidebar-logout-btn" 
            onClick={onLogout}
            title="Sair da conta"
            aria-label="Sair"
          >
            <LogOut size={16} />
          </button>
        </div>
      </aside>
    </>
  );
}

