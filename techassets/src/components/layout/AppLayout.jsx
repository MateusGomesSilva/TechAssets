import React, { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { Topbar } from './Topbar';
import { Toast } from '../common/Toast';
import { CommandPalette } from '../ui/CommandPalette';

export function AppLayout({
  currentPage,
  currentCategory,
  onNavigate,
  user,
  alerts,
  assets,
  maintenanceCount,
  onSelectAsset,
  searchTerm,
  onSearchChange,
  toast,
  onDismissToast,
  onLogout,
  children
}) {
  const [mobileOpen, setMobileOpen] = useState(false);
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

  return (
    <div className="app-shell">
      <Sidebar
        currentPage={currentPage}
        currentCategory={currentCategory}
        onNavigate={onNavigate}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        user={user}
        maintenanceCount={maintenanceCount}
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

      {/* Toast Notification Container */}
      <Toast toast={toast} onDismiss={onDismissToast} />
    </div>
  );
}
