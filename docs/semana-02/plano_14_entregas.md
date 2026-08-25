# FAEX — Engenharia de Software
## Semana 02 | Entrega E02 — Plano das 14 Entregas e Modelo de Processo

**Projeto:** TechAssets — Gestão e Rastreabilidade de Ativos de TI  
**Equipe:** Luiz Gabriel de Moraes & Mateus Gomes da Silva  
**Professora:** Denise Ribeiro  

---

## 1. Escolha e Justificativa do Modelo de Processo

A equipe selecionou um **Modelo Híbrido Iterativo e Incremental (baseado em ciclos curtos de 1 semana)** para conduzir o projeto TechAssets até a Semana 14.

### Justificativa pelos 4 Critérios do Projeto:
1. **Incerteza e Redução de Riscos:** O desenvolvimento incremental permite validar primeiro a jornada essencial de cadastro e movimentação (incremento 1) antes de investir em relatórios ou integrações.
2. **Prazo Fixo de 14 Semanas:** Entregas semanais com Definition of Done garantem visibilidade do progresso real e evitam acúmulo de tarefas na reta final.
3. **Capacidade da Dupla (2 Pessoas):** Permite alternar papéis entre responsável técnico e revisor de qualidade a cada semana, evitando gargalos de conhecimento.
4. **Exigência de Documentação e Rastreabilidade:** Cada iteração gera evidências auditáveis (Issues, PRs, Tags no Git e testes integrados no CI).

---

## 2. Calendário e Marcos das 14 Entregas

| Semana | Marco da Entrega (Milestone) | Atividades Principais | Frente Lider | Revisor | Evidência Comprovatória |
| :---: | :--- | :--- | :---: | :---: | :--- |
| **E01 (Sem. 01)** | **Investigação & Problema** | Pesquisa de mercado, entrevistas P01/P02/P03, Canvas e repositório. | Produto | Qualidade | Release `semana-01` no GitHub |
| **E02 (Sem. 02)** | **Linha de Base & Processo** | Visão, plano de 14 entregas, riscos v1, decisão AWS e GitHub Project. | Arquitetura | Produto | Release `semana-02` no GitHub |
| **E03 (Sem. 03)** | **Backlog, Wireframe & CI** | Backlog priorizado (US-01 a US-05), protótipo de 5 telas, scaffold e CI. | Produto | Qualidade | Release `semana-03` + CI em verde |
| **E04 (Sem. 04)** | **Requisitos & Especificação** | Detalhamento técnico de APIs, regras de validação e esquema do banco. | Arquitetura | Qualidade | Doc de Requisitos e PR merged |
| **E05 (Sem. 05)** | **Protótipo Interativo & Modelos** | Telas em baixa/média fidelidade e diagramas ER do banco. | Produto | Arquitetura | Protótipo validado e schema SQL |
| **E06 (Sem. 06)** | **Esqueleto da Aplicação** | Estrutura Spring Boot, conexão com banco local e entidades JPA. | Arquitetura | Qualidade | Endpoints iniciais testados |
| **E07 (Sem. 07)** | **Primeira Fatia Integrada** | Cadastro e consulta de ativos operacionais em ambiente local. | Arquitetura | Produto | Testes de integração passando |
| **E08 (Sem. 08)** | **Ambiente Cloud AWS** | Provisionamento inicial da AWS (EC2/RDS), deploy do esqueleto. | Arquitetura | Qualidade | URL da AWS operacional |
| **E09 (Sem. 09)** | **Movimentação & Histórico** | Módulo de transferência de responsável e linha do tempo. | Desenvolvimento | Produto | Testes do módulo de movimentação |
| **E10 (Sem. 10)** | **Filtros Avançados & UI** | Interface responsiva com busca rápida e contadores no dashboard. | Produto | Qualidade | Front-end integrado à API |
| **E11 (Sem. 11)** | **Bateria de Testes & Audit** | Suíte de testes unitários, integração e verificação de concorrência. | Qualidade | Arquitetura | Relatório de cobertura > 80% |
| **E12 (Sem. 12)** | **Segurança & Hardening AWS** | Revisão de IAM, HTTPS, proteção contra SQL injection e validação. | Arquitetura | Qualidade | Check de segurança aprovado |
| **E13 (Sem. 13)** | **Release Candidate (RC)** | Congelamento de código, testes de regressão e guia de usuário. | Qualidade | Produto | Release Candidate no GitHub |
| **E14 (Sem. 14)** | **Versão Final MVP v1.0.0** | Auditoria final, apresentação e disponibilização do link oficial AWS. | Produto | Arquitetura | Release `v1.0.0` definitiva |

---

## 3. Estimativas e Capacidade da Dupla

- **Capacidade Semanal:** 12 a 16 horas/semana por integrante (total de 24 a 32 horas/semana para a dupla).
- **Dimensionamento das Macroentregas:**
  - *Semanas 01 a 03 (Concepção e Alinhamento):* ~20h/semana (Foco em pesquisa, backlog, protótipo e CI).
  - *Semanas 04 a 08 (Fundamentos & AWS):* ~28h/semana (Foco em código Java, banco de dados e nuvem).
  - *Semanas 09 a 12 (Construção Incremental & Testes):* ~30h/semana (Foco em recursos e qualidade).
  - *Semanas 13 a 14 (Estabilização & Homologação):* ~16h/semana (Foco em refinamento e apresentação).
