export const CATEGORIES_LIST = [
  'Notebooks',
  'Celulares',
  'Tablets',
  'Desktops',
  'Monitores',
  'Acessórios'
];

export const CATEGORY_SINGULAR_MAP = {
  'Notebooks': 'Notebook',
  'Celulares': 'Celular',
  'Tablets': 'Tablet',
  'Desktops': 'Desktop',
  'Monitores': 'Monitor',
  'Acessórios': 'Acessório',
  'Notebook': 'Notebook',
  'Celular': 'Celular',
  'Tablet': 'Tablet',
  'Desktop': 'Desktop',
  'Monitor': 'Monitor',
  'Acessório': 'Acessório'
};

export const CATEGORIES_SUMMARY = [
  { name: 'Notebooks', count: 128, icon: 'Laptop', key: 'Notebook' },
  { name: 'Celulares', count: 196, icon: 'Smartphone', key: 'Celular' },
  { name: 'Tablets', count: 94, icon: 'Tablet', key: 'Tablet' },
  { name: 'Desktops', count: 72, icon: 'Monitor', key: 'Desktop' },
  { name: 'Monitores', count: 34, icon: 'Tv', key: 'Monitor' },
  { name: 'Acessórios', count: 64, icon: 'Headphones', key: 'Acessório' }
];

export const INITIAL_ASSETS = [
  {
    id: 'NB-0001',
    name: 'MacBook Pro 14”',
    category: 'Notebook',
    model: 'MacBook Pro 14” (M2 Pro)',
    serial: 'C02X1234XQ1',
    status: 'Em uso',
    person: 'João da Silva',
    department: 'Tecnologia da Informação',
    location: 'Desenvolvimento',
    date: '12/03/2024',
    warranty: '12/03/2026',
    supplier: 'Apple Brasil',
    cost: 'R$ 14.890,00',
    notes: 'Notebook corporativo de alta performance. Entregue com carregador MagSafe 67W original e case protetor.',
    specs: {
      processor: 'Apple M2 Pro',
      ram: '16 GB',
      storage: '512 GB',
      os: 'macOS Sonoma'
    }
  },
  {
    id: 'NB-0002',
    name: 'Dell Latitude 5440',
    category: 'Notebook',
    model: 'Dell Latitude 5440 Core i7',
    serial: 'DL5440BR002',
    status: 'Disponível',
    person: '—',
    department: 'TI - Estoque',
    location: 'Estoque',
    date: '18/04/2024',
    warranty: '18/04/2027',
    supplier: 'Dell Technologies',
    cost: 'R$ 6.450,00',
    notes: 'Pronto para alocação para novos colaboradores de engenharia ou vendas.',
    specs: {
      processor: 'Intel Core i7-1365U',
      ram: '16 GB DDR5',
      storage: '512 GB SSD',
      os: 'Windows 11 Pro'
    }
  },
  {
    id: 'NB-0003',
    name: 'Lenovo ThinkPad E14',
    category: 'Notebook',
    model: 'ThinkPad E14 Gen 4',
    serial: 'LNV-E14-003',
    status: 'Em manutenção',
    person: 'TI',
    department: 'Suporte Técnico',
    location: 'Assistência',
    date: '22/01/2023',
    warranty: '22/01/2025',
    supplier: 'Lenovo Brasil',
    cost: 'R$ 5.120,00',
    notes: 'Enviado para reparo preventivo do sistema de arrefecimento e troca de cooler.',
    specs: {
      processor: 'AMD Ryzen 7 5700U',
      ram: '16 GB DDR4',
      storage: '512 GB SSD',
      os: 'Windows 11 Pro'
    }
  },
  {
    id: 'CEL-0001',
    name: 'iPhone 15 Pro',
    category: 'Celular',
    model: 'Apple iPhone 15 Pro 128GB',
    serial: 'F2LQ0ABC1',
    status: 'Em uso',
    person: 'Maria Oliveira',
    department: 'Design de Produto',
    location: 'Design',
    date: '05/02/2024',
    warranty: '05/02/2026',
    supplier: 'Apple Brasil',
    cost: 'R$ 7.999,00',
    notes: 'Aparelho celular corporativo com eSIM empresarial ativo.',
    specs: {
      processor: 'Apple A17 Pro Bionic',
      ram: '8 GB',
      storage: '128 GB',
      os: 'iOS 17'
    }
  },
  {
    id: 'TAB-0001',
    name: 'iPad Air 5',
    category: 'Tablet',
    model: 'Apple iPad Air 5 256GB',
    serial: 'DMPQ9TAB01',
    status: 'Em uso',
    person: 'Carlos Santos',
    department: 'Marketing',
    location: 'Marketing',
    date: '14/06/2024',
    warranty: '14/06/2026',
    supplier: 'Apple Brasil',
    cost: 'R$ 5.800,00',
    notes: 'Utilizado para apresentações comerciais e validações gráficas.',
    specs: {
      processor: 'Apple M1 Silicon',
      ram: '8 GB',
      storage: '256 GB',
      os: 'iPadOS 17'
    }
  },
  {
    id: 'DESK-0001',
    name: 'Desktop Dell OptiPlex',
    category: 'Desktop',
    model: 'Dell OptiPlex 7010 Micro',
    serial: 'DELL-7010-01',
    status: 'Disponível',
    person: '—',
    department: 'TI - Estoque',
    location: 'Estoque',
    date: '02/08/2023',
    warranty: '02/08/2026',
    supplier: 'Dell Technologies',
    cost: 'R$ 4.300,00',
    notes: 'Gabinete micro formato, suporte vesa e cabos inclusos.',
    specs: {
      processor: 'Intel Core i5-13500T',
      ram: '16 GB DDR4',
      storage: '512 GB SSD NVMe',
      os: 'Windows 11 Pro'
    }
  },
  {
    id: 'MON-0001',
    name: 'Monitor LG 27”',
    category: 'Monitor',
    model: 'LG UltraGear 27GN65R',
    serial: 'LG27-0091',
    status: 'Em uso',
    person: 'Ana Lima',
    department: 'Financeiro',
    location: 'Financeiro',
    date: '10/10/2023',
    warranty: '10/10/2025',
    supplier: 'LG Eletrônicos',
    cost: 'R$ 1.250,00',
    notes: 'Ajuste de altura e rotação 90 graus.',
    specs: {
      processor: 'Painel IPS 144Hz 1ms',
      ram: 'N/A',
      storage: 'Full HD 1920x1080',
      os: 'HDMI / DisplayPort'
    }
  },
  {
    id: 'ACC-0001',
    name: 'Mouse Logitech MX Master 3',
    category: 'Acessório',
    model: 'Logitech MX Master 3S',
    serial: 'LOG-MX3-008',
    status: 'Em uso',
    person: 'João da Silva',
    department: 'Tecnologia da Informação',
    location: 'Desenvolvimento',
    date: '11/01/2024',
    warranty: '11/01/2026',
    supplier: 'Logitech Store',
    cost: 'R$ 680,00',
    notes: 'Mouse ergonômico sem fio com sensor de 8000 DPI para alta precisão.',
    specs: {
      processor: 'Sensor Darkfield 8000 DPI',
      ram: 'N/A',
      storage: 'Bateria recarregável USB-C',
      os: 'Multi-OS Bluetooth'
    }
  },
  {
    id: 'NB-0004',
    name: 'Dell XPS 15 9530',
    category: 'Notebook',
    model: 'Dell XPS 15 OLED Touch',
    serial: 'XPS15-9530-BR',
    status: 'Em uso',
    person: 'Lucas Mendes',
    department: 'Engenharia de Software',
    location: 'Engenharia',
    date: '04/05/2024',
    warranty: '04/05/2027',
    supplier: 'Dell Technologies',
    cost: 'R$ 16.500,00',
    notes: 'Equipamento destinado ao desenvolvimento e compilação pesada.',
    specs: {
      processor: 'Intel Core i9-13900H',
      ram: '32 GB DDR5',
      storage: '1 TB NVMe SSD',
      os: 'Windows 11 Pro'
    }
  },
  {
    id: 'CEL-0002',
    name: 'Samsung Galaxy S24 Ultra',
    category: 'Celular',
    model: 'Galaxy S24 Ultra 512GB Titanium',
    serial: 'SM-S928B-001',
    status: 'Disponível',
    person: '—',
    department: 'TI - Estoque',
    location: 'Estoque',
    date: '15/03/2024',
    warranty: '15/03/2026',
    supplier: 'Samsung Brasil',
    cost: 'R$ 8.400,00',
    notes: 'Disponível para diretoria ou viagens internacionais.',
    specs: {
      processor: 'Snapdragon 8 Gen 3',
      ram: '12 GB',
      storage: '512 GB',
      os: 'Android 14 / One UI 6.1'
    }
  },
  {
    id: 'MON-0002',
    name: 'Dell UltraSharp 32” 4K',
    category: 'Monitor',
    model: 'Dell U3223QE 4K USB-C Hub',
    serial: 'DEL-U32-998',
    status: 'Em uso',
    person: 'Maria Oliveira',
    department: 'Design de Produto',
    location: 'Design',
    date: '20/02/2024',
    warranty: '20/02/2027',
    supplier: 'Dell Technologies',
    cost: 'R$ 4.890,00',
    notes: 'Monitor profissional IPS Black com calibração de cor sRGB 100%.',
    specs: {
      processor: 'Painel IPS Black 4K',
      ram: 'Hub USB-C 90W PD',
      storage: '3840 x 2160 pixels',
      os: 'Compatível Mac e PC'
    }
  },
  {
    id: 'ACC-0002',
    name: 'Teclado Logitech MX Keys S',
    category: 'Acessório',
    model: 'Logitech MX Keys S Wireless',
    serial: 'LOG-KEYS-104',
    status: 'Em uso',
    person: 'João da Silva',
    department: 'Tecnologia da Informação',
    location: 'Desenvolvimento',
    date: '11/01/2024',
    warranty: '11/01/2026',
    supplier: 'Logitech Store',
    cost: 'R$ 720,00',
    notes: 'Teclado avançado com retroiluminação inteligente.',
    specs: {
      processor: 'Switches Perfect Stroke',
      ram: 'N/A',
      storage: 'Recarga USB-C',
      os: 'Multi-OS'
    }
  }
];

export const INITIAL_MAINTENANCES = [
  {
    id: 'MNT-001',
    assetId: 'NB-0001',
    assetName: 'MacBook Pro 14”',
    date: '09/03/2025',
    type: 'Preventiva',
    description: 'Limpeza interna e troca de pasta térmica',
    provider: 'TechFix',
    cost: 'R$ 180,00',
    status: 'Concluída'
  },
  {
    id: 'MNT-002',
    assetId: 'NB-0001',
    assetName: 'MacBook Pro 14”',
    date: '15/08/2024',
    type: 'Corretiva',
    description: 'Substituição do teclado',
    provider: 'Apple Care',
    cost: 'R$ 0,00',
    status: 'Concluída'
  },
  {
    id: 'MNT-003',
    assetId: 'NB-0001',
    assetName: 'MacBook Pro 14”',
    date: '22/01/2024',
    type: 'Corretiva',
    description: 'Troca do trackpad',
    provider: 'Apple Care',
    cost: 'R$ 0,00',
    status: 'Concluída'
  },
  {
    id: 'MNT-004',
    assetId: 'NB-0003',
    assetName: 'Lenovo ThinkPad E14',
    date: '10/02/2025',
    type: 'Corretiva',
    description: 'Substituição da ventoinha e cooler de refrigeração',
    provider: 'Lenovo Service',
    cost: 'R$ 320,00',
    status: 'Em andamento'
  },
  {
    id: 'MNT-005',
    assetId: 'CEL-0001',
    assetName: 'iPhone 15 Pro',
    date: '05/11/2024',
    type: 'Preventiva',
    description: 'Diagnóstico de bateria e calibração de sensores',
    provider: 'iPlace Corporativo',
    cost: 'R$ 90,00',
    status: 'Concluída'
  }
];

export const INITIAL_MOVEMENTS = [
  {
    id: 'MOV-01',
    assetName: 'MacBook Pro 14”',
    assetId: 'NB-0001',
    route: 'João da Silva → Desenvolvimento',
    type: 'Transferência',
    time: 'Hoje, 10:30',
    tagTone: 'tagblue'
  },
  {
    id: 'MOV-02',
    assetName: 'iPhone 15 Pro',
    assetId: 'CEL-0001',
    route: 'Ana Lima → Carlos Souza',
    type: 'Transferência',
    time: 'Hoje, 09:15',
    tagTone: 'tagblue'
  },
  {
    id: 'MOV-03',
    assetName: 'Dell Monitor 24”',
    assetId: 'MON-0003',
    route: 'TI → Sala de reunião 1',
    type: 'Entrega',
    time: 'Ontem, 16:45',
    tagTone: 'taggreen'
  },
  {
    id: 'MOV-04',
    assetName: 'Teclado Logitech MX',
    assetId: 'ACC-0002',
    route: 'Estoque → João da Silva',
    type: 'Entrega',
    time: 'Ontem, 14:20',
    tagTone: 'taggreen'
  },
  {
    id: 'MOV-05',
    assetName: 'Lenovo ThinkPad E14',
    assetId: 'NB-0003',
    route: 'Suporte TI → Assistência Técnica',
    type: 'Manutenção',
    time: '22/01/2024, 11:00',
    tagTone: 'tagorange'
  }
];

export const INITIAL_ALERTS = [
  {
    id: 'ALT-01',
    text: '12 ativos com manutenção atrasada',
    subtext: 'Verifique o prazo de atendimento',
    tone: 'danger',
    count: 12
  },
  {
    id: 'ALT-02',
    text: '7 ativos sem responsável definido',
    subtext: 'Revise as alocações pendentes',
    tone: 'warning',
    count: 7
  },
  {
    id: 'ALT-03',
    text: '4 ativos próximo do fim da garantia',
    subtext: 'Vencimentos nos próximos 30 dias',
    tone: 'info',
    count: 4
  }
];

export const INITIAL_USER = {
  name: 'João da Silva',
  email: 'joao.silva@empresa.com',
  role: 'Analista de TI',
  department: 'Tecnologia da Informação',
  phone: '(35) 99999-9999',
  profileType: 'Administrador',
  memberSince: '12/03/2024',
  lastAccess: '20/05/2025 às 14:30',
  avatarText: 'JS'
};

export const INITIAL_PEOPLE = [
  { id: '1', name: 'João da Silva', role: 'Administrador', department: 'Desenvolvimento', initials: 'JS', assetCount: 4, email: 'joao.silva@empresa.com' },
  { id: '2', name: 'Maria Oliveira', role: 'Product Designer', department: 'Design', initials: 'MO', assetCount: 2, email: 'maria.oliveira@empresa.com' },
  { id: '3', name: 'Carlos Santos', role: 'Growth Specialist', department: 'Marketing', initials: 'CS', assetCount: 1, email: 'carlos.santos@empresa.com' },
  { id: '4', name: 'Ana Lima', role: 'Controller Financeiro', department: 'Financeiro', initials: 'AL', assetCount: 1, email: 'ana.lima@empresa.com' },
  { id: '5', name: 'Lucas Mendes', role: 'Tech Lead', department: 'Engenharia', initials: 'LM', assetCount: 1, email: 'lucas.mendes@empresa.com' }
];

