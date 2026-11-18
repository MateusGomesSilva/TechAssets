import React, { useState, useMemo, useEffect } from 'react';
import {
  Search,
  Filter,
  Plus,
  Edit,
  ExternalLink,
  ChevronDown,
  ArrowUpDown,
  Download,
  Trash2,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Headphones,
  Tv,
  X
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';
import { useI18n, categoryLabel, statusLabel, formatDate, formatNumber } from '../i18n';

const CATEGORY_ICONS = {
  Notebook: Laptop,
  Notebooks: Laptop,
  Celular: Smartphone,
  Celulares: Smartphone,
  Tablet: Tablet,
  Tablets: Tablet,
  Desktop: Monitor,
  Desktops: Monitor,
  Monitor: Tv,
  Monitores: Tv,
  Acessório: Headphones,
  Acessórios: Headphones
};

// Canonical (stored) values; labels are translated when rendered
const CATEGORIES = ['Todos', 'Notebooks', 'Celulares', 'Tablets', 'Desktops', 'Monitores', 'Acessórios'];
const STATUSES = ['Todos', 'Em uso', 'Disponível', 'Em manutenção', 'Descartado'];

const isMatchCategory = (selected, itemCategory) => {
  if (!selected || selected === 'Todos') return true;
  if (!itemCategory) return false;
  const s = selected.toLowerCase().trim();
  const c = itemCategory.toLowerCase().trim();
  if (s === c) return true;
  if (s.startsWith(c) || c.startsWith(s)) return true;
  if ((s === 'acessórios' || s === 'acessorios') && (c === 'acessório' || c === 'acessorio')) return true;
  if ((c === 'acessórios' || c === 'acessorios') && (s === 'acessório' || s === 'acessorio')) return true;
  if ((s === 'monitores' && c === 'monitor') || (s === 'monitor' && c === 'monitores')) return true;
  if ((s === 'celulares' && c === 'celular') || (s === 'celular' && c === 'celulares')) return true;
  return false;
};

export function AssetListView({
  assets = [],
  onSelectAsset,
  onNavigate,
  onDeleteAsset,
  initialCategory = null,
  onCategoryChange,
  onNotify
}) {
  const { t, language } = useI18n();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
  const itemsPerPage = 8;

  // Keep selectedCategory in sync when initialCategory changes from outside (e.g. sidebar navigation)
  useEffect(() => {
    if (initialCategory) {
      setSelectedCategory(initialCategory);
      setCurrentPage(1);
    } else if (initialCategory === null) {
      setSelectedCategory('Todos');
      setCurrentPage(1);
    }
  }, [initialCategory]);

  const handleCategorySelect = (cat) => {
    setSelectedCategory(cat);
    setCurrentPage(1);
    if (onCategoryChange) {
      onCategoryChange(cat === 'Todos' ? null : cat);
    }
  };

  // Filter & Search
  const filteredAssets = useMemo(() => {
    const q = searchTerm.toLowerCase();
    return assets.filter((asset) => {
      const matchSearch =
        asset.id.toLowerCase().includes(q) ||
        asset.name.toLowerCase().includes(q) ||
        asset.model.toLowerCase().includes(q) ||
        (asset.person && asset.person.toLowerCase().includes(q)) ||
        (asset.location && asset.location.toLowerCase().includes(q));

      const matchCategory = isMatchCategory(selectedCategory, asset.category);
      const matchStatus = selectedStatus === 'Todos' || asset.status === selectedStatus;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [assets, searchTerm, selectedCategory, selectedStatus]);

  // Sorting
  const sortedAssets = useMemo(() => {
    return [...filteredAssets].sort((a, b) => {
      const aVal = a[sortField] || '';
      const bVal = b[sortField] || '';
      if (typeof aVal === 'string') {
        return sortDirection === 'asc' ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [filteredAssets, sortField, sortDirection]);

  // Pagination (stays valid when assets are removed / filtered)
  const totalPages = Math.max(1, Math.ceil(sortedAssets.length / itemsPerPage));
  const safePage = Math.min(currentPage, totalPages);
  const paginatedAssets = sortedAssets.slice((safePage - 1) * itemsPerPage, safePage * itemsPerPage);

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExportCSV = () => {
    const quote = (v) => `"${String(v ?? '').replace(/"/g, '""')}"`;
    const headers = [
      t('assets.colId'),
      t('assets.colName'),
      t('assets.colCategory'),
      t('assets.colStatus'),
      t('assets.colPerson'),
      t('assets.colLocation'),
      t('detail.warrantyUntil')
    ];
    const rows = filteredAssets.map((a) => [
      a.id,
      a.name,
      categoryLabel(t, a.category),
      statusLabel(t, a.status),
      a.person || '-',
      a.location || '-',
      a.warranty ? formatDate(a.warranty, language) : '-'
    ]);
    const csv = [headers, ...rows].map((r) => r.map(quote).join(',')).join('\n');
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `techassets_inventory_${new Date().toISOString().slice(0, 10)}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
    if (onNotify) onNotify(t('assets.exportSuccess'));
  };

  const filtersActive = selectedCategory !== 'Todos' || selectedStatus !== 'Todos';

  return (
    <div className="view-container asset-list-view">
      {/* Top Filter and Action Bar */}
      <div className="asset-list-toolbar">
        <div className="toolbar-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder={t('assets.searchPlaceholder')}
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              setCurrentPage(1);
            }}
          />
          {searchTerm && (
            <button
              className="clear-search-btn"
              onClick={() => setSearchTerm('')}
              aria-label={t('assets.clearSearch')}
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="toolbar-actions">
          {/* Filters Dropdown */}
          <div className="filter-dropdown-wrapper">
            <button
              className={`btn-toolbar-filter ${showFiltersDropdown || filtersActive ? 'active' : ''}`}
              onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
            >
              <Filter size={16} />
              <span>{t('assets.filters')}</span>
              {filtersActive && <span className="filter-applied-dot" />}
              <ChevronDown size={14} />
            </button>

            {showFiltersDropdown && (
              <div className="filter-popup-card">
                <div className="filter-group">
                  <label>{t('assets.categoryLabel')}</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => handleCategorySelect(e.target.value)}
                  >
                    {CATEGORIES.map((c) => (
                      <option key={c} value={c}>
                        {categoryLabel(t, c)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>{t('assets.statusLabel')}</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    {STATUSES.map((s) => (
                      <option key={s} value={s}>
                        {statusLabel(t, s)}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="filter-actions-row">
                  <button
                    className="btn-filter-reset"
                    onClick={() => {
                      handleCategorySelect('Todos');
                      setSelectedStatus('Todos');
                      setSearchTerm('');
                      setShowFiltersDropdown(false);
                    }}
                  >
                    {t('common.clear')}
                  </button>
                  <button className="btn-filter-apply" onClick={() => setShowFiltersDropdown(false)}>
                    {t('common.apply')}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Export CSV button */}
          <button
            className="btn-toolbar-secondary"
            title={t('assets.exportTitle')}
            onClick={handleExportCSV}
          >
            <Download size={16} />
            <span className="hide-on-mobile">{t('assets.export')}</span>
          </button>

          {/* New Asset Button */}
          <button className="btn-toolbar-primary" onClick={() => onNavigate('new-asset')}>
            <Plus size={16} />
            <span>{t('assets.newAsset')}</span>
          </button>
        </div>
      </div>

      {/* Category Pills Strip for instant filtering */}
      <div className="category-quick-pills">
        {CATEGORIES.map((cat) => {
          const isAllSelected = !selectedCategory || selectedCategory === 'Todos';
          const isActive =
            cat === 'Todos'
              ? isAllSelected
              : !isAllSelected && isMatchCategory(selectedCategory, cat);
          return (
            <button
              key={cat}
              className={`category-pill ${isActive ? 'active' : ''}`}
              onClick={() => handleCategorySelect(cat)}
            >
              {categoryLabel(t, cat)}
            </button>
          );
        })}
      </div>

      {/* Main Asset Table Card */}
      <div className="asset-table-card">
        <div className="table-responsive-container">
          <table className="clean-data-table">
            <thead>
              <tr>
                {[
                  ['id', 'assets.colId'],
                  ['name', 'assets.colName'],
                  ['category', 'assets.colCategory'],
                  ['status', 'assets.colStatus'],
                  ['person', 'assets.colPerson']
                ].map(([field, labelKey]) => (
                  <th key={field} onClick={() => handleSort(field)} className="sortable-th">
                    <div className="th-content">
                      <span>{t(labelKey)}</span>
                      <ArrowUpDown size={13} className="sort-icon" />
                    </div>
                  </th>
                ))}
                <th>{t('assets.colLocation')}</th>
                <th className="th-actions">{t('assets.colActions')}</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAssets.length > 0 ? (
                paginatedAssets.map((asset) => {
                  const Icon = CATEGORY_ICONS[asset.category] || Laptop;
                  return (
                    <tr key={asset.id} className="table-row-hover" onClick={() => onSelectAsset(asset)}>
                      <td className="td-patrimonio">
                        <span className="asset-id-code">{asset.id}</span>
                      </td>
                      <td className="td-name">
                        <div className="asset-name-wrapper">
                          <span className="asset-item-icon">
                            <Icon size={16} />
                          </span>
                          <span className="asset-item-name">{asset.name}</span>
                        </div>
                      </td>
                      <td className="td-category">{categoryLabel(t, asset.category)}</td>
                      <td className="td-status">
                        <StatusBadge value={asset.status} size="sm" />
                      </td>
                      <td className="td-person">
                        <span className={asset.person === '—' ? 'text-muted-dash' : 'text-person-active'}>
                          {asset.person || '—'}
                        </span>
                      </td>
                      <td className="td-location">{asset.location || '—'}</td>
                      <td className="td-actions" onClick={(e) => e.stopPropagation()}>
                        <div className="action-buttons-group">
                          <button
                            className="btn-action-icon"
                            title={t('assets.edit')}
                            aria-label={t('assets.edit')}
                            onClick={() => onSelectAsset(asset)}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="btn-action-icon"
                            title={t('assets.details')}
                            aria-label={t('assets.details')}
                            onClick={() => onSelectAsset(asset)}
                          >
                            <ExternalLink size={16} />
                          </button>
                          {onDeleteAsset && (
                            <button
                              className="btn-action-icon btn-action-danger"
                              title={t('assets.delete')}
                              aria-label={t('assets.delete')}
                              onClick={() => {
                                if (
                                  window.confirm(
                                    t('assets.deleteConfirm', { name: asset.name, id: asset.id })
                                  )
                                ) {
                                  onDeleteAsset(asset.id);
                                }
                              }}
                            >
                              <Trash2 size={16} />
                            </button>
                          )}
                        </div>
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td colSpan={7} className="td-empty-state">
                    <p>{t('assets.empty')}</p>
                    <button
                      className="btn-reset-filters"
                      onClick={() => {
                        handleCategorySelect('Todos');
                        setSelectedStatus('Todos');
                        setSearchTerm('');
                      }}
                    >
                      {t('assets.resetFilters')}
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Dynamic Pagination Bar */}
        <div className="table-pagination-footer">
          <div className="pagination-info">
            <span>
              {t('assets.showing', {
                start: filteredAssets.length === 0 ? 0 : (safePage - 1) * itemsPerPage + 1,
                end: Math.min(filteredAssets.length, safePage * itemsPerPage),
                total: formatNumber(filteredAssets.length, language),
                count: filteredAssets.length
              })}
            </span>
          </div>

          <div className="pagination-controls">
            <button
              className="page-number-btn page-prev-btn"
              disabled={safePage <= 1}
              onClick={() => setCurrentPage(Math.max(1, safePage - 1))}
              aria-label={t('assets.prevPage')}
            >
              &lt;
            </button>
            {(() => {
              if (totalPages <= 7) {
                return Array.from({ length: totalPages }, (_, i) => i + 1);
              }
              const pages = [1];
              if (safePage > 3) pages.push('...');
              const start = Math.max(2, safePage - 1);
              const end = Math.min(totalPages - 1, safePage + 1);
              for (let i = start; i <= end; i++) pages.push(i);
              if (safePage < totalPages - 2) pages.push('...');
              pages.push(totalPages);
              return pages;
            })().map((p, idx) =>
              p === '...' ? (
                <span key={`ellipsis-${idx}`} className="pagination-ellipsis">
                  ...
                </span>
              ) : (
                <button
                  key={p}
                  className={`page-number-btn ${safePage === p ? 'active' : ''}`}
                  onClick={() => setCurrentPage(p)}
                >
                  {p}
                </button>
              )
            )}
            <button
              className="page-number-btn page-next-btn"
              disabled={safePage >= totalPages}
              onClick={() => setCurrentPage(Math.min(totalPages, safePage + 1))}
              aria-label={t('assets.nextPage')}
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
