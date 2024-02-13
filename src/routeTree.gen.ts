// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as TestImport } from './routes/test'
import { Route as IndexImport } from './routes/index'
import { Route as GameStartImport } from './routes/game.start'
import { Route as GamePromptsImport } from './routes/game.prompts'
import { Route as GameLobbyImport } from './routes/game.lobby'
import { Route as GameCodeImport } from './routes/game.$code'

// Create/Update Routes

const TestRoute = TestImport.update({
  path: '/test',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

const GameStartRoute = GameStartImport.update({
  path: '/game/start',
  getParentRoute: () => rootRoute,
} as any)

const GamePromptsRoute = GamePromptsImport.update({
  path: '/game/prompts',
  getParentRoute: () => rootRoute,
} as any)

const GameLobbyRoute = GameLobbyImport.update({
  path: '/game/lobby',
  getParentRoute: () => rootRoute,
} as any)

const GameCodeRoute = GameCodeImport.update({
  path: '/game/$code',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/test': {
      preLoaderRoute: typeof TestImport
      parentRoute: typeof rootRoute
    }
    '/game/$code': {
      preLoaderRoute: typeof GameCodeImport
      parentRoute: typeof rootRoute
    }
    '/game/lobby': {
      preLoaderRoute: typeof GameLobbyImport
      parentRoute: typeof rootRoute
    }
    '/game/prompts': {
      preLoaderRoute: typeof GamePromptsImport
      parentRoute: typeof rootRoute
    }
    '/game/start': {
      preLoaderRoute: typeof GameStartImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  IndexRoute,
  TestRoute,
  GameCodeRoute,
  GameLobbyRoute,
  GamePromptsRoute,
  GameStartRoute,
])
