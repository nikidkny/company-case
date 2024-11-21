import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/ensembles/")({
  component: EnsemblesIndexComponent,
});
//not much goes on here. it is needed for creating the route

function EnsemblesIndexComponent() {
  return "Hello /ensembles/!";
}
