import { createLazyFileRoute } from "@tanstack/react-router";

import EnsemblesPage from "../../pages/EnsemblesPage";
import AuthGuard from "../../guard/RouteGuard";

//this is actually the posts page!
export const Route = createLazyFileRoute("/ensembles/")({
  component: () => (
    <AuthGuard>
      <EnsemblesPage />
    </AuthGuard>
  ),
});
