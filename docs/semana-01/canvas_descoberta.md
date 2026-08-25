# FAEX — Engenharia de Software
## Semana 01 | Entrega E01 — Canvas de Descoberta e Enquadramento do Problema

**Nome do Produto:** TechAssets — Gestão e Rastreabilidade de Ativos de TI  
**Equipe:** Luiz Gabriel de Moraes & Mateus Gomes da Silva  
**Professora:** Denise Ribeiro  
**Curso:** Engenharia de Software — FAEX (Faculdade de Extrema)  
**Repositório Privado:** [MateusGomesSilva/TechAssets](https://github.com/MateusGomesSilva/TechAssets)  
**Versão Publicada (Release):** [semana-01](https://github.com/MateusGomesSilva/TechAssets/releases/tag/semana-01)  

---

## 1. Identificação do Produto e da Equipe

- **Nome Provisório do Produto:** TechAssets
- **Integrantes:**
  - Luiz Gabriel de Moraes (Desenvolvimento / Arquitetura) — `@LuizGabrielMoraes`
  - Mateus Gomes da Silva (Produto / Qualidade) — `@MateusGomesSilva`
- **Organização / Disciplina:** FAEX — Engenharia de Software 2026.2

---

## 2. Declaração dos Problemas Candidatos

### 2.1 Problema Candidato A (SELECIONADO — TechAssets)
> **Declaração:** Analistas de suporte e gestores de TI em empresas de pequeno e médio porte enfrentam extrema dificuldade para localizar, acompanhar o status e manter o histórico confiável de ativos tecnológicos ao utilizar planilhas e controles manuais, provocando perda de tempo operacional, compras duplicadas e falta de rastreabilidade patrimonial.

- **Público afetado:** Analistas de Suporte, Gestores de TI e Responsáveis pelo Patrimônio.
- **Contexto:** Empresas de pequeno e médio porte (PMEs) com frota de 50 a 500 equipamentos de TI (notebooks, monitores, servidores, periféricos).
- **Impacto Observável:** Perda média de 4 horas semanais por analista buscando localização de equipamentos; ocorrência de compras não planejadas por falta de visibilidade do estoque disponível.

### 2.2 Problema Candidato B (DESCARTADO)
> **Declaração:** Gestores de logística em transportadoras de pequeno porte enfrentam descontrole no agendamento da manutenção preventiva de frotas rodoviárias, resultando em paradas não programadas e custos elevados de guincho.

- **Motivo do Descarte:** Menor acesso primário a gestores de frotas rodoviárias pela dupla durante a janela de pesquisa da E01, em comparação ao acesso direto a equipes de suporte de TI.

---

## 3. Pesquisa de Fontes Secundárias (Evidência Documental)

| ID | Fonte / Instituição | Ano | URL / Referência | Achado Principal | Afirmação Sustentada |
| :--- | :--- | :---: | :--- | :--- | :--- |
| **FS-01** | HDI Brasil / Pesquisa de Gestão de Ativos | 2024 | Pesquisa Setorial de TI | 43% das PMEs brasileiras utilizam planilhas eletrônicas como principal meio de controle patrimonial de TI. | O problema afeta um grande contingente de empresas que carecem de sistemas dedicados. |
| **FS-02** | Gartner Group | 2023 | Asset Management Report | A ausência de processos estruturados de rastreabilidade resulta em perda anual estimada de 5% a 10% do acervo de hardware corporativo. | Confirma o impacto financeiro da falta de controle patrimonial. |

---

## 4. Descoberta Primária Anônima (Entrevistas Anônimas)

Foram realizadas 3 investigações anônimas (P01, P02 e P03) com profissionais que vivenciam a rotina de gestão de equipamentos:

- **P01 (Analista de Suporte de TI em Empresa de Extrema/MG):**
  - *Síntese:* "Quando um novo funcionário entra, levo quase meio dia procurando em planilhas quem está com um notebook reserva disponível. Muitas vezes a planilha está desatualizada há meses."
  - *Dificuldade Principal:* Falta de sincronia entre quem guarda o ativo e quem atualiza o registro.
- **P02 (Gestor de TI em PME Industrial):**
  - *Síntese:* "Já chegamos a comprar 3 monitores novos achando que não tínhamos estoque, e duas semanas depois encontramos 5 monitores parados na sala de reuniões sem cadastro."
  - *Dificuldade Principal:* Falta de visibilidade de estoque parado ou em manutenção.
- **P03 (Analista de Patrimônio e Almoxarifado):**
  - *Síntese:* "No inventário anual é um caos. Não sei se a máquina estragou, se foi doada ou se o funcionário levou para home office sem avisar."
  - *Dificuldade Principal:* Ausência de histórico de movimentação auditável.

---

## 5. Matriz de Decisão e Seleção do Problema

| Critério de Avaliação (Nota 1 a 5) | Candidato A (TechAssets) | Candidato B (Frota) |
| :--- | :---: | :---: |
| **Impacto no Usuário** | 5 | 4 |
| **Recorrência do Problema** | 5 | 3 |
| **Acesso Fácil a Usuários para Validação** | 5 | 2 |
| **Evidência Documental e Primária** | 5 | 3 |
| **Viabilidade de Construção até Semana 14** | 5 | 3 |
| **Adequação à Arquitetura AWS** | 4 | 4 |
| **Risco Ético / Privacidade Favorável (5=Baixo Risco)** | 5 | 4 |
| **PONTUAÇÃO TOTAL** | **34 / 35** | **23 / 35** |

**Decisão:** O problema do **TechAssets** foi selecionado por unanimidade devido ao alto impacto, forte evidência de campo e excelente acesso a usuários para validação contínua.

---

## 6. Usuários e Partes Interessadas (Stakeholders)

- **Usuário Primário:** Analista de Suporte de TI (realiza o tombamento, cadastro e movimentação de equipamentos).
- **Usuário Secundário:** Gestor de TI (consulta relatórios, acompanha disponibilidade de estoque e aprova substituições).
- **Interessados:** Responsável pelo Patrimônio, Colaboradores finais e Diretoria Financeira.

---

## 7. Mapeamento da Jornada Atual (Antes do TechAssets)

```
[Gatilho: Entrada de Equipamento ou Novo Colaborador]
       │
       ▼
[Etapa 1: Busca em Planilhas Excel Desatualizadas] ──► (Dor: Informações divergentes)
       │
       ▼
[Etapa 2: Procura Física em Armários e Salas]     ──► (Dor: Perda de 3-5h operacionais)
       │
       ▼
[Etapa 3: Entrega do Equipamento sem Registro]    ──► (Dor: Ausência de responsável formal)
       │
       ▼
[Desfecho: Perda da Rastreabilidade Patrimonial]
```

---

## 8. Hipótese de Valor e Inovação Contextual

> **Hipótese de Valor:** Acreditamos que analistas de suporte de TI em PMEs, ao utilizarem uma plataforma centralizada com geração automática de Tags patrimoniais e controle simplificado de movimentação, conseguirão reduzir em 80% o tempo gasto na localização de equipamentos e eliminar perdas por descontrole, medido pela taxa de ativos localizados no inventário.

- **Inovação Contextual:** Foco na simplicidade e agilidade para PMEs, eliminando a complexidade e os custos astronômicos de softwares corporativos gigantescos (Enterprise ITAM), com interface intuitiva em baixa fidelidade e arquitetura em nuvem acessível.

---

## 9. Recorte Inicial do MVP (Fronteiras da Semana 01)

- **O que ENTRA no MVP:**
  - Cadastro simplificado de equipamento (Nome, Categoria, Nº de Série, Status, Responsável, Filial).
  - Geração de Tag patrimonial única.
  - Consulta de ativos com filtros por status e barra de pesquisa.
  - Transferência de responsável com registro histórico básico.
- **O que FICA FORA do MVP:**
  - Depreciação contábil e fiscal avançada.
  - Agente de software instalado para monitoramento de CPU/RAM em tempo real.
  - Módulo completo de compras e fornecedores.

---

## 10. Viabilidade Técnica e Hipótese AWS

- **Tecnologias de Domínio da Equipe:** Java 21, Spring Boot, HTML5, CSS3, JavaScript, Git/GitHub.
- **Hipótese da Arquitetura AWS:**
  - *Interface & API:* AWS App Runner ou EC2 (instância `t3.micro` no Free Tier) hospedando a aplicação Java/Spring.
  - *Persistência de Dados:* AWS RDS PostgreSQL ou MySQL (db.t3.micro).
  - *Armazenamento de Documentos:* AWS S3 (para manuais e comprovantes de nota fiscal).
  - *Segurança & Governança:* AWS IAM (política de mínimo privilégio) e AWS CloudWatch (logs).
- **Região Candidata:** `us-east-1` (N. Virginia) devido aos custos reduzidos e suporte completo ao Free Tier.

---

## 11. Ética, Privacidade e Riscos

- **Privacidade de Dados:** Serão registrados apenas dados de equipamentos corporativos (Número de Série, Tag, Marca) e identificadores organizacionais do colaborador (Nome e Setor). NENHUM dado pessoal sensível (CPF, senha pessoal, dados de saúde/bancários) será armazenado.
- **Acordo da Dupla:** Decisões tomadas em conjunto, commits identificáveis por integrante, alternância nas revisões de PR e zero publicação de credenciais ou segredos no repositório.

---

## 12. Conclusão da E01

Os modelos editável (`DOCX`) e em formato de documento estático (`PDF`) foram gerados e armazenados em `docs/semana-01/`. O repositório foi configurado como privado no GitHub com convite enviado à professora Denise Ribeiro (`denise.ribeiro@faex.edu.br`).
