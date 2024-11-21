import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/posts')({
  component: PostsPage,
})
//posts overview page
function PostsPage() {
  return 'Hello /postssss!'
}
