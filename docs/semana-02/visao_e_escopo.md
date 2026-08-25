# FAEX — Engenharia de Software
## Semana 02 | Entrega E02 — Visão do Produto e Escopo do MVP

**Projeto:** TechAssets — Sistema para Gestão e Rastreabilidade de Ativos de TI  
**Equipe:** Luiz Gabriel de Moraes & Mateus Gomes da Silva  
**Professora:** Denise Ribeiro  
**Release Publicada:** [semana-02](https://github.com/MateusGomesSilva/TechAssets/releases/tag/semana-02)  

---

## 1. Visão Geral do Produto

O **TechAssets** é um sistema web desenvolvido para solucionar a falta de visibilidade e descontrole patrimonial de ativos de tecnologia em empresas de pequeno e médio porte. A solução centraliza o cadastro, o acompanhamento de status e a transferência de responsabilidade de equipamentos corporativos em uma plataforma simples e auditável.

---

## 2. Declaração de Objetivo do MVP (Semana 14)

> **Objetivo:** Entregar até a Semana 14 uma aplicação web funcional, implantada e testada, capaz de realizar o tombamento com Tag única, consulta filtrada, registro de transferência de responsável e histórico de manutenção para equipamentos de TI de PMEs, garantindo 100% de rastreabilidade do acervo cadastrado.

---

## 3. Delimitação de Escopo

### 🟢 Escopo Incluído no MVP
1. **Módulo de Cadastro de Ativos:**
   - Formulário com validação de campos obrigatórios (Nome, Categoria, Nº de Série, Status, Responsável, Filial/Setor).
   - Impedimento de cadastros com número de série duplicado.
   - Geração automática de Tag patrimonial única (`TAG-2026-XXXX`).
2. **Módulo de Consulta e Filtragem:**
   - Tabela de listagem dinâmica com busca por texto.
   - Filtros instantâneos por status (*Disponível, Em uso, Manutenção, Baixado*).
3. **Módulo de Movimentação e Responsabilidade:**
   - Formulário de transferência de equipamento para novo colaborador/setor.
   - Registro em linha do tempo do histórico de responsável.
4. **Infraestrutura e Qualidade:**
   - Suíte de testes automatizados unitários (JUnit 5).
   - Workflow de Integração Contínua (CI) via GitHub Actions.
   - Decisão e implantação inicial na nuvem AWS.

### 🔴 Escopo Excluído do MVP
1. Gestão financeira avançada (cálculos de depreciação fiscal e contábil).
2. Integração automatizada com sistemas de nota fiscal de fornecedores.
3. Agente executável para monitoramento de hardware em tempo real (CPU/RAM).
4. Baixa patrimonial automatizada com leilão/descarte.

---

## 4. Restrições do Projeto

- **Restrição de Prazo:** O MVP final deve ser concluído e validado impreterivelmente até a Semana 14.
- **Restrição de Equipe:** Exatamente 2 integrantes (Luiz Gabriel de Moraes e Mateus Gomes da Silva).
- **Restrição de Custo / Cloud:** Utilização estrita dos limites do Free Tier / conta educacional na AWS.
- **Restrição Tecnológica:** Stack principal definida em Java 21, Spring Boot, HTML5/CSS3/JS, PostgreSQL/MySQL e Maven.

---

## 5. Indicadores Iniciais de Sucesso (KPIs)

- **KPI 1 (Qualidade do Código):** 100% de aprovação nos testes automatizados no pipeline de CI.
- **KPI 2 (Rastreabilidade):** 0% de duplicidade em números de série cadastrados no sistema.
- **KPI 3 (Desempenho da Jornada):** Tempo de cadastro de um novo ativo inferior a 45 segundos por item.
