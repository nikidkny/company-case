import { createLazyFileRoute } from '@tanstack/react-router'
import AuthGuard from '../../guard/RouteGuard'
import UserDetails from '../../pages/UserDetails'

export const Route = createLazyFileRoute('/musicians/$userId')({
  component: () => (
    <AuthGuard>
      <UserDetails />
    </AuthGuard>
  ),
})
