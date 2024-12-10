import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../../guard/RouteGuard";
import EnsemblesPage from "../../pages/EnsemblesPage";

//ensembles overview page
export const Route = createLazyFileRoute("/ensembles/")({
  component: () => (
    <AuthGuard>
      <EnsemblesPage />
    </AuthGuard>
  ),
});
