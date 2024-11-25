import { createLazyFileRoute } from '@tanstack/react-router'
import AuthGuard from '../guard/RouteGuard'

export const Route = createLazyFileRoute('/profile/$profileId')({
  component: () => (
    <AuthGuard>
      <RouteComponent />
    </AuthGuard>
  ),
})
//user profile
function RouteComponent() {
  return 'Hello /profile/$profileId!'
}
