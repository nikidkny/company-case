import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/ensembles/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /esensembles/create!";
}
