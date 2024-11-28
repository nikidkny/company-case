import { createLazyFileRoute } from "@tanstack/react-router";
//import AuthGuard from "../../guard/RouteGuard";
import EnsembleDetailsPage from "../../pages/EnsembleDetailsPage";

export const Route = createLazyFileRoute("/ensembles/$ensemblesId")({
  component: () => (
    //<AuthGuard>
    <EnsembleDetailsPage />
    //</AuthGuard>
  ),
});
