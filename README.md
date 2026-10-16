# Sistema Paranoia — Edição Perfeita (Português do Brasil)

![Foundry v11](https://img.shields.io/badge/foundry-v11-green)
![Foundry v12](https://img.shields.io/badge/foundry-v12-green)
![Foundry v13](https://img.shields.io/badge/foundry-v13-green)
![Foundry v14](https://img.shields.io/badge/foundry-v14-green)

Tradução brasileira e atualização para o Foundry Virtual Tabletop do sistema [Paranoia: Perfect Edition](https://www.kickstarter.com/projects/1990654819/paranoia-rpg-the-perfect-edition).

Esta versão mantém a base da versão `0.10.0` do projeto original e adiciona a tradução da interface, das fichas, das mensagens, dos estados e dos textos padrão para português do Brasil.

## Compatibilidade

- Versão do sistema: `0.10.0-ptbr`
- Foundry VTT mínimo: v11
- Foundry VTT verificado: v14
- Foundry VTT máximo: v14
- Idioma: Português (Brasil), código `pt-BR`

## Funcionalidades

### Ficha de personagem

Atualmente, esta é a principal funcionalidade implementada de Paranoia: Edição Perfeita. Os jogadores podem participar da criação do personagem, acompanhar a missão atual e registrar seus segredos.

![Primeira aba da ficha de Paranoia: Edição Perfeita, com as informações pessoais permanentes e o Perfil Produtivo, que apresenta perícias, atributos e o rolador de dados.](https://cacheblasters.nyc3.cdn.digitaloceanspaces.com/paranoiavtt/ppevtt-cs1.webp)
![Segunda aba da ficha de Paranoia: Edição Perfeita, com as informações de bem-estar, ferimentos, percepção do Amigo Computador, XP e Moxie.](https://cacheblasters.nyc3.cdn.digitaloceanspaces.com/paranoiavtt/ppevtt-cs2.webp)
![Terceira aba da ficha de Paranoia: Edição Perfeita, com o papel na sociedade, objetivos da missão e equipamentos designados.](https://cacheblasters.nyc3.cdn.digitaloceanspaces.com/paranoiavtt/ppevtt-cs3.webp)
![Quarta aba da ficha de Paranoia: Edição Perfeita, que permite definir a imagem do personagem.](https://cacheblasters.nyc3.cdn.digitaloceanspaces.com/paranoiavtt/ppevtt-cs4.webp)
![Verso da ficha, a aba proibida, com informações secretas e potencialmente traidoras: aliases, sociedades secretas, objetivos secretos, poderes mutantes, contrabando e evidências contra outros jogadores.](https://cacheblasters.nyc3.cdn.digitaloceanspaces.com/paranoiavtt/ppevtt-cs5.webp)

### Rolador de dados

O rolador permite selecionar a combinação de atributo e perícia, indicar o nível do equipamento utilizado e escolher se o personagem aceitará uma penalidade de NÓ para aumentar sua ordem de iniciativa na rodada.

Os dados do Computador são rolados separadamente “pelo” Amigo Computador, facilitando o acompanhamento dos resultados.

![Exemplo das mensagens geradas quando um jogador usa o Rolador de Dados de Autorização Infravermelha.](https://cacheblasters.nyc3.cdn.digitaloceanspaces.com/paranoiavtt/ppevtt-dice.png)

### Fichas de NPC

![Ficha de Ninguém, que permite ao Mestre acompanhar aparência, peculiaridades e planos dos NPCs Ninguém.](https://cacheblasters.nyc3.cdn.digitaloceanspaces.com/paranoiavtt/ppevtt-nobody.webp)
![Ficha de Alguém, que permite ao Mestre acompanhar aparência, peculiaridades, planos, equipamentos, grupo de serviço, sociedade secreta e uma frase dos NPCs Alguém.](https://cacheblasters.nyc3.cdn.digitaloceanspaces.com/paranoiavtt/ppevtt-somebody.webp)
![Ficha de Cúmplice, que permite ao Mestre acompanhar aparência, peculiaridades, planos, equipamentos, grupo de serviço, sociedade secreta, saúde, Moxie, poderes mutantes e uma frase dos NPCs Cúmplice.](https://cacheblasters.nyc3.cdn.digitaloceanspaces.com/paranoiavtt/ppevtt-accomplice.webp)

### Ferramentas do Mestre

- Centro de Comando do Mestre para acompanhar os personagens dos jogadores.
- Sorteio colaborativo de perícias durante a criação dos personagens.
- Arquiteto do Círculo de Traição para distribuir segredos individualmente.
- Tradução dos estados de saúde, níveis de traição, mensagens de rolagem e textos padrão.

## Desenvolvimento com Dev Container

O contêiner de desenvolvimento deste repositório exige uma URL temporária para a versão do Foundry VTT contra a qual você deseja desenvolver.

O contêiner inicia um ambiente com Node.js para o desenvolvimento e monta o mesmo espaço de trabalho no contêiner que executa o Foundry VTT. Assim, as alterações podem ser testadas diretamente na instância do Foundry disponível em <http://localhost:30000>.

## Créditos

Sistema original: [OtherwiseJunk/ParanoiaPerfectEditionSystem-foundryvtt](https://github.com/OtherwiseJunk/ParanoiaPerfectEditionSystem-foundryvtt).

Tradução e compatibilidade com Foundry v14: comunidade brasileira de Paranoia.
