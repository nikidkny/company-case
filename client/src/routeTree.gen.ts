/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from '@tanstack/react-router'

// Import Routes

import { Route as rootRoute } from './routes/__root'

// Create Virtual Routes

const AssetsLazyImport = createFileRoute('/assets')()
const AccountsLazyImport = createFileRoute('/accounts')()
const IndexLazyImport = createFileRoute('/')()
const PostsIndexLazyImport = createFileRoute('/posts/')()
const EnsemblesIndexLazyImport = createFileRoute('/ensembles/')()
const AccountsIndexLazyImport = createFileRoute('/accounts/')()
const ProfileProfileIdLazyImport = createFileRoute('/profile/$profileId')()
const PostsCreateLazyImport = createFileRoute('/posts/create')()
const PostsPostIdLazyImport = createFileRoute('/posts/$postId')()
const EnsemblesCreateLazyImport = createFileRoute('/ensembles/create')()
const EnsemblesEnsemblesIdLazyImport = createFileRoute(
  '/ensembles/$ensemblesId',
)()

// Create/Update Routes

const AssetsLazyRoute = AssetsLazyImport.update({
  id: '/assets',
  path: '/assets',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/assets.lazy').then((d) => d.Route))

const AccountsLazyRoute = AccountsLazyImport.update({
  id: '/accounts',
  path: '/accounts',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/accounts.lazy').then((d) => d.Route))

const IndexLazyRoute = IndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/index.lazy').then((d) => d.Route))

const PostsIndexLazyRoute = PostsIndexLazyImport.update({
  id: '/posts/',
  path: '/posts/',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/posts/index.lazy').then((d) => d.Route))

const EnsemblesIndexLazyRoute = EnsemblesIndexLazyImport.update({
  id: '/ensembles/',
  path: '/ensembles/',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/ensembles/index.lazy').then((d) => d.Route),
)

const AccountsIndexLazyRoute = AccountsIndexLazyImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => AccountsLazyRoute,
} as any).lazy(() =>
  import('./routes/accounts.index.lazy').then((d) => d.Route),
)

const ProfileProfileIdLazyRoute = ProfileProfileIdLazyImport.update({
  id: '/profile/$profileId',
  path: '/profile/$profileId',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/profile.$profileId.lazy').then((d) => d.Route),
)

const PostsCreateLazyRoute = PostsCreateLazyImport.update({
  id: '/posts/create',
  path: '/posts/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/posts/create.lazy').then((d) => d.Route))

const PostsPostIdLazyRoute = PostsPostIdLazyImport.update({
  id: '/posts/$postId',
  path: '/posts/$postId',
  getParentRoute: () => rootRoute,
} as any).lazy(() => import('./routes/posts/$postId.lazy').then((d) => d.Route))

const EnsemblesCreateLazyRoute = EnsemblesCreateLazyImport.update({
  id: '/ensembles/create',
  path: '/ensembles/create',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/ensembles/create.lazy').then((d) => d.Route),
)

const EnsemblesEnsemblesIdLazyRoute = EnsemblesEnsemblesIdLazyImport.update({
  id: '/ensembles/$ensemblesId',
  path: '/ensembles/$ensemblesId',
  getParentRoute: () => rootRoute,
} as any).lazy(() =>
  import('./routes/ensembles/$ensemblesId.lazy').then((d) => d.Route),
)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/accounts': {
      id: '/accounts'
      path: '/accounts'
      fullPath: '/accounts'
      preLoaderRoute: typeof AccountsLazyImport
      parentRoute: typeof rootRoute
    }
    '/assets': {
      id: '/assets'
      path: '/assets'
      fullPath: '/assets'
      preLoaderRoute: typeof AssetsLazyImport
      parentRoute: typeof rootRoute
    }
    '/ensembles/$ensemblesId': {
      id: '/ensembles/$ensemblesId'
      path: '/ensembles/$ensemblesId'
      fullPath: '/ensembles/$ensemblesId'
      preLoaderRoute: typeof EnsemblesEnsemblesIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/ensembles/create': {
      id: '/ensembles/create'
      path: '/ensembles/create'
      fullPath: '/ensembles/create'
      preLoaderRoute: typeof EnsemblesCreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/posts/$postId': {
      id: '/posts/$postId'
      path: '/posts/$postId'
      fullPath: '/posts/$postId'
      preLoaderRoute: typeof PostsPostIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/posts/create': {
      id: '/posts/create'
      path: '/posts/create'
      fullPath: '/posts/create'
      preLoaderRoute: typeof PostsCreateLazyImport
      parentRoute: typeof rootRoute
    }
    '/profile/$profileId': {
      id: '/profile/$profileId'
      path: '/profile/$profileId'
      fullPath: '/profile/$profileId'
      preLoaderRoute: typeof ProfileProfileIdLazyImport
      parentRoute: typeof rootRoute
    }
    '/accounts/': {
      id: '/accounts/'
      path: '/'
      fullPath: '/accounts/'
      preLoaderRoute: typeof AccountsIndexLazyImport
      parentRoute: typeof AccountsLazyImport
    }
    '/ensembles/': {
      id: '/ensembles/'
      path: '/ensembles'
      fullPath: '/ensembles'
      preLoaderRoute: typeof EnsemblesIndexLazyImport
      parentRoute: typeof rootRoute
    }
    '/posts/': {
      id: '/posts/'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof PostsIndexLazyImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

interface AccountsLazyRouteChildren {
  AccountsIndexLazyRoute: typeof AccountsIndexLazyRoute
}

const AccountsLazyRouteChildren: AccountsLazyRouteChildren = {
  AccountsIndexLazyRoute: AccountsIndexLazyRoute,
}

const AccountsLazyRouteWithChildren = AccountsLazyRoute._addFileChildren(
  AccountsLazyRouteChildren,
)

export interface FileRoutesByFullPath {
  '/': typeof IndexLazyRoute
  '/accounts': typeof AccountsLazyRouteWithChildren
  '/assets': typeof AssetsLazyRoute
  '/ensembles/$ensemblesId': typeof EnsemblesEnsemblesIdLazyRoute
  '/ensembles/create': typeof EnsemblesCreateLazyRoute
  '/posts/$postId': typeof PostsPostIdLazyRoute
  '/posts/create': typeof PostsCreateLazyRoute
  '/profile/$profileId': typeof ProfileProfileIdLazyRoute
  '/accounts/': typeof AccountsIndexLazyRoute
  '/ensembles': typeof EnsemblesIndexLazyRoute
  '/posts': typeof PostsIndexLazyRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexLazyRoute
  '/assets': typeof AssetsLazyRoute
  '/ensembles/$ensemblesId': typeof EnsemblesEnsemblesIdLazyRoute
  '/ensembles/create': typeof EnsemblesCreateLazyRoute
  '/posts/$postId': typeof PostsPostIdLazyRoute
  '/posts/create': typeof PostsCreateLazyRoute
  '/profile/$profileId': typeof ProfileProfileIdLazyRoute
  '/accounts': typeof AccountsIndexLazyRoute
  '/ensembles': typeof EnsemblesIndexLazyRoute
  '/posts': typeof PostsIndexLazyRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexLazyRoute
  '/accounts': typeof AccountsLazyRouteWithChildren
  '/assets': typeof AssetsLazyRoute
  '/ensembles/$ensemblesId': typeof EnsemblesEnsemblesIdLazyRoute
  '/ensembles/create': typeof EnsemblesCreateLazyRoute
  '/posts/$postId': typeof PostsPostIdLazyRoute
  '/posts/create': typeof PostsCreateLazyRoute
  '/profile/$profileId': typeof ProfileProfileIdLazyRoute
  '/accounts/': typeof AccountsIndexLazyRoute
  '/ensembles/': typeof EnsemblesIndexLazyRoute
  '/posts/': typeof PostsIndexLazyRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/accounts'
    | '/assets'
    | '/ensembles/$ensemblesId'
    | '/ensembles/create'
    | '/posts/$postId'
    | '/posts/create'
    | '/profile/$profileId'
    | '/accounts/'
    | '/ensembles'
    | '/posts'
  fileRoutesByTo: FileRoutesByTo
  to:
    | '/'
    | '/assets'
    | '/ensembles/$ensemblesId'
    | '/ensembles/create'
    | '/posts/$postId'
    | '/posts/create'
    | '/profile/$profileId'
    | '/accounts'
    | '/ensembles'
    | '/posts'
  id:
    | '__root__'
    | '/'
    | '/accounts'
    | '/assets'
    | '/ensembles/$ensemblesId'
    | '/ensembles/create'
    | '/posts/$postId'
    | '/posts/create'
    | '/profile/$profileId'
    | '/accounts/'
    | '/ensembles/'
    | '/posts/'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute
  AccountsLazyRoute: typeof AccountsLazyRouteWithChildren
  AssetsLazyRoute: typeof AssetsLazyRoute
  EnsemblesEnsemblesIdLazyRoute: typeof EnsemblesEnsemblesIdLazyRoute
  EnsemblesCreateLazyRoute: typeof EnsemblesCreateLazyRoute
  PostsPostIdLazyRoute: typeof PostsPostIdLazyRoute
  PostsCreateLazyRoute: typeof PostsCreateLazyRoute
  ProfileProfileIdLazyRoute: typeof ProfileProfileIdLazyRoute
  EnsemblesIndexLazyRoute: typeof EnsemblesIndexLazyRoute
  PostsIndexLazyRoute: typeof PostsIndexLazyRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AccountsLazyRoute: AccountsLazyRouteWithChildren,
  AssetsLazyRoute: AssetsLazyRoute,
  EnsemblesEnsemblesIdLazyRoute: EnsemblesEnsemblesIdLazyRoute,
  EnsemblesCreateLazyRoute: EnsemblesCreateLazyRoute,
  PostsPostIdLazyRoute: PostsPostIdLazyRoute,
  PostsCreateLazyRoute: PostsCreateLazyRoute,
  ProfileProfileIdLazyRoute: ProfileProfileIdLazyRoute,
  EnsemblesIndexLazyRoute: EnsemblesIndexLazyRoute,
  PostsIndexLazyRoute: PostsIndexLazyRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/accounts",
        "/assets",
        "/ensembles/$ensemblesId",
        "/ensembles/create",
        "/posts/$postId",
        "/posts/create",
        "/profile/$profileId",
        "/ensembles/",
        "/posts/"
      ]
    },
    "/": {
      "filePath": "index.lazy.tsx"
    },
    "/accounts": {
      "filePath": "accounts.lazy.tsx",
      "children": [
        "/accounts/"
      ]
    },
    "/assets": {
      "filePath": "assets.lazy.tsx"
    },
    "/ensembles/$ensemblesId": {
      "filePath": "ensembles/$ensemblesId.lazy.tsx"
    },
    "/ensembles/create": {
      "filePath": "ensembles/create.lazy.tsx"
    },
    "/posts/$postId": {
      "filePath": "posts/$postId.lazy.tsx"
    },
    "/posts/create": {
      "filePath": "posts/create.lazy.tsx"
    },
    "/profile/$profileId": {
      "filePath": "profile.$profileId.lazy.tsx"
    },
    "/accounts/": {
      "filePath": "accounts.index.lazy.tsx",
      "parent": "/accounts"
    },
    "/ensembles/": {
      "filePath": "ensembles/index.lazy.tsx"
    },
    "/posts/": {
      "filePath": "posts/index.lazy.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
