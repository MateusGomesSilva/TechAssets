import React, { useState, useEffect, useRef } from 'react';
import {
  Search,
  Package,
  Wrench,
  User,
  Plus,
  LayoutDashboard,
  ArrowRight,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Headphones,
  Tv,
  X
} from 'lucide-react';
import { useI18n, statusLabel } from '../../i18n';
import { hasNoOwner } from '../../utils/alerts';

export function CommandPalette({
  isOpen,
  onClose,
  assets = [],
  onSelectAsset,
  onNavigate
}) {
  const { t } = useI18n();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const inputRef = useRef(null);

  useEffect(() => {
    if (isOpen) {
      setQuery('');
      setSelectedIndex(0);
      setTimeout(() => inputRef.current?.focus(), 50);
    }
  }, [isOpen]);

  const navActions = [
    { type: 'page', id: 'dashboard', label: t('palette.goDashboard'), icon: LayoutDashboard },
    { type: 'page', id: 'assets', label: t('palette.viewInventory'), icon: Package },
    { type: 'page', id: 'new-asset', label: t('palette.newAsset'), icon: Plus },
    { type: 'page', id: 'maintenances', label: t('palette.maintenanceOrders'), icon: Wrench },
    { type: 'page', id: 'profile', label: t('palette.profilePrefs'), icon: User }
  ];

  const filteredAssets = assets.filter((a) => {
    if (!query.trim()) return false;
    const q = query.toLowerCase();
    return (
      a.name.toLowerCase().includes(q) ||
      a.id.toLowerCase().includes(q) ||
      a.model.toLowerCase().includes(q) ||
      (a.person && a.person.toLowerCase().includes(q)) ||
      (a.location && a.location.toLowerCase().includes(q))
    );
  }).slice(0, 5);

  const filteredActions = navActions.filter((act) => {
    if (!query.trim()) return true;
    return act.label.toLowerCase().includes(query.toLowerCase());
  });

  const totalResults = [...filteredAssets.map(a => ({ type: 'asset', data: a })), ...filteredActions.map(act => ({ type: 'action', data: act }))];

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (!isOpen) return;

      if (e.key === 'ArrowDown') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev + 1) % Math.max(1, totalResults.length));
      } else if (e.key === 'ArrowUp') {
        e.preventDefault();
        setSelectedIndex((prev) => (prev - 1 + totalResults.length) % Math.max(1, totalResults.length));
      } else if (e.key === 'Enter') {
        e.preventDefault();
        const selected = totalResults[selectedIndex];
        if (selected) {
          if (selected.type === 'asset') {
            onSelectAsset(selected.data);
          } else {
            onNavigate(selected.data.id);
          }
          onClose();
        }
      } else if (e.key === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, selectedIndex, totalResults, onSelectAsset, onNavigate, onClose]);

  if (!isOpen) return null;

  return (
    <div className="command-palette-backdrop" onClick={onClose}>
      <div className="command-palette-box" onClick={(e) => e.stopPropagation()}>
        <div className="command-search-header">
          <Search size={18} className="command-search-icon" />
          <input
            ref={inputRef}
            type="text"
            className="command-search-input"
            placeholder={t('palette.placeholder')}
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setSelectedIndex(0);
            }}
          />
          <kbd className="command-esc-badge" onClick={onClose}>ESC</kbd>
        </div>

        <div className="command-results-scroll">
          {/* Asset Results */}
          {filteredAssets.length > 0 && (
            <div className="command-section">
              <span className="command-section-label">{t('palette.assetsFound')}</span>
              {filteredAssets.map((asset, idx) => {
                const isSelected = selectedIndex === idx;
                return (
                  <div
                    key={asset.id}
                    className={`command-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      onSelectAsset(asset);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(idx)}
                  >
                    <div className="command-item-icon">
                      <Laptop size={16} />
                    </div>
                    <div className="command-item-text">
                      <strong>{asset.name}</strong>
                      <small>{asset.id} • {hasNoOwner(asset) ? t('common.noOwner') : asset.person} • {asset.location}</small>
                    </div>
                    <span className="command-item-tag">{statusLabel(t, asset.status)}</span>
                  </div>
                );
              })}
            </div>
          )}

          {/* Quick Actions / Navigation */}
          {filteredActions.length > 0 && (
            <div className="command-section">
              <span className="command-section-label">
                {query ? t('palette.actionsNav') : t('palette.shortcuts')}
              </span>
              {filteredActions.map((act, idx) => {
                const realIndex = filteredAssets.length + idx;
                const isSelected = selectedIndex === realIndex;
                const Icon = act.icon;
                return (
                  <div
                    key={act.id}
                    className={`command-item ${isSelected ? 'selected' : ''}`}
                    onClick={() => {
                      onNavigate(act.id);
                      onClose();
                    }}
                    onMouseEnter={() => setSelectedIndex(realIndex)}
                  >
                    <div className="command-item-icon">
                      <Icon size={16} />
                    </div>
                    <div className="command-item-text">
                      <span>{act.label}</span>
                    </div>
                    <ArrowRight size={14} className="command-arrow-icon" />
                  </div>
                );
              })}
            </div>
          )}

          {query && totalResults.length === 0 && (
            <div className="command-empty-state">
              <p>{t('palette.noResults')} "<b>{query}</b>".</p>
            </div>
          )}
        </div>

        <div className="command-palette-footer">
          <span>{t('palette.navigate')}: <kbd>↑</kbd> <kbd>↓</kbd></span>
          <span>{t('palette.select')}: <kbd>Enter</kbd></span>
          <span>{t('palette.close')}: <kbd>Esc</kbd></span>
        </div>
      </div>
    </div>
  );
}

