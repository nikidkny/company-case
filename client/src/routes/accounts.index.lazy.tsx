import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../guard/RouteGuard";

export const Route = createLazyFileRoute("/accounts/")({
  component: () => (
    <AuthGuard>
      <RouteComponent />
    </AuthGuard>
  ),
});

function RouteComponent() {
  return "Hello /accounts/!";
}
