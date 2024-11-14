import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts")({
  component: PostsPage,
});
//posts overview page
function PostsPage() {
  return "Hello /postssss!";
}
