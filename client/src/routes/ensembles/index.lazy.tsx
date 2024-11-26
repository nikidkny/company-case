import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../../guard/RouteGuard";

export const Route = createLazyFileRoute("/ensembles/")({
  component: () => (
    <AuthGuard>
      <EnsemblesIndexComponent />
    </AuthGuard>
  ),
});
//not much goes on here. it is needed for creating the route

function EnsemblesIndexComponent() {
  return "Hello /ensembles/!";
}
