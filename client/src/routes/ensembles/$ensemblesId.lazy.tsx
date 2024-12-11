import { createLazyFileRoute } from "@tanstack/react-router";
//import AuthGuard from "../../guard/RouteGuard";
import EnsembleDetailsPage from "../../pages/EnsembleDetailsPage";
import AuthGuard from "../../guard/RouteGuard";

export const Route = createLazyFileRoute("/ensembles/$ensemblesId")({
  component: () => (
    <AuthGuard>
      <EnsembleDetailsPage />
    </AuthGuard>
  ),
});
