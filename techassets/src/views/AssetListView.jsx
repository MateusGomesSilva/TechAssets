import React, { useState, useMemo } from 'react';
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
  CheckCircle2,
  Laptop,
  Smartphone,
  Tablet,
  Monitor,
  Headphones,
  Tv,
  X
} from 'lucide-react';
import { StatusBadge } from '../components/common/StatusBadge';

export function AssetListView({
  assets = [],
  onSelectAsset,
  onNavigate,
  onDeleteAsset,
  initialCategory = null,
  onNotify
}) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(initialCategory || 'Todos');
  const [selectedStatus, setSelectedStatus] = useState('Todos');
  const [sortField, setSortField] = useState('id');
  const [sortDirection, setSortDirection] = useState('asc');
  const [currentPage, setCurrentPage] = useState(1);
  const [showFiltersDropdown, setShowFiltersDropdown] = useState(false);
  const itemsPerPage = 8;

  const categoryIcons = {
    'Notebook': Laptop,
    'Celular': Smartphone,
    'Tablet': Tablet,
    'Desktop': Monitor,
    'Monitor': Tv,
    'Acessório': Headphones
  };

  const categories = ['Todos', 'Notebook', 'Celular', 'Tablet', 'Desktop', 'Monitor', 'Acessório'];
  const statuses = ['Todos', 'Em uso', 'Disponível', 'Em manutenção', 'Descartado'];

  // Filter & Search
  const filteredAssets = useMemo(() => {
    return assets.filter((asset) => {
      const matchSearch =
        asset.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (asset.person && asset.person.toLowerCase().includes(searchTerm.toLowerCase())) ||
        (asset.location && asset.location.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchCategory =
        selectedCategory === 'Todos' ||
        asset.category.toLowerCase().includes(selectedCategory.toLowerCase()) ||
        (selectedCategory === 'Notebooks' && asset.category === 'Notebook') ||
        (selectedCategory === 'Celulares' && asset.category === 'Celular') ||
        (selectedCategory === 'Tablets' && asset.category === 'Tablet') ||
        (selectedCategory === 'Desktops' && asset.category === 'Desktop') ||
        (selectedCategory === 'Monitores' && asset.category === 'Monitor') ||
        (selectedCategory === 'Acessórios' && asset.category === 'Acessório');

      const matchStatus =
        selectedStatus === 'Todos' || asset.status === selectedStatus;

      return matchSearch && matchCategory && matchStatus;
    });
  }, [assets, searchTerm, selectedCategory, selectedStatus]);

  // Sorting
  const sortedAssets = useMemo(() => {
    return [...filteredAssets].sort((a, b) => {
      let aVal = a[sortField] || '';
      let bVal = b[sortField] || '';
      if (typeof aVal === 'string') {
        return sortDirection === 'asc'
          ? aVal.localeCompare(bVal)
          : bVal.localeCompare(aVal);
      }
      return sortDirection === 'asc' ? aVal - bVal : bVal - aVal;
    });
  }, [filteredAssets, sortField, sortDirection]);

  // Pagination
  const totalPages = Math.max(1, Math.ceil(sortedAssets.length / itemsPerPage));
  const paginatedAssets = sortedAssets.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleSort = (field) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleExportCSV = () => {
    const headers = ['Patrimônio', 'Nome', 'Categoria', 'Estado', 'Responsável', 'Localização', 'Garantia'];
    const rows = filteredAssets.map((a) => [
      a.id,
      `"${a.name}"`,
      a.category,
      a.status,
      `"${a.person || '-'}"`,
      `"${a.location || '-'}"`,
      a.warranty || '-'
    ]);
    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `techassets_inventario_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    if (onNotify) onNotify('Relatório CSV exportado com sucesso.');
  };

  return (
    <div className="view-container asset-list-view">
      {/* Top Filter and Action Bar (Matching 04-lista-de-ativos.png) */}
      <div className="asset-list-toolbar">
        <div className="toolbar-search-box">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Buscar ativo, patrimônio, responsável..."
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
              aria-label="Limpar busca"
            >
              <X size={14} />
            </button>
          )}
        </div>

        <div className="toolbar-actions">
          {/* Filters Dropdown */}
          <div className="filter-dropdown-wrapper">
            <button
              className={`btn-toolbar-filter ${showFiltersDropdown || selectedCategory !== 'Todos' || selectedStatus !== 'Todos' ? 'active' : ''}`}
              onClick={() => setShowFiltersDropdown(!showFiltersDropdown)}
            >
              <Filter size={16} />
              <span>Filtros</span>
              {(selectedCategory !== 'Todos' || selectedStatus !== 'Todos') && (
                <span className="filter-applied-dot" />
              )}
              <ChevronDown size={14} />
            </button>

            {showFiltersDropdown && (
              <div className="filter-popup-card">
                <div className="filter-group">
                  <label>Categoria:</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => {
                      setSelectedCategory(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>{c}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-group">
                  <label>Estado:</label>
                  <select
                    value={selectedStatus}
                    onChange={(e) => {
                      setSelectedStatus(e.target.value);
                      setCurrentPage(1);
                    }}
                  >
                    {statuses.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                </div>

                <div className="filter-actions-row">
                  <button
                    className="btn-filter-reset"
                    onClick={() => {
                      setSelectedCategory('Todos');
                      setSelectedStatus('Todos');
                      setSearchTerm('');
                      setShowFiltersDropdown(false);
                    }}
                  >
                    Limpar
                  </button>
                  <button
                    className="btn-filter-apply"
                    onClick={() => setShowFiltersDropdown(false)}
                  >
                    Aplicar
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* Export CSV button */}
          <button
            className="btn-toolbar-secondary"
            title="Exportar dados para planilha"
            onClick={handleExportCSV}
          >
            <Download size={16} />
            <span className="hide-on-mobile">Exportar</span>
          </button>

          {/* New Asset Button */}
          <button
            className="btn-toolbar-primary"
            onClick={() => onNavigate('new-asset')}
          >
            <Plus size={16} />
            <span>Novo ativo</span>
          </button>
        </div>
      </div>

      {/* Category Pills Strip for instant tactile filtering */}
      <div className="category-quick-pills">
        {categories.map((cat) => (
          <button
            key={cat}
            className={`category-pill ${selectedCategory === cat ? 'active' : ''}`}
            onClick={() => {
              setSelectedCategory(cat);
              setCurrentPage(1);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Asset Table Card (Matching 04-lista-de-ativos.png) */}
      <div className="asset-table-card">
        <div className="table-responsive-container">
          <table className="clean-data-table">
            <thead>
              <tr>
                <th onClick={() => handleSort('id')} className="sortable-th">
                  <div className="th-content">
                    <span>Patrimônio</span>
                    <ArrowUpDown size={13} className="sort-icon" />
                  </div>
                </th>
                <th onClick={() => handleSort('name')} className="sortable-th">
                  <div className="th-content">
                    <span>Nome</span>
                    <ArrowUpDown size={13} className="sort-icon" />
                  </div>
                </th>
                <th onClick={() => handleSort('category')} className="sortable-th">
                  <div className="th-content">
                    <span>Categoria</span>
                    <ArrowUpDown size={13} className="sort-icon" />
                  </div>
                </th>
                <th onClick={() => handleSort('status')} className="sortable-th">
                  <div className="th-content">
                    <span>Estado</span>
                    <ArrowUpDown size={13} className="sort-icon" />
                  </div>
                </th>
                <th onClick={() => handleSort('person')} className="sortable-th">
                  <div className="th-content">
                    <span>Responsável</span>
                    <ArrowUpDown size={13} className="sort-icon" />
                  </div>
                </th>
                <th>Localização</th>
                <th className="th-actions">Ações</th>
              </tr>
            </thead>
            <tbody>
              {paginatedAssets.length > 0 ? (
                paginatedAssets.map((asset) => {
                  const Icon = categoryIcons[asset.category] || Laptop;
                  return (
                    <tr
                      key={asset.id}
                      className="table-row-hover"
                      onClick={() => onSelectAsset(asset)}
                    >
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
                      <td className="td-category">{asset.category}</td>
                      <td className="td-status">
                        <StatusBadge value={asset.status} size="sm" />
                      </td>
                      <td className="td-person">
                        <span className={asset.person === '—' ? 'text-muted-dash' : 'text-person-active'}>
                          {asset.person || '—'}
                        </span>
                      </td>
                      <td className="td-location">{asset.location || 'Estoque'}</td>
                      <td className="td-actions" onClick={(e) => e.stopPropagation()}>
                        <div className="action-buttons-group">
                          <button
                            className="btn-action-icon"
                            title="Editar ativo"
                            onClick={() => onSelectAsset(asset)}
                          >
                            <Edit size={16} />
                          </button>
                          <button
                            className="btn-action-icon"
                            title="Visualizar detalhes"
                            onClick={() => onSelectAsset(asset)}
                          >
                            <ExternalLink size={16} />
                          </button>
                          {onDeleteAsset && (
                            <button
                              className="btn-action-icon btn-action-danger"
                              title="Excluir ativo"
                              onClick={() => {
                                if (window.confirm(`Deseja realmente remover o ativo ${asset.name} (${asset.id})?`)) {
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
                    <p>Nenhum ativo encontrado para os filtros selecionados.</p>
                    <button
                      className="btn-reset-filters"
                      onClick={() => {
                        setSelectedCategory('Todos');
                        setSelectedStatus('Todos');
                        setSearchTerm('');
                      }}
                    >
                      Limpar filtros de busca
                    </button>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination Bar (Matching 04-lista-de-ativos.png) */}
        <div className="table-pagination-footer">
          <div className="pagination-info">
            <span>
              Mostrando <b>{Math.min(filteredAssets.length, (currentPage - 1) * itemsPerPage + 1)}</b> a{' '}
              <b>{Math.min(filteredAssets.length, currentPage * itemsPerPage)}</b> de{' '}
              <b>{filteredAssets.length}</b> ativos
            </span>
          </div>

          <div className="pagination-controls">
            <button
              className={`page-number-btn ${currentPage === 1 ? 'active' : ''}`}
              onClick={() => setCurrentPage(1)}
            >
              1
            </button>
            {totalPages >= 2 && (
              <button
                className={`page-number-btn ${currentPage === 2 ? 'active' : ''}`}
                onClick={() => setCurrentPage(2)}
              >
                2
              </button>
            )}
            {totalPages >= 3 && (
              <button
                className={`page-number-btn ${currentPage === 3 ? 'active' : ''}`}
                onClick={() => setCurrentPage(3)}
              >
                3
              </button>
            )}
            {totalPages >= 4 && (
              <button
                className={`page-number-btn ${currentPage === 4 ? 'active' : ''}`}
                onClick={() => setCurrentPage(4)}
              >
                4
              </button>
            )}
            {totalPages >= 5 && (
              <button
                className={`page-number-btn ${currentPage === 5 ? 'active' : ''}`}
                onClick={() => setCurrentPage(5)}
              >
                5
              </button>
            )}
            <span className="pagination-ellipsis">...</span>
            <button
              className={`page-number-btn ${currentPage === 16 ? 'active' : ''}`}
              onClick={() => setCurrentPage(Math.min(16, totalPages))}
            >
              16
            </button>
            <button
              className="page-number-btn page-next-btn"
              disabled={currentPage >= totalPages}
              onClick={() => setCurrentPage((prev) => Math.min(totalPages, prev + 1))}
              aria-label="Próxima página"
            >
              &gt;
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

