import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/posts/$postId")({
  component: PostPage,
});
// posts details page
function PostPage() {
  return "Hello /posts/$postId!";
}
