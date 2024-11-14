import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/")({
  component: PostsPageIndexComponent,
});

function PostsPageIndexComponent() {
  return "Hello /posts/!";
}
