import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Toast } from '../common/Toast';
import { CommandPalette } from '../ui/CommandPalette';
import { Layers, ChevronUp, ChevronDown, Check } from 'lucide-react';

export function AppLayout({
  currentPage,
  onNavigate,
  user,
  alerts,
  assets,
  onSelectAsset,
  searchTerm,
  onSearchChange,
  toast,
  onDismissToast,
  onLogout,
  children
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [demoBarCollapsed, setDemoBarCollapsed] = useState(false);
  const [commandPaletteOpen, setCommandPaletteOpen] = useState(false);

  // Global Ctrl+K / Cmd+K listener
  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setCommandPaletteOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const referenceScreens = [
    { id: 'landing', label: '01. Início / Banner' },
    { id: 'login', label: '02. Login' },
    { id: 'dashboard', label: '03. Dashboard' },
    { id: 'assets', label: '04. Lista de Ativos' },
    { id: 'asset-detail', label: '05. Detalhes' },
    { id: 'maintenances', label: '07. Manutenções' },
    { id: 'new-asset', label: '08. Novo Ativo' },
    { id: 'profile', label: '09. Perfil Usuário' }
  ];

  return (
    <div className="app-shell">
      <Sidebar
        currentPage={currentPage}
        onNavigate={onNavigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        user={user}
        onLogout={onLogout}
      />

      <div className="app-main-wrapper">
        <Topbar
          currentPage={currentPage}
          onOpenMobile={() => setMobileOpen(true)}
          searchTerm={searchTerm}
          onSearchChange={onSearchChange}
          onOpenCommandPalette={() => setCommandPaletteOpen(true)}
          onNavigate={onNavigate}
          user={user}
          alerts={alerts}
          onLogout={onLogout}
        />

        <main className="app-main-content">
          {children}
        </main>
      </div>

      {/* Global Spotlight / Command Palette */}
      <CommandPalette
        isOpen={commandPaletteOpen}
        onClose={() => setCommandPaletteOpen(false)}
        assets={assets}
        onSelectAsset={onSelectAsset}
        onNavigate={onNavigate}
      />

      {/* Floating Demo Reference Switcher for quick evaluation */}
      <div className={`quick-demo-switcher ${demoBarCollapsed ? 'collapsed' : ''}`}>
        <div className="demo-switcher-header">
          <div className="switcher-title">
            <Layers size={14} />
            <span>Módulos de Referência</span>
          </div>
          <button
            className="btn-toggle-demo"
            onClick={() => setDemoBarCollapsed(!demoBarCollapsed)}
            title={demoBarCollapsed ? 'Expandir seletor' : 'Recolher seletor'}
          >
            {demoBarCollapsed ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
          </button>
        </div>

        {!demoBarCollapsed && (
          <div className="demo-switcher-pills">
            {referenceScreens.map((s) => (
              <button
                key={s.id}
                className={`demo-pill ${currentPage === s.id ? 'active' : ''}`}
                onClick={() => onNavigate(s.id)}
              >
                <span>{s.label}</span>
                {currentPage === s.id && <Check size={11} />}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Toast Notification Container */}
      <Toast toast={toast} onDismiss={onDismissToast} />
    </div>
  );
}
