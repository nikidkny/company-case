import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/posts/create")({
  component: RouteComponent,
});

function RouteComponent() {
  return "Hello /posts/create!";
}
