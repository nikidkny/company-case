import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../../guard/RouteGuard";

//this is actually the posts page!
export const Route = createLazyFileRoute("/ensembles/")({
  component: () => (
    <AuthGuard>
      <RouteComponent />
    </AuthGuard>
  ),
});

function RouteComponent() {
  return "/ensembles!";
}
