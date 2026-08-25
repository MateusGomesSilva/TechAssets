# FAEX — Engenharia de Software
## Semana 03 | Laboratório 1 — Backlog e Priorização

**Projeto:** TechAssets — Sistema para Gestão e Rastreabilidade de Ativos de TI  
**Equipe:** Luiz Gabriel de Moraes & Mateus Gomes da Silva  
**Data:** 24/08/2026  
**Tarefa GitHub:** [#1 — E03-LAB1: Backlog e Priorização](https://github.com/MateusGomesSilva/TechAssets/issues/1)  

---

## 1. Objetivo da Primeira Iteração (MVP)

> **"Permitir o cadastro, a consulta e a atualização de responsável/status de ativos de TI para garantir a rastreabilidade dos equipamentos e evitar perdas patrimoniais."**

---

## 2. Histórias de Usuário Priorizadas

As histórias seguem o padrão *Como [tipo de usuário], quero [ação ou capacidade], para [valor ou resultado esperado]*.

| ID | História de Usuário | Prioridade | Justificativa / Risco Reduzido |
| :--- | :--- | :---: | :--- |
| **US-01** | **Como** analista de suporte, **quero** cadastrar um novo ativo de TI com número de série, categoria e responsável, **para** manter o controle patrimonial atualizado no momento da entrada do equipamento. | **Alta (Must)** | Essencial para alimentar a base de dados. Reduz o risco de equipamentos não rastreados. |
| **US-02** | **Como** gestor de TI, **quero** consultar e filtrar a lista de ativos por status (Em uso, Manutenção, Disponível) ou filial, **para** ter visibilidade rápida da disponibilidade de equipamentos. | **Alta (Must)** | Essencial para tomadas de decisão rápidas de alocação de hardware. |
| **US-03** | **Como** responsável pelo patrimônio, **quero** registrar a movimentação/transferência de um ativo para um novo colaborador ou setor, **para** garantir o histórico do responsável atual. | **Alta (Must)** | Garante a responsabilização direta sobre o equipamento corporativo. |
| **US-04** | **Como** analista de suporte, **quero** registrar uma ocorrência de manutenção em um ativo, **para** manter o histórico técnico do equipamento visível. | **Média (Should)** | Agrega valor operacional, mas não impede a demonstração da jornada de cadastro e movimentação. |
| **US-05** | **Como** gestor de TI, **quero** emitir um relatório sintético de ativos por departamento, **para** planejamento de substituição e compras. | **Baixa (Could)** | Recurso de conveniência/gerencial para iterações futuras. |

---

## 3. Critérios de Aceitação Observáveis

| História | Critério de Aceitação | Como Verificar |
| :--- | :--- | :--- |
| **US-01** | CA01.1: O sistema deve validar o preenchimento dos campos obrigatórios (Nome, Categoria, Nº de Série e Status). | Tentar salvar o form em branco e verificar os avisos de erro de validação nos campos. |
| **US-01** | CA01.2: O sistema deve impedir a inserção de número de série duplicado. | Cadastrar dois ativos com o mesmo Nº de Série e verificar mensagem de duplicidade. |
| **US-01** | CA01.3: O sistema deve emitir mensagem de confirmação com a Tag/ID do ativo gerado. | Cadastrar ativo válido e observar o banner de sucesso com o código gerado. |
| **US-02** | CA02.1: A listagem deve exibir Nome, Nº de Série, Categoria, Status e Responsável Atual. | Acessar a tela de consulta e conferir as colunas exibidas na tabela. |
| **US-02** | CA02.2: O filtro por Status (Disponível, Em uso, Manutenção) deve atualizar a lista instantaneamente. | Selecionar um filtro e verificar se apenas ativos daquele status permanecem na tela. |
| **US-03** | CA03.1: A alteração de responsável deve solicitar o novo responsável e a data de transferência. | Preencher formulário de movimentação e salvar. |
| **US-03** | CA03.2: O histórico do ativo deve guardar o responsável anterior e o atual com data/hora. | Abrir o detalhe do ativo e validar os registros na linha do tempo de movimentações. |

---

## 4. Corte de Escopo (Scope Cut)

### 🟢 O que ENTRA na 1ª Iteração (MVP)
- Cadastrar ativo de TI (Nome, Categoria, Nº de Série, Status, Responsável, Filial).
- Consultar ativos cadastrados com busca por texto e filtro por Status.
- Alterar o status do ativo (Disponível, Em Uso, Manutenção, Baixado).
- Registrar movimentação/transferência simples de responsável.
- Testes unitários do serviço de ativos e interface visual de baixa fidelidade executável.

### 🔴 O que FICA FORA da 1ª Iteração
- Módulo de gestão financeira completa (depreciação contábil, valor fiscal).
- Integração com nota fiscal e módulo de compras/fornecedores.
- Automação de descarte e baixa patrimonial oficial.
- Monitoramento de hardware via agente instalado na máquina.
- Autenticação avançada via SSO / OAuth2.

### 🟡 Depende de Decisão Técnica Futura
- Armazenamento definitivo: MySQL vs PostgreSQL em ambiente de produção na nuvem.
- Leitura de código de barras / QR Code via câmera do dispositivo móvel.

---

## 5. Dependências e Riscos Principais

1. **Risco 1: Inconsistência no cadastro de equipamentos legados**  
   - *Mitigação:* Exigir validação rígida de formato de Número de Série e campos pré-selecionados (dropdowns).
2. **Risco 2: Falta de padronização de locais/filiais**  
   - *Mitigação:* Utilizar tabela de domínio fixa para departamentos e filiais no MVP.
3. **Dependência Técnica:** Ambiente Java 21+ configurado com suporte a CI via GitHub Actions.

---

## 6. Definições da Equipe

### Definição de Pronto para Iniciar (DoR - Definition of Ready)
Uma história é considerada pronta para desenvolvimento quando possui:
- [x] Descrição clara no formato *Como / Quero / Para*.
- [x] Critérios de aceitação objetivos e testáveis definidos.
- [x] Prioridade atribuída e aprovada pela dupla.
- [x] Protótipo de baixa fidelidade associado à história.

### Definição de Pronto (DoD - Definition of Done)
Uma história é considerada pronta quando:
- [x] Código implementado seguindo as convenções do projeto.
- [x] Teste automatizado criado e executando com sucesso (100% de aprovação).
- [x] Pull Request aberto, revisado e aprovado pelo colega da dupla.
- [x] Integrado à branch `main` através do workflow de CI.
