import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ensembles")({
  component: EnsemblesPage,
});
//ensembles list page
function EnsemblesPage() {
  return "Hello /ensemblesPage!";
}
