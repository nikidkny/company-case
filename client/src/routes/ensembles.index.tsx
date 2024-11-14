import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ensembles/")({
  component: EnsemblesIndexComponent,
});
//not much goes on here. it is needed for creating the route

function EnsemblesIndexComponent() {
  return "Hello /ensembles/!";
}
