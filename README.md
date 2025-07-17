# Weather App

[![TypeScript](https://img.shields.io/badge/TypeScript-88%25-blue?logo=typescript)](https://www.typescriptlang.org/)
[![JavaScript](https://img.shields.io/badge/JavaScript-11%25-yellow?logo=javascript)
](https://developer.mozilla.org/pt-BR/docs/Web/JavaScript)
[![CSS](https://img.shields.io/badge/CSS-1%25-264de4?logo=css3)](https://developer.mozilla.org/pt-BR/docs/Web/CSS)

<img width="3831" height="2159" alt="Screenshot 2025-07-14 211054" src="https://github.com/user-attachments/assets/7457ab9c-3450-4324-8bad-191f1685b422" />


## Sobre o projeto

O **Weather App** é uma aplicação web que permite ao usuário consultar a previsão do tempo em tempo real para qualquer cidade do mundo. O objetivo é entregar uma experiência prática, responsiva e visualmente amigável, especialmente em dispositivos móveis.

### Como funciona

- O usuário digita o nome da cidade desejada.
- O app faz uma requisição para uma API de clima (Weather API, como OpenWeatherMap, por exemplo).
- Os dados retornados são apresentados de forma clara: temperatura, condição do tempo, localização, data e hora.
- A interface é pensada para ser intuitiva e fácil de usar, com visual moderno.

## Uso de APIs de clima

A aplicação utiliza APIs de previsão do tempo, como a [OpenWeatherMap](https://openweathermap.org/api), para buscar dados atualizados de clima. As APIs fornecem informações como:

- Temperatura atual
- Condição do tempo (céu limpo, nublado, chuva etc.)
- Localização (nome da cidade, país)
- Horário local

O consumo da API é feito de forma assíncrona utilizando fetch ou bibliotecas HTTP (como axios), garantindo que a informação seja carregada rapidamente e sem travar a interface.

## Tecnologias e linguagens utilizadas

- **TypeScript (88%)**  
  Usado como linguagem principal para garantir maior segurança no código, melhor autocompletar, e facilitar a manutenção do projeto. TypeScript evita muitos erros comuns de JavaScript, tornando o desenvolvimento mais robusto.
  
- **JavaScript (11%)**  
  Utilizado para scripts auxiliares, integração de bibliotecas e para lidar com partes do projeto que não exigem tipagem estrita.
  
- **CSS (1%)**  
  Responsável pelo visual da aplicação. O CSS garante que o app seja bonito, responsivo e funcione bem em qualquer dispositivo.

### Por que essas tecnologias?

- **TypeScript** foi escolhido para facilitar o crescimento do projeto sem perder controle sobre tipos e estrutura, além de ser muito usado no ecossistema moderno de desenvolvimento web.
- **JavaScript** é essencial para qualquer projeto web, e permite integração fácil com APIs e manipulação dinâmica da interface.
- **CSS** é a base para estilização, permitindo criar interfaces agradáveis e responsivas.

## Principais recursos

- Consulta de cidades em tempo real
- Exibição dos dados de clima de forma amigável
- Visual adaptado para mobile
- Código modular e organizado para facilitar manutenção e evolução

## Como rodar o projeto

1. Clone o repositório:
   ```bash
   git clone https://github.com/eryckassis/weather-app.git
   ```
2. Instale as dependências:
   ```bash
   npm install
   ```
3. Execute o app:
   ```bash
   npm run dev
   ```
4. Acesse pelo navegador: `http://localhost:13001`

## Em desenvolvimento

O projeto ainda está em desenvolvimento! Novos recursos, melhorias visuais e integrações com outras APIs de clima podem ser adicionadas. Sinta-se à vontade para testar, contribuir e sugerir melhorias.

---

Feito para quem gosta de tecnologia, clima e código de qualidade! 🌦️
