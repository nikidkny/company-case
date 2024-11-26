import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../../guard/RouteGuard";

export const Route = createLazyFileRoute("/posts/create")({
  component: () => (
    <AuthGuard>
      <RouteComponent />
    </AuthGuard>
  ),
});

function RouteComponent() {
  return <div>Hello /posts/create!</div>;
}
