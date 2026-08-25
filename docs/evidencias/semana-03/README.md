# FAEX — Engenharia de Software
## Semana 03 — Índice de Evidências Oficiais (E03)

**Projeto:** TechAssets — Sistema para Gestão e Rastreabilidade de Ativos de TI  
**Repositório:** [MateusGomesSilva/TechAssets](https://github.com/MateusGomesSilva/TechAssets)  
**Equipe:** Luiz Gabriel de Moraes & Mateus Gomes da Silva  
**Professora:** Denise Ribeiro  
**Data:** 24/08/2026  

---

## 1. Tabela Unificada de Evidências (Laboratórios 1, 2 e 3)

| Elemento de Evidência | Tipo / Recurso | Link Direto / Caminho | Status de Verificação |
| :--- | :--- | :--- | :---: |
| **Tarefa GitHub (Issue)** | GitHub Issue | [#1 — E03-LAB1: Backlog e Priorização](https://github.com/MateusGomesSilva/TechAssets/issues/1) | [x] Concluído |
| **Projeto GitHub (Board)** | GitHub Project | [TechAssets Project Board](https://github.com/users/MateusGomesSilva/projects/1) | [x] Ativo |
| **Backlog Priorizado** | Documento Markdown | [backlog_priorizado.md](../../semana-03/backlog_priorizado.md) | [x] Aprovado |
| **Mapa de Histórias** | User Story Map | [mapa_de_historias.md](../../semana-03/mapa_de_historias.md) | [x] Aprovado |
| **Protótipo de Baixa Fidelidade** | Wireframes e Jornada | [prototipo.md](../../semana-03/prototipo.md) | [x] Validado |
| **Protótipo Interativo HTML** | Executável Web | [src/main/resources/static/index.html](../../../src/main/resources/static/index.html) | [x] Testado |
| **Solicitação de Integração (PR)** | Pull Request | [#3 — Pull Request E03: Backlog, Protótipo e Scaffold CI](https://github.com/MateusGomesSilva/TechAssets/pull/3) | [x] Revisado |
| **Revisão do Colega** | PR Review | Comentário registrado por Luiz Gabriel de Moraes no PR #3 | [x] Aprovado |
| **Workflow de CI** | GitHub Actions YAML | [.github/workflows/ci.yml](../../../.github/workflows/ci.yml) | [x] Sucesso (Green) |
| **Documentação Principal** | README do Projeto | [README.md](../../../README.md) | [x] Atualizado |
| **Código Fonte do Scaffold** | Java / Spring Boot | [src/main/java/com/techassets/](../../../src/main/java/) | [x] Compilando |
| **Suíte de Testes Automatizados** | JUnit 5 Tests | [src/test/java/com/techassets/AssetServiceTest.java](../../../src/test/java/com/techassets/AssetServiceTest.java) | [x] 100% Passando |

---

## 2. Instruções de Verificação e Execução Local

### Verificação dos Testes Automatizados (Java / Maven)
Para rodar a suíte de testes unitários localmente:
```bash
# Execução via Maven wrapper ou Maven instalado
mvn test

# Ou via compilação direta com Java 21+
javac -d target/classes src/main/java/com/techassets/model/*.java src/main/java/com/techassets/service/*.java src/test/java/com/techassets/TestRunner.java
java -ea -cp target/classes com.techassets.TestRunner
```

### Execução do Protótipo Interativo de Baixa Fidelidade
Para abrir o protótipo funcional no navegador:
1. Abra o arquivo `src/main/resources/static/index.html` diretamente em qualquer navegador web.
2. Ou execute o servidor web embutido do Python/Java:
   ```bash
   python -m http.server 8000 --directory src/main/resources/static
   ```
3. Acesse `http://localhost:8000` no navegador.

---

## 3. Checklist Geral de Conclusão da Entrega E03

- [x] O backlog contém objetivo em uma frase, histórias no padrão usuário/ação/valor e critérios de aceitação.
- [x] O corte de escopo explicita o que entra e o que fica fora da primeira iteração.
- [x] O protótipo visual cobre a jornada de 5 telas associadas a US-01, US-02 e US-03.
- [x] O registro de revisão por pares do colega foi incluído nos documentos do protótipo e backlog.
- [x] A estrutura de código (scaffold) inicia e compila localmente sem erros.
- [x] Existe suíte de testes automatizada reproduzível com resultado positivo.
- [x] O arquivo `.gitignore` foi criado e impede versionamento de temporários e binários.
- [x] O arquivo `.github/workflows/ci.yml` está configurado para execução contínua no GitHub Actions.
