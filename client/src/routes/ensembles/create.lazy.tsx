import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../../guard/RouteGuard";

export const Route = createLazyFileRoute("/ensembles/create")({
  component: () => (
    <AuthGuard>
      <RouteComponent />
    </AuthGuard>
  ),
});

function RouteComponent() {
  return "Hello /esensembles/create!";
}
