# Music Bot

Bot de música para Discord feito com as bibliotecas [discord.js](https://github.com/discordjs/discord.js) e [Distube](https://github.com/skick1234/DisTube)

## Features

- Feito com [Slash Commands](https://discordjs.guide/creating-your-bot/slash-commands.html)
- [Filtros](https://distube.js.org/#/docs/DisTube/main/typedef/defaultFilters)
- Comandos para pausar, resumir, pular, visualizar lista de músicas

## Installation
Instalar [Node.js](https://nodejs.org/).
```sh
git clone https://github.com/alvaroragazzi/music-bot.git
cd music-bot
npm install
```
##### Alterar o nome do arquivo .env.example para .env e preencher a variável TOKEN com o token do seu bot.

##### Você também pode alterar a cor das mensagens que o bot envia pela variável EMBED_COLOR, informando uma cor com o valor hexadecimal.

## Rodar o bot
```sh
cd music-bot
node index
```