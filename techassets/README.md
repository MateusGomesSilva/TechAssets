# TechAssets — Plataforma de Gestão de Ativos de TI

Aplicação web moderna, responsiva e fluida para controle patrimonial, gestão de ciclo de vida e rastreabilidade de ativos de TI corporativos. Desenvolvida em React 18 com Vite e estilização customizada de alta performance, fiel aos layouts de referência presentes em `public/referencias/`.

---

## 🎨 Módulos e Telas Implementados (Mapeamento 1:1 com Referências)

A interface contempla navegação dinâmica, interativa e fluida entre todos os módulos especificados:

1. **Início / Banner Principal (`01-banner-pagina-inicial.png`)**
   - Hero section de alto impacto com tipografia moderna, iluminação técnica ambiente (*radial ambient glows*), chamada para ação clara (*CTA*) e proposições de valor ("Visão completa", "Mais controle", "Decisões melhores").
   - Showcase visual interativo de hardware (MacBook Pro, Studio Display, iPad, iPhone, Mouse) com wallpapers fluidos.
   - Faixa de resumo de categorias no rodapé (Notebooks, Celulares, Tablets, Desktops, Monitores, Acessórios) com contadores e navegação direta para o inventário filtrado.

2. **Autenticação / Login (`02-login.png`)**
   - Tela minimalista com fundo em gradiente suave e ondas técnicas sutis.
   - Formulário com validação em tempo real, alternância de visibilidade de senha (ícone de olho), "Lembrar-me", link de recuperação de senha e botão com estado de carregamento (*spinner*).
   - Botão corporativo de SSO "Entrar com Microsoft" e atalho de demonstração para acesso com 1 clique como Administrador.

3. **Dashboard Geral (`03-dashboard.png`)**
   - 4 Cartões de Métricas (KPIs): Total de ativos (1.248, +12%), Em uso (856, 68,6%), Disponíveis (256, 20,5%), Em manutenção (136, 10,9%).
   - Gráfico de Rosca (*Donut Chart*) em SVG com contagem central e legenda detalhada com contagem e percentuais por categoria.
   - Linha de "Movimentações recentes" com ícones dos equipamentos, rotas de transferência/entrega, tags coloridas e horários.
   - Painel de "Alertas e pendências" com indicadores de atenção para manutenções atrasadas, ativos sem responsável e garantias a vencer.
   - Gráfico de barras verticais "Ativos por categoria" com valores absolutos no topo e interatividade.

4. **Lista de Ativos / Inventário (`04-lista-de-ativos.png`)**
   - Barra de ferramentas superior com busca em tempo real (por patrimônio, nome, modelo, responsável e localização), seletor de filtros avançados e botão "+ Novo ativo".
   - *Pills* de filtro rápido por categoria (Notebooks, Celulares, Tablets, Desktops, Monitores, Acessórios).
   - Tabela de dados de alta densidade com ordenação por coluna (Patrimônio, Nome, Categoria, Estado, Responsável).
   - Badges de status semânticos ("Em uso", "Disponível", "Em manutenção", "Descartado").
   - Ações por linha (visualizar detalhes, edição rápida e remoção com confirmação).
   - Exportação direta de dados em planilha CSV e barra de paginação numerada (1, 2, 3... 16, >).

5. **Detalhes do Equipamento (`05-detalhes-do-ativo.png`)**
   - Breadcrumb navegável com tag de status do equipamento no topo.
   - Galeria de imagens interativa com ângulo principal, miniaturas selecionáveis e botão de ampliação.
   - Botão de edição rápida e menu dropdown de ações (gerar etiqueta com QR Code, imprimir ficha técnica, agendar manutenção, solicitar descarte).
   - Ficha técnica completa de metadados patrimoniais (Patrimônio, Categoria, Modelo, Número de série, Estado, Responsável, Localização, Data de aquisição, Garantia até).
   - Sistema de abas com transição suave:
     - **Resumo:** 4 cartões com especificações de hardware (Processador, Memória RAM, Armazenamento, Sistema Operacional).
     - **Movimentações:** Linha do tempo visual de transferências e entregas.
     - **Manutenções:** Histórico de intervenções com botão para abertura de nova ordem.
     - **Documentos:** Lista de arquivos anexados (NF-e, Termo de responsabilidade assinado, Garantia) com download simulado.

6. **Controle de Manutenções (`07-manutencoes.png`)**
   - Breadcrumbs contextualizados e botão destacado "+ Nova manutenção".
   - Cartões de resumo operacional: Ordens abertas, Concluídas no mês, Custo no mês e Tempo médio de resolução.
   - Tabela com Data, Tipo (Preventiva/Corretiva/Upgrade), Descrição do serviço, Responsável/Prestador, Custo e Status.
   - Modal interativo para abertura e cadastro imediato de novas ordens de serviço preventivas e corretivas com validação de campos.

7. **Cadastro de Novo Ativo (`08-novo-ativo.png`)**
   - Assistente em etapas (*Wizard Stepper*):
     - **Etapa 1 — Informações básicas:** Patrimônio, Categoria, Modelo, Número de série, Estado, Data de aquisição, Garantia até e Observações.
     - **Etapa 2 — Responsável e localização:** Colaborador responsável, Departamento, Localização física, Fornecedor e Custo.
     - **Etapa 3 — Revisão:** Cartão consolidado com resumo de todas as informações antes da confirmação final.
   - Validação de obrigatoriedade dos campos com mensagens de erro inline e feedback via Toast.

8. **Perfil do Usuário (`09-perfil-do-usuario.png`)**
   - Navegação interna por abas laterais: "Informações pessoais", "Alterar senha", "Preferências", "Notificações" e "Sessões ativas".
   - Formulário com dados cadastrais: Nome completo, E-mail corporativo, Cargo, Departamento e Telefone com máscara.
   - Painel lateral com "Informações da conta": Perfil de acesso (Administrador), Membro desde, Último acesso e selo de autenticação em duas etapas.
   - Botão "Salvar alterações" com feedback imediato.

---

## 🏗️ Estrutura Arquitetural Modular

```
techassets/
├── public/
│   └── referencias/               # Imagens de referência originais fornecidas
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── BrandLogo.jsx      # Logotipo vetorizado oficial TechAssets
│   │   │   ├── StatusBadge.jsx    # Pills e indicadores semânticos de estado
│   │   │   └── Toast.jsx          # Sistema de notificações flutuantes
│   │   └── layout/
│   │       ├── AppLayout.jsx      # Shell principal, gaveta mobile e seletor demo
│   │       ├── Sidebar.jsx        # Barra lateral corporativa com navegação
│   │       └── Topbar.jsx         # Cabeçalho global com busca, alertas e perfil
│   ├── data/
│   │   └── mockData.js            # Base de dados em memória rica e representativa
│   ├── views/
│   │   ├── LandingView.jsx        # Tela 01: Hero banner com visual imersivo
│   │   ├── LoginView.jsx          # Tela 02: Autenticação minimalista e moderna
│   │   ├── DashboardView.jsx      # Tela 03: KPIs, rosca e movimentações
│   │   ├── AssetListView.jsx      # Tela 04: Tabela com busca, ordenação e filtros
│   │   ├── AssetDetailView.jsx    # Tela 05: Ficha técnica, galeria e abas
│   │   ├── MaintenanceView.jsx    # Tela 07: Controle de manutenções e OS
│   │   ├── NewAssetView.jsx       # Tela 08: Wizard stepper de cadastro
│   │   ├── UserProfileView.jsx    # Tela 09: Painel de conta e preferências
│   │   ├── MovementsView.jsx      # Módulo complementar de movimentações
│   │   ├── ReportsView.jsx        # Módulo de relatórios e inteligência de dados
│   │   └── SupportView.jsx        # Central de documentação e suporte
│   ├── main.jsx                   # Ponto de entrada e gerenciador de estado global
│   └── styles.css                 # Folha de estilos unificada, responsiva e performática
├── index.html                     # Template HTML com meta tags e fontes
├── package.json                   # Dependências do projeto (React 18, Vite 5, Lucide)
└── vite.config.js                 # Configuração do Vite (porta 5173 e host 127.0.0.1)
```

---

## ⚡ Como Executar o Projeto

1. Certifique-se de que o **Node.js (LTS)** e o **npm** estejam instalados no sistema.
2. Abra um terminal na pasta `techassets`:
   ```bash
   npm install
   ```
3. Inicie o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```
4. Acesse no navegador:
   ```
   http://127.0.0.1:5173
   ```
5. Para gerar o build de produção otimizado:
   ```bash
   npm run build
   ```

---

## 💡 Recursos Adicionais para Avaliação

- **Seletor Flutuante de Módulos ("Módulos de Referência"):** Uma barra no canto inferior direito permite alternar instantaneamente entre qualquer uma das 8 telas de referência durante a navegação.
- **Exportação de Relatórios:** Botão de exportação para `.csv` na listagem de ativos e suporte nativo a impressão (`window.print()`) com folha de estilos limpa (`@media print`).
- **Design Totalmente Responsivo:** Suporte completo de 320px até telas widescreen 4K com gaveta lateral retrátil no mobile e touch targets amigáveis.
