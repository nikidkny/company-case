import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../../guard/RouteGuard";
import PostDetailsPage from "../../pages/PostDetailsPage";

export const Route = createLazyFileRoute("/posts/$postId")({
  component: () => (
    <AuthGuard>
      <PostDetailsPage />
    </AuthGuard>
  ),
});
