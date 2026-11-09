import React, { useState, useEffect, useCallback } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Mock Data
import {
  INITIAL_ASSETS,
  INITIAL_MAINTENANCES,
  INITIAL_MOVEMENTS,
  INITIAL_ALERTS,
  INITIAL_USER
} from './data/mockData';

// Layout & Common
import { AppLayout } from './components/layout/AppLayout';
import { Toast } from './components/common/Toast';

// Views
import { LandingView } from './views/LandingView';
import { LoginView } from './views/LoginView';
import { DashboardView } from './views/DashboardView';
import { AssetListView } from './views/AssetListView';
import { AssetDetailView } from './views/AssetDetailView';
import { MaintenanceView } from './views/MaintenanceView';
import { NewAssetView } from './views/NewAssetView';
import { UserProfileView } from './views/UserProfileView';
import { MovementsView } from './views/MovementsView';
import { ReportsView } from './views/ReportsView';
import { SupportView } from './views/SupportView';

// Route Map for SPA Hash Navigation
const ROUTE_MAP = {
  '': 'landing',
  '#/': 'landing',
  '#': 'landing',
  '#/inicio': 'landing',
  '#/login': 'login',
  '#/dashboard': 'dashboard',
  '#/ativos': 'assets',
  '#/assets': 'assets',
  '#/detalhes': 'asset-detail',
  '#/manutencoes': 'maintenances',
  '#/novo-ativo': 'new-asset',
  '#/perfil': 'profile',
  '#/movimentacoes': 'movements',
  '#/relatorios': 'reports',
  '#/suporte': 'support'
};

const PAGE_TO_HASH = {
  'landing': '#/',
  'login': '#/login',
  'dashboard': '#/dashboard',
  'assets': '#/ativos',
  'asset-detail': '#/detalhes',
  'maintenances': '#/manutencoes',
  'new-asset': '#/novo-ativo',
  'profile': '#/perfil',
  'movements': '#/movimentacoes',
  'reports': '#/relatorios',
  'support': '#/suporte',
  'settings': '#/perfil',
  'inventory': '#/ativos'
};

function App() {
  // Determine initial page from hash or default to landing
  const getInitialPage = () => {
    const hash = window.location.hash.toLowerCase();
    return ROUTE_MAP[hash] || 'landing';
  };

  const [currentPage, setCurrentPage] = useState(getInitialPage);
  const [isAuthenticated, setIsAuthenticated] = useState(true);

  // Core Data States
  const [assets, setAssets] = useState(INITIAL_ASSETS);
  const [selectedAsset, setSelectedAsset] = useState(INITIAL_ASSETS[0]);
  const [maintenances, setMaintenances] = useState(INITIAL_MAINTENANCES);
  const [movements, setMovements] = useState(INITIAL_MOVEMENTS);
  const [alerts, setAlerts] = useState(INITIAL_ALERTS);
  const [user, setUser] = useState(INITIAL_USER);

  // Global UI States
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(null);
  const [toast, setToast] = useState(null);

  // Toast Notification Trigger
  const notify = useCallback((message, type = 'success') => {
    setToast({ message, type });
    window.clearTimeout(window.__toastTimeout);
    window.__toastTimeout = window.setTimeout(() => {
      setToast(null);
    }, 3500);
  }, []);

  const dismissToast = () => {
    setToast(null);
    window.clearTimeout(window.__toastTimeout);
  };

  // Synchronize hash changes (browser back/forward buttons)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.toLowerCase();
      const matchedPage = ROUTE_MAP[hash];
      if (matchedPage) {
        setCurrentPage(matchedPage);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation Handler
  const navigate = (pageId, options = {}) => {
    if (options.category) {
      setSelectedCategoryFilter(options.category);
    } else if (pageId !== 'assets') {
      setSelectedCategoryFilter(null);
    }

    setCurrentPage(pageId);
    const newHash = PAGE_TO_HASH[pageId] || '#/';
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Asset Actions
  const handleSelectAsset = (asset) => {
    setSelectedAsset(asset);
    navigate('asset-detail');
  };

  const handleAddAsset = (newAsset) => {
    setAssets((prev) => [newAsset, ...prev]);

    // Create automatic entry in movements
    const newMovement = {
      id: `MOV-${Date.now().toString().slice(-4)}`,
      assetName: newAsset.name || newAsset.model,
      assetId: newAsset.id,
      route: `${newAsset.supplier || 'Fornecedor'} → ${newAsset.location}`,
      type: 'Entrada',
      time: 'Hoje, agora',
      tagTone: 'taggreen'
    };
    setMovements((prev) => [newMovement, ...prev]);
  };

  const handleDeleteAsset = (assetId) => {
    setAssets((prev) => prev.filter((a) => a.id !== assetId));
    notify('Ativo removido do inventário.', 'info');
  };

  // Maintenance Actions
  const handleAddMaintenance = (newRecord) => {
    setMaintenances((prev) => [newRecord, ...prev]);
  };

  // Category Selection from Landing or Donut
  const handleSelectCategory = (catKey) => {
    setSelectedCategoryFilter(catKey);
    navigate('assets');
  };

  // Auth Handlers
  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
    navigate('dashboard');
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    navigate('login');
    notify('Você saiu da sua conta.');
  };

  // Render 01: Landing View (Screen 01)
  if (currentPage === 'landing') {
    return (
      <>
        <LandingView
          onNavigate={navigate}
          onSelectCategory={handleSelectCategory}
        />
        <Toast toast={toast} onDismiss={dismissToast} />

        {/* Global floating switcher */}
        <div className="quick-demo-switcher">
          <div className="demo-switcher-header">
            <span>Módulos de Referência</span>
          </div>
          <div className="demo-switcher-pills">
            {[
              { id: 'landing', label: '01. Início' },
              { id: 'login', label: '02. Login' },
              { id: 'dashboard', label: '03. Dashboard' },
              { id: 'assets', label: '04. Ativos' },
              { id: 'asset-detail', label: '05. Detalhes' },
              { id: 'maintenances', label: '07. Manutenções' },
              { id: 'new-asset', label: '08. Novo Ativo' },
              { id: 'profile', label: '09. Perfil' }
            ].map((s) => (
              <button
                key={s.id}
                className={`demo-pill ${currentPage === s.id ? 'active' : ''}`}
                onClick={() => navigate(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  // Render 02: Login View (Screen 02)
  if (currentPage === 'login') {
    return (
      <>
        <LoginView
          onLoginSuccess={handleLoginSuccess}
          onNavigate={navigate}
          onNotify={notify}
        />
        <Toast toast={toast} onDismiss={dismissToast} />

        <div className="quick-demo-switcher">
          <div className="demo-switcher-header">
            <span>Módulos de Referência</span>
          </div>
          <div className="demo-switcher-pills">
            {[
              { id: 'landing', label: '01. Início' },
              { id: 'login', label: '02. Login' },
              { id: 'dashboard', label: '03. Dashboard' },
              { id: 'assets', label: '04. Ativos' },
              { id: 'asset-detail', label: '05. Detalhes' },
              { id: 'maintenances', label: '07. Manutenções' },
              { id: 'new-asset', label: '08. Novo Ativo' },
              { id: 'profile', label: '09. Perfil' }
            ].map((s) => (
              <button
                key={s.id}
                className={`demo-pill ${currentPage === s.id ? 'active' : ''}`}
                onClick={() => navigate(s.id)}
              >
                {s.label}
              </button>
            ))}
          </div>
        </div>
      </>
    );
  }

  // Authenticated Workspace Layout (Screens 03, 04, 05, 07, 08, 09, etc.)
  return (
    <AppLayout
      currentPage={currentPage}
      onNavigate={navigate}
      user={user}
      alerts={alerts}
      assets={assets}
      onSelectAsset={handleSelectAsset}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      toast={toast}
      onDismissToast={dismissToast}
      onLogout={handleLogout}
    >
      {currentPage === 'dashboard' && (
        <DashboardView
          assets={assets}
          movements={movements}
          alerts={alerts}
          onNavigate={navigate}
          onSelectAsset={handleSelectAsset}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {currentPage === 'assets' && (
        <AssetListView
          assets={assets}
          onSelectAsset={handleSelectAsset}
          onNavigate={navigate}
          onDeleteAsset={handleDeleteAsset}
          initialCategory={selectedCategoryFilter}
          onNotify={notify}
        />
      )}

      {currentPage === 'asset-detail' && (
        <AssetDetailView
          asset={selectedAsset}
          onBack={() => navigate('assets')}
          onNavigate={navigate}
          onNotify={notify}
          maintenances={maintenances}
        />
      )}

      {currentPage === 'maintenances' && (
        <MaintenanceView
          maintenances={maintenances}
          onAddMaintenance={handleAddMaintenance}
          onBack={() => navigate('assets')}
          onNotify={notify}
        />
      )}

      {currentPage === 'new-asset' && (
        <NewAssetView
          onAddAsset={handleAddAsset}
          onBack={() => navigate('assets')}
          onNavigate={navigate}
          onNotify={notify}
        />
      )}

      {currentPage === 'profile' && (
        <UserProfileView
          user={user}
          onUpdateUser={setUser}
          onNotify={notify}
        />
      )}

      {currentPage === 'movements' && (
        <MovementsView
          movements={movements}
          onBack={() => navigate('dashboard')}
          onNotify={notify}
        />
      )}

      {currentPage === 'reports' && (
        <ReportsView
          assets={assets}
          onNotify={notify}
        />
      )}

      {currentPage === 'support' && (
        <SupportView
          onNotify={notify}
        />
      )}

      {currentPage === 'settings' && (
        <UserProfileView
          user={user}
          onUpdateUser={setUser}
          onNotify={notify}
        />
      )}

      {currentPage === 'inventory' && (
        <AssetListView
          assets={assets}
          onSelectAsset={handleSelectAsset}
          onNavigate={navigate}
          onDeleteAsset={handleDeleteAsset}
          initialCategory={null}
          onNotify={notify}
        />
      )}
    </AppLayout>
  );
}

createRoot(document.getElementById('root')).render(<App />);
