import { createLazyFileRoute } from "@tanstack/react-router";
import { CreateEnsemblePage } from "../../pages/CreateEnsemblePage";
import AuthGuard from "../../guard/RouteGuard";

export const Route = createLazyFileRoute("/ensembles/create")({
  component: () => (
    <AuthGuard>
      <CreateEnsemblePage />
    </AuthGuard>
  ),
});
