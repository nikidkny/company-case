import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/accounts/")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /accounts/!";
}
