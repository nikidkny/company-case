import { createLazyFileRoute } from "@tanstack/react-router";
import CreateEnsemblePostPage from "../../../pages/CreateEnsemblePostPage";
import AuthGuard from "../../../guard/RouteGuard";

export const Route = createLazyFileRoute("/posts/create/$ensemblesId")({
  component: () => (
    <AuthGuard>
      <CreateEnsemblePostPage />
    </AuthGuard>
  ),
});
