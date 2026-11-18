import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import './styles.css';

// Mock Data (in-memory data set; every indicator is derived from it)
import { INITIAL_ASSETS, INITIAL_MAINTENANCES, INITIAL_MOVEMENTS } from './data/mockData';

// Preferences (theme + language) & i18n
import { PreferencesProvider, usePreferences } from './preferences/PreferencesProvider';
import { useI18n } from './i18n';

// Utils
import { calculateAlerts, hasNoOwner, isPendingMaintenance } from './utils/alerts';
import { buildUser, endSession, getSession, startSession } from './utils/auth';
import { storage } from './utils/storage';
import { toStorageDate } from './utils/dates';

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
  '#/configuracoes': 'settings',
  '#/movimentacoes': 'movements',
  '#/relatorios': 'reports',
  '#/suporte': 'support'
};

const PAGE_TO_HASH = {
  landing: '#/',
  login: '#/login',
  dashboard: '#/dashboard',
  assets: '#/ativos',
  'asset-detail': '#/detalhes',
  maintenances: '#/manutencoes',
  'new-asset': '#/novo-ativo',
  profile: '#/perfil',
  movements: '#/movimentacoes',
  reports: '#/relatorios',
  support: '#/suporte',
  settings: '#/configuracoes',
  inventory: '#/ativos'
};

// Pages that do not require an authenticated session
const PUBLIC_PAGES = new Set(['landing', 'login']);

function parseLocationHash() {
  const raw = window.location.hash || '';
  const detail = raw.match(/^#\/detalhes\/(.+)$/i);
  if (detail) {
    let assetId = detail[1];
    try {
      assetId = decodeURIComponent(assetId);
    } catch {
      /* keep raw */
    }
    return { page: 'asset-detail', assetId };
  }
  return { page: ROUTE_MAP[raw.toLowerCase()] || 'landing', assetId: null };
}

function hashFor(page, assetId) {
  if (page === 'asset-detail' && assetId) return `#/detalhes/${encodeURIComponent(assetId)}`;
  return PAGE_TO_HASH[page] || '#/';
}

const DATA_KEYS = {
  assets: 'techassets:data:assets:v1',
  maintenances: 'techassets:data:maintenances:v1',
  movements: 'techassets:data:movements:v1',
  tickets: 'techassets:data:tickets:v1',
  userPrefix: 'techassets:user:profile:'
};

function readStoredList(key, fallback) {
  const raw = storage.get(key);
  if (raw === null) return fallback;
  try {
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

function loadUserProfile(accountId) {
  const base = buildUser(accountId);
  if (!accountId) return base;
  const raw = storage.get(DATA_KEYS.userPrefix + accountId);
  if (!raw) return base;
  try {
    return { ...base, ...JSON.parse(raw) };
  } catch {
    return base;
  }
}

function App() {
  const { t } = useI18n();
  const { activateAccount, deactivateAccount } = usePreferences();

  // Authentication session (persisted) → decides who sees the internal pages
  const [session, setSession] = useState(getSession);
  const isAuthenticated = Boolean(session);

  const initialLocation = useMemo(parseLocationHash, []);
  const [currentPage, setCurrentPage] = useState(initialLocation.page);
  const [selectedAssetId, setSelectedAssetId] = useState(initialLocation.assetId);

  // Core data (persisted in localStorage so changes survive reloads)
  const [assets, setAssets] = useState(() => readStoredList(DATA_KEYS.assets, INITIAL_ASSETS));
  const [maintenances, setMaintenances] = useState(() =>
    readStoredList(DATA_KEYS.maintenances, INITIAL_MAINTENANCES)
  );
  const [movements, setMovements] = useState(() =>
    readStoredList(DATA_KEYS.movements, INITIAL_MOVEMENTS)
  );
  const [tickets, setTickets] = useState(() => readStoredList(DATA_KEYS.tickets, []));
  const [user, setUser] = useState(() => loadUserProfile(session?.accountId));

  useEffect(() => {
    storage.set(DATA_KEYS.assets, JSON.stringify(assets));
  }, [assets]);

  useEffect(() => {
    storage.set(DATA_KEYS.maintenances, JSON.stringify(maintenances));
  }, [maintenances]);

  useEffect(() => {
    storage.set(DATA_KEYS.movements, JSON.stringify(movements));
  }, [movements]);

  useEffect(() => {
    storage.set(DATA_KEYS.tickets, JSON.stringify(tickets));
  }, [tickets]);

  const handleUpdateUser = useCallback(
    (updatedUser) => {
      setUser(updatedUser);
      if (session?.accountId) {
        storage.set(DATA_KEYS.userPrefix + session.accountId, JSON.stringify(updatedUser));
      }
    },
    [session]
  );

  // Global UI states
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState(null);
  const [toast, setToast] = useState(null);

  const selectedAsset = useMemo(
    () => assets.find((a) => a.id === selectedAssetId) || null,
    [assets, selectedAssetId]
  );

  // Alerts & pending counters are derived from the real records on every change
  // (asset created / edited / transferred / removed, maintenance created...).
  const alerts = useMemo(() => calculateAlerts(assets, maintenances, t), [assets, maintenances, t]);
  const pendingMaintenanceCount = useMemo(() => {
    const ids = new Set(assets.map((a) => a.id));
    return maintenances.filter((m) => isPendingMaintenance(m) && ids.has(m.assetId)).length;
  }, [assets, maintenances]);

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
      const raw = window.location.hash.toLowerCase();
      const loc = parseLocationHash();
      if (ROUTE_MAP[raw] || loc.assetId) {
        setCurrentPage(loc.page);
        if (loc.assetId) setSelectedAssetId(loc.assetId);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Navigation Handler
  const navigate = useCallback((pageId, options = {}) => {
    if (options.category) {
      setSelectedCategoryFilter(options.category);
    } else if (options.clearCategory || pageId !== 'assets') {
      setSelectedCategoryFilter(null);
    }

    const assetId = options.assetId !== undefined ? options.assetId : undefined;
    if (assetId) setSelectedAssetId(assetId);

    setCurrentPage(pageId);
    const newHash = hashFor(pageId, assetId || (pageId === 'asset-detail' ? selectedAssetId : null));
    if (window.location.hash !== newHash) {
      window.location.hash = newHash;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [selectedAssetId]);

  // Access control: internal pages require a session; the login page is skipped when already signed in
  const effectivePage = isAuthenticated || PUBLIC_PAGES.has(currentPage) ? currentPage : 'login';
  useEffect(() => {
    if (!isAuthenticated && !PUBLIC_PAGES.has(currentPage)) {
      setCurrentPage('login');
      window.location.hash = '#/login';
    } else if (isAuthenticated && currentPage === 'login') {
      setCurrentPage('dashboard');
      window.location.hash = '#/dashboard';
    }
  }, [isAuthenticated, currentPage]);

  // -------------------------------------------------------------------------
  // Movements
  // -------------------------------------------------------------------------
  const addMovement = useCallback((movement) => {
    setMovements((prev) => [
      {
        id: `MOV-${Date.now()}-${prev.length}`,
        at: new Date().toISOString(),
        ...movement
      },
      ...prev
    ]);
  }, []);

  // -------------------------------------------------------------------------
  // Asset actions
  // -------------------------------------------------------------------------
  const handleSelectAsset = (asset) => {
    navigate('asset-detail', { assetId: asset.id });
  };

  const handleAddAsset = (newAsset) => {
    setAssets((prev) => [newAsset, ...prev]);
    addMovement({
      assetName: newAsset.name || newAsset.model,
      assetId: newAsset.id,
      from: newAsset.supplier || { i18n: 'movements.supplier' },
      to: newAsset.location,
      type: 'Entrada',
      tagTone: 'taggreen'
    });
  };

  const handleDeleteAsset = (assetId) => {
    setAssets((prev) => prev.filter((a) => a.id !== assetId));
    if (selectedAssetId === assetId) setSelectedAssetId(null);
    notify(t('assets.removedSuccess'), 'info');
  };

  // Edit / transfer: updates the record and, when the holder or place changed, logs the movement
  const handleUpdateAsset = (assetId, changes) => {
    const old = assets.find((a) => a.id === assetId);
    if (!old) return false;

    const person = String(changes.person ?? old.person ?? '').trim() || '—';
    const warranty =
      changes.warranty !== undefined
        ? changes.warranty
          ? toStorageDate(changes.warranty) || changes.warranty
          : ''
        : old.warranty;
    const next = {
      ...old,
      name: String(changes.name ?? old.name).trim() || old.name,
      person,
      location: String(changes.location ?? old.location).trim() || old.location,
      status: changes.status || old.status,
      warranty
    };

    setAssets((prev) => prev.map((a) => (a.id === assetId ? next : a)));

    const personChanged = old.person !== next.person;
    const locationChanged = old.location !== next.location;
    if (personChanged || locationChanged) {
      const holder = (a) => (hasNoOwner(a) ? a.location : a.person);
      addMovement({
        assetName: next.name,
        assetId,
        from: personChanged ? holder(old) : old.location,
        to: personChanged ? holder(next) : next.location,
        type: 'Transferência',
        tagTone: 'tagblue'
      });
    }
    return true;
  };

  const handleTransferAsset = (assetId, { person, location }) => {
    const old = assets.find((a) => a.id === assetId);
    if (!old) return false;
    const owner = String(person || '').trim();
    let status = old.status;
    if (owner && status === 'Disponível') status = 'Em uso';
    if (!owner && status === 'Em uso') status = 'Disponível';
    return handleUpdateAsset(assetId, { person: owner, location: location || old.location, status });
  };

  // Maintenance actions
  const handleAddMaintenance = (newRecord) => {
    setMaintenances((prev) => [newRecord, ...prev]);
  };

  // Support ticket actions
  const handleAddTicket = (ticketData) => {
    const nextNumber =
      tickets.reduce(
        (max, item) => Math.max(max, parseInt(String(item.id).replace(/\D/g, ''), 10) || 0),
        0
      ) + 1;
    const created = {
      id: `CHM-${String(nextNumber).padStart(3, '0')}`,
      subject: ticketData.subject.trim(),
      category: ticketData.category,
      priority: ticketData.priority,
      assetId: ticketData.assetId || '',
      assetName: ticketData.assetName || '',
      description: ticketData.description.trim(),
      status: 'Aberto',
      requester: user?.name || '',
      requesterEmail: user?.email || '',
      createdAt: new Date().toISOString()
    };
    setTickets((prev) => [created, ...prev]);
    return created;
  };

  const handleUpdateTicketStatus = (ticketId, status) => {
    setTickets((prev) => prev.map((tk) => (tk.id === ticketId ? { ...tk, status } : tk)));
  };

  const handleDeleteTicket = (ticketId) => {
    setTickets((prev) => prev.filter((tk) => tk.id !== ticketId));
  };

  // Category selection from the dashboard / sidebar
  const handleSelectCategory = (catKey) => {
    setSelectedCategoryFilter(catKey);
    navigate('assets', { category: catKey });
  };

  // -------------------------------------------------------------------------
  // Auth handlers
  // -------------------------------------------------------------------------
  const handleLoginSuccess = (email) => {
    const newSession = startSession(email || buildUser().email);
    setSession(newSession);
    setUser(loadUserProfile(newSession.accountId));
    activateAccount(newSession.accountId); // loads this user's saved theme + language
    setCurrentPage('dashboard');
    window.location.hash = '#/dashboard';
    window.scrollTo({ top: 0 });
  };

  const handleLogout = () => {
    endSession();
    deactivateAccount();
    setSession(null);
    setSearchTerm('');
    navigate('login');
    notify(t('toast.loggedOut'));
  };

  const handleRequestAccess = () => {
    navigate('login');
    notify(t('landing.requestAccessInfo'), 'info');
  };

  // Render: Landing
  if (effectivePage === 'landing') {
    return (
      <>
        <LandingView assets={assets} onNavigate={navigate} onRequestAccess={handleRequestAccess} />
        <Toast toast={toast} onDismiss={dismissToast} />
      </>
    );
  }

  // Render: Login
  if (effectivePage === 'login') {
    return (
      <>
        <LoginView
          onLoginSuccess={handleLoginSuccess}
          onNavigate={navigate}
          onRequestAccess={handleRequestAccess}
          onNotify={notify}
        />
        <Toast toast={toast} onDismiss={dismissToast} />
      </>
    );
  }

  // Authenticated workspace
  return (
    <AppLayout
      currentPage={effectivePage}
      currentCategory={selectedCategoryFilter}
      onNavigate={navigate}
      user={user}
      alerts={alerts}
      assets={assets}
      maintenanceCount={pendingMaintenanceCount}
      onSelectAsset={handleSelectAsset}
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      toast={toast}
      onDismissToast={dismissToast}
      onLogout={handleLogout}
    >
      {effectivePage === 'dashboard' && (
        <DashboardView
          assets={assets}
          movements={movements}
          alerts={alerts}
          onNavigate={navigate}
          onSelectAsset={handleSelectAsset}
          onSelectCategory={handleSelectCategory}
        />
      )}

      {effectivePage === 'assets' && (
        <AssetListView
          assets={assets}
          onSelectAsset={handleSelectAsset}
          onNavigate={navigate}
          onDeleteAsset={handleDeleteAsset}
          initialCategory={selectedCategoryFilter}
          onCategoryChange={(cat) => setSelectedCategoryFilter(cat)}
          onNotify={notify}
        />
      )}

      {effectivePage === 'inventory' && (
        <AssetListView
          assets={assets}
          onSelectAsset={handleSelectAsset}
          onNavigate={navigate}
          onDeleteAsset={handleDeleteAsset}
          initialCategory={null}
          onNotify={notify}
        />
      )}

      {effectivePage === 'asset-detail' && (
        <AssetDetailView
          asset={selectedAsset}
          onBack={() => navigate('assets')}
          onNavigate={navigate}
          onNotify={notify}
          onUpdateAsset={handleUpdateAsset}
          maintenances={maintenances}
          movements={movements}
        />
      )}

      {effectivePage === 'maintenances' && (
        <MaintenanceView
          assets={assets}
          maintenances={maintenances}
          onAddMaintenance={handleAddMaintenance}
          onBack={() => navigate('assets')}
          onNotify={notify}
        />
      )}

      {effectivePage === 'new-asset' && (
        <NewAssetView
          assetIds={assets.map((a) => a.id)}
          onAddAsset={handleAddAsset}
          onBack={() => navigate('assets')}
          onNavigate={navigate}
          onNotify={notify}
        />
      )}

      {(effectivePage === 'profile' || effectivePage === 'settings') && (
        <UserProfileView
          user={user}
          onUpdateUser={handleUpdateUser}
          onNotify={notify}
          mode={effectivePage}
        />
      )}

      {effectivePage === 'movements' && (
        <MovementsView
          assets={assets}
          movements={movements}
          onTransferAsset={handleTransferAsset}
          onNotify={notify}
        />
      )}

      {effectivePage === 'reports' && <ReportsView assets={assets} onNotify={notify} />}

      {effectivePage === 'support' && (
        <SupportView
          assets={assets}
          tickets={tickets}
          onAddTicket={handleAddTicket}
          onUpdateTicketStatus={handleUpdateTicketStatus}
          onDeleteTicket={handleDeleteTicket}
          onSelectAsset={handleSelectAsset}
          onNotify={notify}
        />
      )}
    </AppLayout>
  );
}

createRoot(document.getElementById('root')).render(
  <PreferencesProvider>
    <App />
  </PreferencesProvider>
);
