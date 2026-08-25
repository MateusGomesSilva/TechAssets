# FAEX — Engenharia de Software
## Semana 03 | Laboratório 1 — Mapa de Histórias (User Story Map)

**Projeto:** TechAssets — Gestão de Ativos de TI  
**Equipe:** Luiz Gabriel de Moraes & Mateus Gomes da Silva  

---

## Estrutura da Jornada do Usuário

O Mapa de Histórias organiza visualmente as necessidades dos usuários ao longo dos passos lógicos da jornada de trabalho no **TechAssets**.

```
+-------------------------------------------------------------------------------------------------------+
|                                JORNADA DO USUÁRIO / FLUXO DE ATIVIDADES                               |
+-------------------+--------------------+--------------------+--------------------+--------------------+
| 1. Descoberta     | 2. Cadastro        | 3. Resposta        | 4. Consulta        | 5. Movimentação    |
|    e Acesso       |    do Ativo        |    do Sistema      |    e Filtro        |    e Histórico     |
+-------------------+--------------------+--------------------+--------------------+--------------------+
| US-01 (Navegar)   | US-01 (Preencher)  | US-01 (Confirmar)  | US-02 (Listar)     | US-03 (Transferir) |
| Acesar painel     | Form de cadastro   | Emitir Tag/ID      | Visualizar tabela  | Alterar responsável|
| de gestão         | de equipamento     | e mensagem OK      | de ativos          | do equipamento     |
|                   |                    |                    |                    |                    |
|                   |                    |                    | US-02 (Filtrar)    | US-04 (Manutenção) |
|                   |                    |                    | Filtrar por status | Registrar reparo   |
|                   |                    |                    | ou filial          | técnico            |
+-------------------+--------------------+--------------------+--------------------+--------------------+
```

---

## Detalhamento por Etapa da Jornada

### Etapa 1: Descoberta e Acesso
- **Atividade:** O analista abre o sistema TechAssets para gerenciar equipamentos da empresa.
- **Histórias Relacionadas:** US-01, US-02.

### Etapa 2: Cadastro do Ativo
- **Atividade:** Entrada de dados de um novo hardware recém-adquirido ou recebido.
- **Campos Obrigatórios:** Nome do equipamento, Categoria, Número de Série, Status Inicial, Responsável Inicial, Filial/Setor.
- **Histórias Relacionadas:** US-01.

### Etapa 3: Resposta do Sistema
- **Atividade:** O sistema valida os dados e gera o identificador patrimonial único (Tag).
- **Feedback:** Banner visual de confirmação e resumo do cadastro.
- **Histórias Relacionadas:** US-01.

### Etapa 4: Consulta e Acompanhamento
- **Atividade:** O gestor ou suporte pesquisa ativos em uso ou disponíveis para empréstimo.
- **Ações:** Filtro rápido por status, pesquisa por texto (Nº Série / Nome).
- **Histórias Relacionadas:** US-02.

### Etapa 5: Movimentação e Histórico
- **Atividade:** Atualizar a localização ou o responsável de um equipamento ou enviar para assistência técnica.
- **Ações:** Formulário de transferência, registro de histórico auditável.
- **Histórias Relacionadas:** US-03, US-04.
