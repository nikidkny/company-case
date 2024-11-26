import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../../guard/RouteGuard";

export const Route = createLazyFileRoute("/posts/$postId")({
  component: () => (
    <AuthGuard>
      <RouteComponent />
    </AuthGuard>
  ),
});
// posts details page
function RouteComponent() {
  return "Hello /posts/$postId!";
}
