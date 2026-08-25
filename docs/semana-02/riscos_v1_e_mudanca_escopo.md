# FAEX — Engenharia de Software
## Semana 02 | Entrega E02 — Registro de Riscos v1, Responsabilidades e Mudança de Escopo

**Projeto:** TechAssets — Gestão e Rastreabilidade de Ativos de TI  
**Equipe:** Luiz Gabriel de Moraes & Mateus Gomes da Silva  
**Professora:** Denise Ribeiro  

---

## 1. Matriz de Responsabilidades Alternada (Dupla)

A dupla compartilha as três frentes de trabalho (**Produto e Requisitos**, **Arquitetura e Desenvolvimento**, **Qualidade e Entrega**), alternando semanalmente quem lidera e quem revisa:

| Macroentrega | Frente Lider | Integrante Lider | Integrante Revisor |
| :--- | :--- | :--- | :--- |
| **E01 (Semana 01)** | Produto e Requisitos | Mateus Gomes da Silva | Luiz Gabriel de Moraes |
| **E02 (Semana 02)** | Arquitetura e Processo | Luiz Gabriel de Moraes | Mateus Gomes da Silva |
| **E03 (Semana 03)** | Backlog e Protótipo | Mateus Gomes da Silva | Luiz Gabriel de Moraes |
| **E04 (Semana 04)** | Arquitetura de Software | Luiz Gabriel de Moraes | Mateus Gomes da Silva |
| **E05-E08 (Semanas 05-08)** | Desenvolvimento & AWS | Luiz Gabriel de Moraes | Mateus Gomes da Silva |
| **E09-E12 (Semanas 09-12)** | Incrementos & Qualidade | Mateus Gomes da Silva | Luiz Gabriel de Moraes |
| **E13-E14 (Semanas 13-14)** | Estabilização & Release | Luiz Gabriel de Moraes | Mateus Gomes da Silva |

---

## 2. Registro de Riscos Versão 1 (Baseline)

| ID | Descrição do Risco | Prob. | Impacto | Ação de Mitigação / Resposta | Responsável |
| :---: | :--- | :---: | :---: | :--- | :--- |
| **R-01** | Limite de créditos ou indisponibilidade no Free Tier da AWS. | Média | Alto | Utilizar containers Docker leves e instâncias `t3.micro`; manter alternativa local em Java. | Luiz Gabriel |
| **R-02** | Complexidade no controle de concorrência ao atualizar ativo. | Baixa | Média | Utilizar controle otimista com `@Version` no Spring Data JPA. | Luiz Gabriel |
| **R-03** | Atraso nas revisões por conflito de horários de trabalho da dupla. | Média | Média | Janela fixa diária de 30 minutos para revisão de Pull Requests. | Mateus Gomes |
| **R-04** | Aumento indevido no escopo do MVP solicitando relatórios complexos. | Média | Alto | Aplicar estritamente o procedimento formal de Mudança de Escopo. | Mateus Gomes |
| **R-05** | Credenciais ou chaves de API enviadas por engano ao GitHub. | Baixa | Alto | `.gitignore` configurado rígido + Hooks de pre-commit e Git Secrets. | Luiz Gabriel |

---

## 3. Critérios Formais para Mudança de Escopo

Toda solicitação de inclusão ou remoção de requisitos após a Semana 02 deve seguir a seguinte regra:

1. **Gatilho:** Inclusão de nova funcionalidade ou alteração técnica relevante.
2. **Avaliação Obrigatória:**
   - *Impacto no Prazo:* A alteração compromete a entrega da Semana 14?
   - *Impacto na Arquitetura:* Exige novas tecnologias não dominadas?
   - *Regra de Compensação:* Para cada novo requisito incluído, um de esforço equivalente deve ser removido ou postergado para a v2.0.
3. **Aprovação:** Registrada formalmente via comentário no GitHub Issue com aceite dos dois integrantes.

---

## 4. Definition of Done (DoD) Versão 1

Um entregável da Semana 02 ou posterior é considerado **CONCLUÍDO (DONE)** quando:
- [x] O código ou documento atende a 100% dos requisitos especificados na Issue.
- [x] A suíte de testes unitários é executada com sucesso (0 falhas).
- [x] O documento possui versão editável (`DOCX`/`MD`) e estática (`PDF`) na pasta `docs/evidencias/`.
- [x] O Pull Request foi revisado e aprovado pelo integrante revisor.
- [x] O Merge na branch `main` foi efetuado.
- [x] A Tag da semana foi criada no Git e a Release publicada no GitHub.
