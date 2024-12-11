import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../guard/RouteGuard";
import HomePage from "../pages/HomePage";
export const Route = createLazyFileRoute("/")({
  component: () => (
    <AuthGuard>
      <HomePage />
    </AuthGuard>
  ),
});
