import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../../guard/RouteGuard";
import PostsPage from "../../pages/PostsPage";

export const Route = createLazyFileRoute("/posts/")({
  component: () => (
    <AuthGuard>
      <PostsPage />
    </AuthGuard>
  ),
});
