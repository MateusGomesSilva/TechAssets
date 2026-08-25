# FAEX — Engenharia de Software
## Semana 02 | Entrega E02 — Decisão Inicial de Arquitetura AWS

**Projeto:** TechAssets — Gestão e Rastreabilidade de Ativos de TI  
**Equipe:** Luiz Gabriel de Moraes & Mateus Gomes da Silva  
**Professora:** Denise Ribeiro  

---

## 1. Decisão de Região AWS

- **Região Selecionada:** `us-east-1` (US East - N. Virginia)
- **Justificativa:**
  - Menor custo relativo em comparação com `sa-east-1` (São Paulo).
  - Cobertura completa do AWS Free Tier e suporte a todos os serviços candidatos.
  - Baixa latência aceitável para prototipagem acadêmica e validação.

---

## 2. Serviços Candidatos da AWS

| Serviço AWS | Categoria | Finalidade no TechAssets | Justificativa da Escolha |
| :--- | :--- | :--- | :--- |
| **AWS App Runner / EC2** | Computação | Hospedagem da aplicação Java/Spring Boot. | Instância `t3.micro` elegível para Free Tier (750 horas/mês). |
| **AWS RDS PostgreSQL** | Banco de Dados | Persistência relacional de ativos e históricos. | Instância `db.t3.micro` com 20 GB de armazenamento no Free Tier. |
| **AWS S3** | Armazenamento | Guarda de manuais, notas fiscais e imagens. | Bucket S3 com até 5 GB de armazenamento gratuito. |
| **AWS IAM** | Segurança | Controle de acesso por funções e políticas atreladas. | Garantia do princípio do mínimo privilégio. |
| **AWS CloudWatch** | Observabilidade | Coleta de logs de aplicação e métricas de sistema. | Monitoramento nativo de erros e consumo de recursos. |

---

## 3. Estimativa de Custo e Orçamento

- **Custo Mensal Estimado durante o desenvolvimento:** **$0,00 USD (Free Tier)**.
- **Mecanismos de Controle Financeiro:**
  - Criação de **AWS Budget Alert** configurado para notificar via e-mail caso o gasto exceda **$1,00 USD**.
  - Encerramento de instâncias não utilizadas fora dos horários de teste.

---

## 4. Limitações da Conta Educacional e Alternativa Compatível

- **Limitação Conhecida:** Contas de estudante/educacionais podem ter restrições na criação de VPCs customizadas ou limites rígidos de cota para instâncias RDS.
- **Plano de Contingência (Alternativa Compatível):**
  - Caso a cota de RDS seja excedida, o banco PostgreSQL/MySQL será executado em um container Docker dentro da própria instância EC2 `t3.micro` ou utilizando serviço gerenciado compatível (ex: Render / Supabase) mantendo 100% das APIs Java intactas.
