import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/posts/')({
  component: PostsPageIndexComponent,
})

function PostsPageIndexComponent() {
  return 'Hello /posts/!'
}
