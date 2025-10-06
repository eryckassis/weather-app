# Weather App

Documentação completa e didática do aplicativo de consulta de clima em tempo real, com foco em uso prático, tecnologias adotadas, arquitetura, decisões de engenharia, tratamento de erros e diretrizes de código limpo.

## Visão geral

O Weather App permite buscar as condições atuais de clima por cidade, exibindo temperatura, descrição do tempo e informações complementares. A interface prioriza simplicidade, leitura e resposta rápida.

- Entrada: nome da cidade digitado pelo usuário na barra de pesquisa.
- Processamento: chamada à API pública do OpenWeatherMap com linguagem pt-BR e unidade métrica.
- Saída: renderização de dados principais (temperatura, descrição, localização) com feedbacks de carregamento e de erro.

## Tecnologias e bibliotecas

- Next.js 15 (React 19) — base do aplicativo, roteamento e Dev Server.
- React 19 — componentes funcionais, hooks e memoização.
- TypeScript — tipagem estática e maior segurança de evolução.
- Jest + Testing Library — base para testes unitários e de componentes (estrutura configurada no projeto).
- CSS (Global) — estilos globais em `src/styles/globals.css`.

Dependências principais (ver `weather-app/package.json`):

- `next`, `react`, `react-dom`
- Ferramentas de desenvolvimento: `typescript`, `jest`, `@testing-library/*`, `eslint`, `prettier`

## Arquitetura e organização

Estrutura relevante:

- `src/pages/index.tsx`: página principal; controla estado de busca, carrega dados e renderiza a UI.
- `src/components/SearchBar.tsx`: componente controlado de entrada e submissão da pesquisa.
- `src/services/weatherApi.ts`: integração com a API do OpenWeatherMap.
- `src/styles/globals.css`: estilos globais do app.
- `tests/`: diretório reservado a testes (arquivos já criados, a serem preenchidos).

Fluxo resumido:

1. O usuário digita uma cidade na `SearchBar` e envia o formulário.
2. A página principal atualiza o estado de cidade, dispara a busca assíncrona e exibe estados de carregamento/erro.
3. Com a resposta bem-sucedida, os dados são renderizados na tela.

## Uso da API de clima (OpenWeatherMap)

A integração está em `src/services/weatherApi.ts`.

- Endpoint: `https://api.openweathermap.org/data/2.5/weather`
- Parâmetros utilizados:
  - `q`: nome da cidade (codificado via `encodeURIComponent`).
  - `appid`: chave de API obtida no OpenWeatherMap.
  - `units=metric`: retorno em Celsius.
  - `lang=pt_br`: descrições em português do Brasil.
- Variável de ambiente: `NEXT_PUBLIC_OPENWEATHER_API_KEY` (exposta no cliente porque a chamada é feita no browser).

Contrato de retorno (simplificado, conforme uso em `index.tsx`):

- `name`: nome da cidade.
- `sys.country` e `sys.state?`: país e estado (quando disponível).
- `main.temp`: temperatura atual em °C.
- `weather[0].description`: descrição textual do clima.
- `sys.sunrise` e `sys.sunset`: horários em UNIX timestamp (segundos).

Erros da API: respostas com `response.ok === false` resultam em `throw new Error("Erro ao buscar dados do clima")`, tratadas na página para mostrar uma mensagem clara ao usuário.

## Tratamento de erros e estados da UI

Na página `index.tsx`:

- `loading`: controla o estado de carregamento enquanto a requisição ocorre.
- `error`: armazena mensagens quando a busca falha (por exemplo, cidade inválida ou problema de rede).
- Feedbacks visuais: mensagens “Carregando localização...” e exibição de erro em destaque.

Boas práticas aplicadas:

- Evitar submissão vazia: `if (!search.trim()) return;` impede requisições inúteis.
- Sanitização simples: `trim()` e `encodeURIComponent` na construção da URL.
- Mensagens consistentes de erro: uma única origem de erro no serviço e tratamento na página.

## Refatoração: Clean Code e SOLID

Após meses, o código foi revisitado com foco em legibilidade, manutenção e clareza de responsabilidades.

Objetivos da refatoração:

- Separação de responsabilidades (SRP):
  - Componente `SearchBar` cuida apenas de input e submissão.
  - Serviço `weatherApi` centraliza acesso à API e mensagens de erro.
  - Página `index.tsx` orquestra estados e renderização.
- Nomeação explícita e coesa: estados como `city`, `search`, `loading` e `error` com papéis definidos.
- Contratos mínimos e tipagem: `WeatherData` tipa o essencial utilizado na UI, reduzindo acoplamento ao payload completo.
- Previsibilidade de fluxos: carregamento, sucesso, erro e limpeza do campo de busca.

Problemas endereçados pela refatoração:

- Acoplamento entre UI e chamada à API: removido ao mover a integração para `src/services/weatherApi.ts`.
- Repetição de lógica de estados: unificado no efeito que depende de `city`.
- Falta de mensagens de erro consistentes: padronizadas no serviço e propagadas para a interface.
- Dificuldade de leitura: nomes e funções pequenos, com uma única responsabilidade.

Por que Clean Code mantém o software manutenível:

- Facilita evolução incremental sem efeitos colaterais inesperados.
- Reduz custo cognitivo para novos contribuidores e para você no futuro.
- Ajuda a isolar mudanças (por exemplo, troca de API ou ajuste de layout) com impacto limitado.

Relação com SOLID (pragmática):

- SRP: componentes/serviços com foco único.
- OCP: a página consome o serviço via função; trocar a implementação preserva a interface pública.
- DIP (na medida do necessário): a UI depende de uma abstração simples (`getWeatherByCity`), e não do detalhe de `fetch`.

## Como executar localmente

Pré-requisitos:

- Node.js LTS e npm instalados.
- Chave da API do OpenWeatherMap.

Passos:

1. Clonar o repositório.
2. Instalar dependências.
3. Definir a variável de ambiente `NEXT_PUBLIC_OPENWEATHER_API_KEY`.
4. Iniciar o servidor de desenvolvimento.

Exemplo de execução:

```bash
git clone https://github.com/eryckassis/weather-app.git
cd weather-app/weather-app
npm install

# Defina a variável de ambiente (Windows PowerShell)
$env:NEXT_PUBLIC_OPENWEATHER_API_KEY="SUA_CHAVE_AQUI"

# Em bash (Git Bash/WSL)
export NEXT_PUBLIC_OPENWEATHER_API_KEY="SUA_CHAVE_AQUI"

npm run dev
```

Por padrão, o Next.js expõe a aplicação em `http://localhost:3000` (caso você tenha alterado a porta, ajuste conforme necessário).

## Testes

A suíte de testes está preparada com Jest e Testing Library. Arquivos de teste já existem em `tests/`, prontos para implementação. Para rodar:

```bash
npm test
```

Sugestões de casos:

- `SearchBar`: digitação e submissão disparam `onSubmit` com valor preenchido.
- `weatherApi`: simular `fetch` bem-sucedido e com erro (status 404/500).
- Página `index`: renderiza estados de carregamento, erro e sucesso.

## Padrões de código e qualidade

- TypeScript em modo `strict` (ver `tsconfig.json`).
- ESLint e Prettier presentes nas dependências (recomenda-se configurar scripts para lint e format).
- `reactStrictMode` habilitado no `next.config.js`.

Este documento foi escrito com foco em clareza e manutenção a longo prazo.
