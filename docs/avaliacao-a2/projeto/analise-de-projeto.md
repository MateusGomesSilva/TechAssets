# Análise de projeto 
## Classes e responsabilidades 
| Classe | Responsabilidade | O que não deve fazer | 
|Asset |Representar a entidade de domínio Ativo de TI: armazenar seus dados (tag, nome, categoria, número de série, responsável, localização, status) e datas de criação/atualização. |Não deve conter regras de validação, lógica de negócio (ex.: checar duplicidade) nem acessar persistência ou interface. | 
| | | | 
## Módulos 
| Módulo | Responsabilidade | Classes ou funções | 
|---|---|---| 
| Interface | Protótipo de telas (wireframe) do sistema, ainda estático e não integrado ao backend. | src/main/resources/static/index.html |
| Aplicação |Orquestrar as regras de negócio e expor as operações do MVP (cadastro, consulta, transferência). Hoje concentrada na própria camada de serviço, sem um controlador/API separado.  | AssetService (registerAsset, findByStatus, findByTag, transferAsset, count) | 
| Domínio |Modelar os conceitos centrais do negócio: o ativo e seus possíveis estados.  |Asset, AssetStatus  | 
| Persistência |Ainda não implementada como camada própria — os dados são mantidos em uma lista em memória. | List<Asset> assets (dentro de AssetService); previsto migrar para MySQL/PostgreSQL | 
## Coesão e acoplamento 
| Elemento | Situação | Evidência | 
|---|---|---| 
| Coesão | Adequado/Atenção/Crítico | AssetService acumula responsabilidades distintas — validação de dados, geração automática da tag patrimonial, busca/filtragem e armazenamento dos ativos — todas na mesma classe (registerAsset, findByStatus, findByTag, transferAsset, count), o que fere o Princípio da Responsabilidade Única. | 
| Acoplamento | Adequado/Atenção/Crítico |Asset e AssetStatus não dependem de nenhuma outra classe do projeto. AssetService depende apenas do pacote model (import com.techassets.model), sem referenciar a interface (index.html) ou qualquer mecanismo de persistência externo — o acoplamento entre as classes existentes é baixo.  | 
## Melhoria 
Problema encontrado: 
Alteração realizada ou proposta: 
Benefício esperado: 
## Decisões técnicas 
| Decisão | Escolha | Justificativa | Consequência | 
|---|---|---|---| 
| Organização da aplicação |Separação em camadas (domínio, serviço/aplicação e interface) e uso de pacotes (model, service, static). |Organização clara e alinhada à arquitetura em camadas, facilitando a manutenção e evolução do código. |Facilidade de adicionar novas funcionalidades e de manter a coesão dentro de cada camada. | 
| Persistência ou integração |Utilização de lista em memória para armazenamento dos ativos; plano de migração para MySQL/PostgreSQL. |A lista em memória é adequada para um MVP, permitindo foco nas regras de negócio. A migração planejada prevê escalabilidade futura. |Permite testes rápidos sem dependência de banco de dados externo, mas impõe limites para grandes volumes de dados ou uso em produção sem persistência real. |    