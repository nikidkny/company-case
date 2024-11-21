import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/posts/$postId')({
  component: PostPage,
})
// posts details page
function PostPage() {
  return 'Hello /posts/$postId!'
}
