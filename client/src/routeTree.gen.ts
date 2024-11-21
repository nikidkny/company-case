/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

import { createFileRoute } from "@tanstack/react-router";

// Import Routes

import { Route as rootRoute } from "./routes/__root";

// Create Virtual Routes

const PostsLazyImport = createFileRoute("/posts")();
const EnsemblesLazyImport = createFileRoute("/ensembles")();
const AssetsLazyImport = createFileRoute("/assets")();
const AccountsLazyImport = createFileRoute("/accounts")();
const IndexLazyImport = createFileRoute("/")();
const PostsIndexLazyImport = createFileRoute("/posts/")();
const EnsemblesIndexLazyImport = createFileRoute("/ensembles/")();
const AccountsIndexLazyImport = createFileRoute("/accounts/")();
const ProfileProfileIdLazyImport = createFileRoute("/profile/$profileId")();
const PostsPostIdLazyImport = createFileRoute("/posts/$postId")();
const EnsemblesEnsembleIdLazyImport = createFileRoute("/ensembles/$ensembleId")();

// Create/Update Routes

const PostsLazyRoute = PostsLazyImport.update({
  id: "/posts",
  path: "/posts",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/posts.lazy").then((d) => d.Route));

const EnsemblesLazyRoute = EnsemblesLazyImport.update({
  id: "/ensembles",
  path: "/ensembles",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/ensembles.lazy").then((d) => d.Route));

const AssetsLazyRoute = AssetsLazyImport.update({
  id: "/assets",
  path: "/assets",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/assets.lazy").then((d) => d.Route));

const AccountsLazyRoute = AccountsLazyImport.update({
  id: "/accounts",
  path: "/accounts",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/accounts.lazy").then((d) => d.Route));

const IndexLazyRoute = IndexLazyImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/index.lazy").then((d) => d.Route));

const PostsIndexLazyRoute = PostsIndexLazyImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => PostsLazyRoute,
} as any).lazy(() => import("./routes/posts.index.lazy").then((d) => d.Route));

const EnsemblesIndexLazyRoute = EnsemblesIndexLazyImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => EnsemblesLazyRoute,
} as any).lazy(() => import("./routes/ensembles.index.lazy").then((d) => d.Route));

const AccountsIndexLazyRoute = AccountsIndexLazyImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => AccountsLazyRoute,
} as any).lazy(() => import("./routes/accounts.index.lazy").then((d) => d.Route));

const ProfileProfileIdLazyRoute = ProfileProfileIdLazyImport.update({
  id: "/profile/$profileId",
  path: "/profile/$profileId",
  getParentRoute: () => rootRoute,
} as any).lazy(() => import("./routes/profile.$profileId.lazy").then((d) => d.Route));

const PostsPostIdLazyRoute = PostsPostIdLazyImport.update({
  id: "/$postId",
  path: "/$postId",
  getParentRoute: () => PostsLazyRoute,
} as any).lazy(() => import("./routes/posts.$postId.lazy").then((d) => d.Route));

const EnsemblesEnsembleIdLazyRoute = EnsemblesEnsembleIdLazyImport.update({
  id: "/$ensembleId",
  path: "/$ensembleId",
  getParentRoute: () => EnsemblesLazyRoute,
} as any).lazy(() => import("./routes/ensembles.$ensembleId.lazy").then((d) => d.Route));

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/accounts": {
      id: "/accounts";
      path: "/accounts";
      fullPath: "/accounts";
      preLoaderRoute: typeof AccountsLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/assets": {
      id: "/assets";
      path: "/assets";
      fullPath: "/assets";
      preLoaderRoute: typeof AssetsLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/ensembles": {
      id: "/ensembles";
      path: "/ensembles";
      fullPath: "/ensembles";
      preLoaderRoute: typeof EnsemblesLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/posts": {
      id: "/posts";
      path: "/posts";
      fullPath: "/posts";
      preLoaderRoute: typeof PostsLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/ensembles/$ensembleId": {
      id: "/ensembles/$ensembleId";
      path: "/$ensembleId";
      fullPath: "/ensembles/$ensembleId";
      preLoaderRoute: typeof EnsemblesEnsembleIdLazyImport;
      parentRoute: typeof EnsemblesLazyImport;
    };
    "/posts/$postId": {
      id: "/posts/$postId";
      path: "/$postId";
      fullPath: "/posts/$postId";
      preLoaderRoute: typeof PostsPostIdLazyImport;
      parentRoute: typeof PostsLazyImport;
    };
    "/profile/$profileId": {
      id: "/profile/$profileId";
      path: "/profile/$profileId";
      fullPath: "/profile/$profileId";
      preLoaderRoute: typeof ProfileProfileIdLazyImport;
      parentRoute: typeof rootRoute;
    };
    "/accounts/": {
      id: "/accounts/";
      path: "/";
      fullPath: "/accounts/";
      preLoaderRoute: typeof AccountsIndexLazyImport;
      parentRoute: typeof AccountsLazyImport;
    };
    "/ensembles/": {
      id: "/ensembles/";
      path: "/";
      fullPath: "/ensembles/";
      preLoaderRoute: typeof EnsemblesIndexLazyImport;
      parentRoute: typeof EnsemblesLazyImport;
    };
    "/posts/": {
      id: "/posts/";
      path: "/";
      fullPath: "/posts/";
      preLoaderRoute: typeof PostsIndexLazyImport;
      parentRoute: typeof PostsLazyImport;
    };
  }
}

// Create and export the route tree

interface AccountsLazyRouteChildren {
  AccountsIndexLazyRoute: typeof AccountsIndexLazyRoute;
}

const AccountsLazyRouteChildren: AccountsLazyRouteChildren = {
  AccountsIndexLazyRoute: AccountsIndexLazyRoute,
};

const AccountsLazyRouteWithChildren = AccountsLazyRoute._addFileChildren(AccountsLazyRouteChildren);

interface EnsemblesLazyRouteChildren {
  EnsemblesEnsembleIdLazyRoute: typeof EnsemblesEnsembleIdLazyRoute;
  EnsemblesIndexLazyRoute: typeof EnsemblesIndexLazyRoute;
}

const EnsemblesLazyRouteChildren: EnsemblesLazyRouteChildren = {
  EnsemblesEnsembleIdLazyRoute: EnsemblesEnsembleIdLazyRoute,
  EnsemblesIndexLazyRoute: EnsemblesIndexLazyRoute,
};

const EnsemblesLazyRouteWithChildren = EnsemblesLazyRoute._addFileChildren(EnsemblesLazyRouteChildren);

interface PostsLazyRouteChildren {
  PostsPostIdLazyRoute: typeof PostsPostIdLazyRoute;
  PostsIndexLazyRoute: typeof PostsIndexLazyRoute;
}

const PostsLazyRouteChildren: PostsLazyRouteChildren = {
  PostsPostIdLazyRoute: PostsPostIdLazyRoute,
  PostsIndexLazyRoute: PostsIndexLazyRoute,
};

const PostsLazyRouteWithChildren = PostsLazyRoute._addFileChildren(PostsLazyRouteChildren);

export interface FileRoutesByFullPath {
  "/": typeof IndexLazyRoute;
  "/accounts": typeof AccountsLazyRouteWithChildren;
  "/assets": typeof AssetsLazyRoute;
  "/ensembles": typeof EnsemblesLazyRouteWithChildren;
  "/posts": typeof PostsLazyRouteWithChildren;
  "/ensembles/$ensembleId": typeof EnsemblesEnsembleIdLazyRoute;
  "/posts/$postId": typeof PostsPostIdLazyRoute;
  "/profile/$profileId": typeof ProfileProfileIdLazyRoute;
  "/accounts/": typeof AccountsIndexLazyRoute;
  "/ensembles/": typeof EnsemblesIndexLazyRoute;
  "/posts/": typeof PostsIndexLazyRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexLazyRoute;
  "/assets": typeof AssetsLazyRoute;
  "/ensembles/$ensembleId": typeof EnsemblesEnsembleIdLazyRoute;
  "/posts/$postId": typeof PostsPostIdLazyRoute;
  "/profile/$profileId": typeof ProfileProfileIdLazyRoute;
  "/accounts": typeof AccountsIndexLazyRoute;
  "/ensembles": typeof EnsemblesIndexLazyRoute;
  "/posts": typeof PostsIndexLazyRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexLazyRoute;
  "/accounts": typeof AccountsLazyRouteWithChildren;
  "/assets": typeof AssetsLazyRoute;
  "/ensembles": typeof EnsemblesLazyRouteWithChildren;
  "/posts": typeof PostsLazyRouteWithChildren;
  "/ensembles/$ensembleId": typeof EnsemblesEnsembleIdLazyRoute;
  "/posts/$postId": typeof PostsPostIdLazyRoute;
  "/profile/$profileId": typeof ProfileProfileIdLazyRoute;
  "/accounts/": typeof AccountsIndexLazyRoute;
  "/ensembles/": typeof EnsemblesIndexLazyRoute;
  "/posts/": typeof PostsIndexLazyRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "/accounts" | "/assets" | "/ensembles" | "/posts" | "/ensembles/$ensembleId" | "/posts/$postId" | "/profile/$profileId" | "/accounts/" | "/ensembles/" | "/posts/";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/assets" | "/ensembles/$ensembleId" | "/posts/$postId" | "/profile/$profileId" | "/accounts" | "/ensembles" | "/posts";
  id: "__root__" | "/" | "/accounts" | "/assets" | "/ensembles" | "/posts" | "/ensembles/$ensembleId" | "/posts/$postId" | "/profile/$profileId" | "/accounts/" | "/ensembles/" | "/posts/";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexLazyRoute: typeof IndexLazyRoute;
  AccountsLazyRoute: typeof AccountsLazyRouteWithChildren;
  AssetsLazyRoute: typeof AssetsLazyRoute;
  EnsemblesLazyRoute: typeof EnsemblesLazyRouteWithChildren;
  PostsLazyRoute: typeof PostsLazyRouteWithChildren;
  ProfileProfileIdLazyRoute: typeof ProfileProfileIdLazyRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexLazyRoute: IndexLazyRoute,
  AccountsLazyRoute: AccountsLazyRouteWithChildren,
  AssetsLazyRoute: AssetsLazyRoute,
  EnsemblesLazyRoute: EnsemblesLazyRouteWithChildren,
  PostsLazyRoute: PostsLazyRouteWithChildren,
  ProfileProfileIdLazyRoute: ProfileProfileIdLazyRoute,
};

export const routeTree = rootRoute._addFileChildren(rootRouteChildren)._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/accounts",
        "/assets",
        "/ensembles",
        "/posts",
        "/profile/$profileId"
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
    "/ensembles": {
      "filePath": "ensembles.lazy.tsx",
      "children": [
        "/ensembles/$ensembleId",
        "/ensembles/"
      ]
    },
    "/posts": {
      "filePath": "posts.lazy.tsx",
      "children": [
        "/posts/$postId",
        "/posts/"
      ]
    },
    "/ensembles/$ensembleId": {
      "filePath": "ensembles.$ensembleId.lazy.tsx",
      "parent": "/ensembles"
    },
    "/posts/$postId": {
      "filePath": "posts.$postId.lazy.tsx",
      "parent": "/posts"
    },
    "/profile/$profileId": {
      "filePath": "profile.$profileId.lazy.tsx"
    },
    "/accounts/": {
      "filePath": "accounts.index.lazy.tsx",
      "parent": "/accounts"
    },
    "/ensembles/": {
      "filePath": "ensembles.index.lazy.tsx",
      "parent": "/ensembles"
    },
    "/posts/": {
      "filePath": "posts.index.lazy.tsx",
      "parent": "/posts"
    }
  }
}
ROUTE_MANIFEST_END */