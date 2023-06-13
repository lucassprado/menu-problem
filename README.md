## Problema do cozinheiro

### Descrição
O algoritmo criado visa resolver o problema de um cozinheiro que deseja planejar
qual prato será cozinhado em seu restaurante durante k dias. Dado um número n de
pratos, cada prato tem seu valor de custo e de lucro conhecidos, e o objetivo
final é montar um cardápio com os pratos disponíveis que consiga maximizar o
lucro e que o custo dos pratos caiba dentro do orçamento disponível.

### Descrição da implementação utilizando algoritmo guloso
Para resolver o problema, o algoritmo guloso criado segue os seguintes passos:
- Cria um objeto vazio com o formato do cardápio, sendo as chaves do objeto um dia i,
e os valores um prato a ser cozinhado (que possui um nome, custo e lucro);
- Percorre utilizando um `for` sobre os dias que serão planejados;
- Percorre utilizando um `for` sobre os pratos disponíveis;
- A cada iteração dos dias, é iterado sobre todos os pratos e é verificado qual o prato
possui o maior lucro, levando em consideração as regras estabelecidas de que:
  - Se um prato está sendo cozinhado pelo segundo dia consecutivo, seu lucro será de 50%;
  - Se um prato está sendo cozinhado pelo terceiro dia consecutivo, seu lucro será 0;
- Se o lucro do prato da iteração atual for maior que o lucro do prato escolhido
em iterações passadas e seu custo couber no orçamento, é retirado o prato que estava selecionado e
selecionado o prato atual para preencher o dia x do cardápio. E é reduzindo do orçamento restante
o custo do prato selecionado como incrementado a variável de lucro máximo com o valor do lucro do prato.

Ao final da execução, teremos o retorno de um objeto contendo o prato que será cozinhado
em cada dia, e o lucro máximo que esse cardápio oferece.

### Perguntas
- Como esse problema pode ser modelado para o paradigma guloso?
  - R: A modelagem desse problema para o paradigma guloso é através das iterações sobre os pratos
disponíveis, dado um conjunto de pratos, iremos percorrer cada um desses pratos visando encontrar
o prato que possua o maior lucro, porém respeitando as regras estabelecidas para pratos que são
cozinhados em vários dias consecutivamente. Definindo um possível prato candidato a entrar no cardápio,
iremos conseguir verificar se os demais pratos possuem o lucro maior ou não.
- Seu algoritmo guloso apresenta a solução ótima? Por quê?
  - R: O algoritmo implementado apresenta uma solução ótima local, podendo apresentar uma solução ótima
global dependendo da entrada de dados (ordenação dos pratos). Tendo em vista que um algoritmo guloso
não analisa os dados após tomar uma decisão, pode acontecer casos de um prato em algum momento possuir
um lucro maior que outro, mas por existir regras de cozinhar pratos iguais em dias consecutivos, ocorre
a alteração do valor do lucro, o algoritmo pode fazer uma escolha ótima local durante aquela iteração, mas avaliando as demais iterações, ainda seria possível maximizar o lucro caso a ordem de algum
prato fosse trocada.
- Algum algoritmo clássico foi adaptado para resolver o problema, qual foi ele?
  - R: Nenhum algoritmo clássico foi adaptado para resolver o problema.

### Como rodar o projeto
Para rodar o projeto, será necessário ter instalado no computador o `NodeJS` na versão LTS (atualmente a 18.16.0) e o `NPM`, que é instalado junto com a instalação do `NodeJS`.

Com o NPM e o NodeJS instalado, você pode clonar o projeto no seu computador e rodar o comando abaixo na raíz do projeto para instalar as dependências:
`npm install`

Após instalar as dependências basta rodar o projeto utilizando o comando abaixo na raíz do projeto:
`npm run dev`

Após isso, a aplicação estará rodando na porta 3000 do seu ambiente local, bastando acessar o endereço http://localhost:3000 para acessar.
