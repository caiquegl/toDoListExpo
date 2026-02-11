# ToDoList (Expo + TypeScript)

## Como executar

### Requisitos

- Node.js 20
- npm

### Instalação

```bash
npm install
```

### Executar no Android

```bash
npm run android
```

## Arquitetura

O projeto utiliza Expo Router com roteamento por arquivos em src/app e uma arquitetura separada por responsabilidades para manter o código limpo, escalável e com baixa repetição.

### Estrutura principal

- src/app: páginas e rotas
- src/components: componentes de UI reutilizáveis
- src/containers: telas com composição e orquestração
- src/services: regras de acesso a dados e integrações
- src/types: contratos e tipagens
- src/constants: tokens de tema e constantes
- src/hooks: hooks reutilizáveis
- src/assets: imagens e recursos

## Responsabilidades

- Páginas (app): apenas expõem as rotas e renderizam containers
- Containers: coordenam estado, serviços e componentes
- Components: UI pura, sem regras de negócio
- Services: acesso ao storage, notificações e ações de domínio
- Types: contratos de dados e props

## Técnicas usadas

- Expo Router
- TypeScript com tipagem centralizada em src/types
- Componentização e separação de responsabilidades
- Tema centralizado em tokens
- React Hook Form para formulários
- Storage local com AsyncStorage
- Drag and drop com react-native-draggable-flatlist
- Notificações locais com expo-notifications
