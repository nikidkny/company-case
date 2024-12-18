import { createLazyFileRoute } from '@tanstack/react-router'
import AuthGuard from '../../guard/RouteGuard'
import MusiciansPage from '../../pages/MusiciansPage'

export const Route = createLazyFileRoute('/musicians/')({
  component: () => (
    <AuthGuard>
      <MusiciansPage />
    </AuthGuard>
  ),
})
