# TechAssets — Gestão e Rastreabilidade de Ativos de TI

[![CI Build](https://github.com/MateusGomesSilva/TechAssets/actions/workflows/ci.yml/badge.svg)](https://github.com/MateusGomesSilva/TechAssets/actions/workflows/ci.yml)
[![Release E01](https://img.shields.io/badge/Release-semana--01-blue.svg)](https://github.com/MateusGomesSilva/TechAssets/releases/tag/semana-01)
[![Release E02](https://img.shields.io/badge/Release-semana--02-green.svg)](https://github.com/MateusGomesSilva/TechAssets/releases/tag/semana-02)
[![Release E03](https://img.shields.io/badge/Release-semana--03-orange.svg)](https://github.com/MateusGomesSilva/TechAssets/releases/tag/semana-03)

Sistema para gestão e rastreabilidade de ativos de TI para empresas de pequeno e médio porte, desenvolvido para a disciplina de Engenharia de Software na **FAEX (Faculdade de Extrema)**.

---

## 📌 Sobre o Projeto

O **TechAssets** tem como objetivo apoiar empresas no controle e acompanhamento de seus ativos de tecnologia (notebooks, monitores, servidores, periféricos). O sistema resolve a perda de visibilidade e descontrole patrimonial causados por planilhas eletrônicas dispersas.

- **Problema Selecionado:** Dificuldade de rastreamento de localização, histórico e responsáveis de equipamentos corporativos em PMEs, gerando perdas patrimoniais e compras duplicadas.
- **Hipótese de Valor:** Plataforma simples com geração automática de Tag patrimonial única, consulta filtrada e histórico de transferências que reduz em 80% o tempo operacional de busca de equipamentos.

---

## 🛠️ Tecnologias e Arquitetura

- **Linguagem Principal:** Java 21+
- **Framework & Build:** Spring Boot & Apache Maven
- **Testes Automatizados:** JUnit 5 (Jupiter)
- **Frontend & Protótipos:** HTML5 / CSS3 / JavaScript
- **Banco de Dados:** PostgreSQL / MySQL
- **Nuvem / Cloud:** AWS (Região `us-east-1`, App Runner/EC2, RDS, S3, IAM, CloudWatch)
- **Integração Contínua (CI):** GitHub Actions

---

## 📁 Estrutura do Repositório

```text
TechAssets/
├── .github/
│   ├── ISSUE_TEMPLATE/        # Modelos formais para relatar bugs e melhorias
│   │   ├── bug_report.md
│   │   └── feature_request.md
│   ├── PULL_REQUEST_TEMPLATE.md
│   └── workflows/
│       └── ci.yml             # Workflow de CI do GitHub Actions (Java 21 + Maven)
├── docs/
│   ├── semana-01/
│   │   └── canvas_descoberta.md    # [E01] Canvas de Descoberta, Entrevistas e Matriz de Decisão
│   ├── semana-02/
│   │   ├── visao_e_escopo.md       # [E02] Visão do Produto, Escopo do MVP e Indicadores
│   │   ├── plano_14_entregas.md    # [E02] Modelo de Processo Iterativo e Calendário de 14 Semanas
│   │   ├── riscos_v1_e_mudanca_escopo.md # [E02] Matriz de Responsabilidades, Riscos v1 e DoD
│   │   └── aws_plano_inicial.md    # [E02] Decisão Inicial da Arquitetura AWS e Free Tier
│   ├── semana-03/
│   │   ├── backlog_priorizado.md   # [E03] Backlog Priorizado (US-01 a US-05) e Corte de Escopo
│   │   ├── mapa_de_historias.md    # [E03] User Story Map da Jornada do Usuário
│   │   └── prototipo.md            # [E03] Protótipo de Baixa Fidelidade de 5 Telas e Peer Review
│   └── evidencias/
│       ├── semana-01/README.md     # [E01] Índice de Evidências Rastreáveis E01
│       ├── semana-02/README.md     # [E02] Índice de Evidências Rastreáveis E02
│       └── semana-03/indice.md     # [E03] Tabela Unificada de Evidências E03
├── src/
│   ├── main/
│   │   ├── java/com/techassets/
│   │   │   ├── model/             # Entidades (Asset.java, AssetStatus.java)
│   │   │   └── service/           # Regras de Negócio do MVP (AssetService.java)
│   │   └── resources/static/
│   │       └── index.html         # Protótipo Interativo Web de Baixa Fidelidade
│   └── test/
│       └── java/com/techassets/
│           ├── AssetServiceTest.java # Suíte de Testes Automatizados JUnit 5
│           └── TestRunner.java       # Executável de Testes Locais CLI
├── .gitignore                      # Regras de exclusão do Git
├── pom.xml                         # Configuração Maven
└── README.md                       # Documentação principal
```

---

## 🚀 Como Executar Localmente

### 1. Pré-requisitos
- **Java JDK 21+** instalado (`java -version`).
- **Apache Maven** (opcional, para execução de comandos `mvn`).

### 2. Executar os Testes Automatizados (Verificação Local)
No terminal do projeto, execute o comando de testes Maven:

```bash
# Execução via Maven
mvn test

# Ou via compilação direta standalone
javac -d target/classes src/main/java/com/techassets/model/*.java src/main/java/com/techassets/service/*.java src/test/java/com/techassets/TestRunner.java
java -ea -cp target/classes com.techassets.TestRunner
```

### 3. Visualizar o Protótipo Interativo de Baixa Fidelidade
Abra o arquivo `src/main/resources/static/index.html` diretamente em qualquer navegador web ou suba um servidor HTTP:

```bash
python -m http.server 8000 --directory src/main/resources/static
```
Acesse `http://localhost:8000` para testar a jornada de 5 telas.

---

## 🔗 Links Oficiais de Evidências por Entrega

### 📍 Semana 01 — Entrega E01 (Oportunidade e Descoberta)
- 📄 **[Canvas de Descoberta e Enquadramento](docs/semana-01/canvas_descoberta.md)**
- 📌 **[Índice de Evidências E01](docs/evidencias/semana-01/README.md)**
- 🏷️ **[Release Publicada `semana-01`](https://github.com/MateusGomesSilva/TechAssets/releases/tag/semana-01)**

### 📍 Semana 02 — Entrega E02 (Linha de Base do Processo e Plano Viável)
- 📄 **[Visão do Produto e Escopo](docs/semana-02/visao_e_escopo.md)**
- 🗓️ **[Plano das 14 Entregas e Modelo de Processo](docs/semana-02/plano_14_entregas.md)**
- ⚠️ **[Matriz de Riscos v1 e Governança de Escopo](docs/semana-02/riscos_v1_e_mudanca_escopo.md)**
- ☁️ **[Decisão Inicial de Arquitetura AWS](docs/semana-02/aws_plano_inicial.md)**
- 📌 **[Índice de Evidências E02](docs/evidencias/semana-02/README.md)**
- 🏷️ **[Release Publicada `semana-02`](https://github.com/MateusGomesSilva/TechAssets/releases/tag/semana-02)**

### 📍 Semana 03 — Entrega E03 (Backlog, Protótipo e Scaffold CI)
- 📋 **[Backlog Priorizado](docs/semana-03/backlog_priorizado.md)**
- 🗺️ **[Mapa de Histórias (User Story Map)](docs/semana-03/mapa_de_historias.md)**
- 🎨 **[Protótipo de Baixa Fidelidade](docs/semana-03/prototipo.md)**
- 📌 **[Índice de Evidências E03](docs/evidencias/semana-03/indice.md)**
- 🏷️ **[Release Publicada `semana-03`](https://github.com/MateusGomesSilva/TechAssets/releases/tag/semana-03)**

---

## 👥 Equipe do Projeto

- **Luiz Gabriel de Moraes** (`@LuizGabrielMoraes`)
- **Mateus Gomes da Silva** (`@MateusGomesSilva`)

**Instituição:** FAEX — Faculdade de Extrema  
**Curso:** Engenharia de Software — 4º Período  
**Professora:** Denise Ribeiro (`denise.ribeiro@faex.edu.br`)  
