import { createLazyFileRoute } from '@tanstack/react-router'
import AuthGuard from '../../guard/RouteGuard'

export const Route = createLazyFileRoute('/posts/')({
  component: () => (
    <AuthGuard>
      <RouteComponent />
    </AuthGuard>
  ),
})
//posts overview page
function RouteComponent() {
  return 'Hello /postssss!'
}
