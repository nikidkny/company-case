import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/ensembles/$ensembleId")({
  component: EnsembleProfile,
});
//single ensemble profile page
function EnsembleProfile() {
  return "Hello /ensembles/$ensembleId!";
}
