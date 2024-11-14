import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ensembles/$ensembleId")({
  component: EnsembleProfile,
});
//single ensemble profile page
function EnsembleProfile() {
  return "Hello /ensembles/$ensembleId!";
}
