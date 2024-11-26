import { createLazyFileRoute } from '@tanstack/react-router'
import AuthGuard from '../../guard/RouteGuard'

export const Route = createLazyFileRoute('/ensembles/$ensemblesId')({
  component: () => (
    <AuthGuard>
      <RouteComponent />
    </AuthGuard>
  ),
})
//single ensemble profile page
function RouteComponent() {
  return 'Hello /ensembles/$ensembleId!'
}
