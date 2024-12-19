import { createLazyFileRoute } from "@tanstack/react-router";

import CreatePostPage from "../../../pages/CreatePostPage";
import AuthGuard from "../../../guard/RouteGuard";

export const Route = createLazyFileRoute("/posts/create/")({
  component: () => (
    <AuthGuard>
      <CreatePostPage />
    </AuthGuard>
  ),
});
