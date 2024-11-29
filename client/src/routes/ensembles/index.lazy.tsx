import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../../guard/RouteGuard";
import EnsemblesPage from "../../pages/EnsemblesPage";

export const Route = createLazyFileRoute("/ensembles/")({
  component: () => (
    <AuthGuard>
      <EnsemblesPage />
    </AuthGuard>
  ),
});
//not much goes on here. it is needed for creating the route

// function EnsemblesIndexComponent() {
//   return "Hello /ensembles/!";
// }
