import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../../../guard/RouteGuard";
import EditEnsemblePage from "../../../pages/EditEnsemblePage";

export const Route = createLazyFileRoute("/ensembles/$ensemblesId/edit")({
  component: () => (
    <AuthGuard>
      <EditEnsemblePage />
    </AuthGuard>
  ),
});
