TechAssets

1. Sobre o projeto

O TechAssets é um sistema web desenvolvido para auxiliar no gerenciamento e controle de equipamentos de uma organização.

O sistema centraliza informações dos ativos, permitindo consultar equipamentos, visualizar seus detalhes, cadastrar novos ativos e acompanhar informações como responsável, localização, estado e histórico de alterações.

2. Problema

O controle de equipamentos pode se tornar difícil quando as informações de patrimônio, responsável, localização e estado estão dispersas ou desatualizadas.

O TechAssets busca centralizar essas informações em uma única aplicação, facilitando a consulta e o acompanhamento dos ativos.

3. Objetivo

Desenvolver um MVP capaz de realizar o gerenciamento básico de equipamentos, permitindo:

* cadastrar ativos;
* consultar equipamentos;
* visualizar detalhes;
* pesquisar equipamentos;
* filtrar por categoria e estado;
* atualizar responsável;
* atualizar localização;
* atualizar estado;
* registrar alterações no histórico.

4. Usuários

Usuário comum

Pode:

* acessar o sistema;
* consultar equipamentos;
* visualizar detalhes;
* pesquisar equipamentos;
* utilizar filtros.

Usuário autorizado

Além das funções do usuário comum, pode:

* cadastrar ativos;
* alterar responsável;
* alterar localização;
* alterar estado;
* registrar movimentações.

5. Jornada principal do MVP

A jornada utilizada para a análise do projeto é:

Login → Página inicial → Consultar equipamentos → Selecionar equipamento → Visualizar detalhes → Alterar responsável/localização → Alterar estado → Consultar histórico.

Essa jornada representa o fluxo principal de gerenciamento de um ativo dentro do sistema.

6. Principais funcionalidades

US-01 — Consultar equipamentos

Permitir que o usuário visualize os equipamentos cadastrados, organizados por categoria e estado.

US-02 — Visualizar detalhes

Permitir que o usuário visualize informações completas de um equipamento.

US-03 — Cadastrar ativo

Permitir que usuários autorizados cadastrem novos equipamentos.

US-04 — Atualizar responsável/localização

Permitir a alteração do responsável e da localização de um equipamento, registrando a movimentação.

US-05 — Atualizar estado

Permitir a alteração do estado atual do equipamento e registrar a alteração no histórico.

US-06 — Pesquisar equipamentos

Permitir localizar equipamentos por nome, modelo ou identificação patrimonial.

US-07 — Filtrar equipamentos

Permitir filtrar os equipamentos por categoria e estado.

7. Regras principais

* Todo equipamento deve possuir identificação, modelo, categoria e estado.
* A identificação patrimonial deve ser única.
* Somente usuários autorizados podem alterar informações administrativas.
* Alterações de responsável e localização devem ser registradas.
* Alterações de estado devem ser registradas.
* O equipamento deve possuir um responsável e uma localização atuais quando essas informações estiverem cadastradas.

8. Arquitetura inicial

O projeto será organizado em camadas:

Interface → Controller → Service → Repository → Banco de dados

A camada de interface será responsável pela interação com o usuário.

Os Controllers receberão as requisições.

Os Services concentrarão as regras de negócio.

Os Repositories serão responsáveis pelo acesso aos dados.

O banco armazenará usuários, equipamentos, categorias e históricos.

9. Modelagem

A modelagem do projeto será organizada em quatro páginas:

1. Diagrama de casos de uso;
2. Diagrama de classes;
3. Análise de responsabilidades e relacionamentos;
4. Diagrama de arquitetura.

10. Tecnologias

As tecnologias utilizadas devem seguir as definidas pela equipe na implementação do projeto.

11. Integrantes e responsabilidades

Integrante 1 — Luiz Gabriel

Responsabilidades:

* modelagem do sistema;
* análise das responsabilidades das classes;
* contribuição na definição da arquitetura;
* implementação/revisão das funcionalidades relacionadas aos ativos;
* revisão técnica.

Integrante 2 — Matheus Gomes da Silva

Responsabilidades:

* [RESPONSABILIDADE REAL];
* [CONTRIBUIÇÃO REAL];
* [IMPLEMENTAÇÃO REAL];
* revisão técnica.

12. Rastreabilidade

As funcionalidades do projeto serão relacionadas às histórias de usuário, critérios de aceitação, implementação e evidências registradas no GitHub.

A rastreabilidade será utilizada para demonstrar a relação entre o problema identificado, os requisitos, a modelagem e a implementação.
