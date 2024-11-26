import { createLazyFileRoute } from "@tanstack/react-router";
import { CreateEnsemblePage } from "../../components/pages/CreateEnsemblePage";

export const Route = createLazyFileRoute("/ensembles/create")({
  component: CreateEnsemblePage,
});
