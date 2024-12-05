import { createLazyFileRoute } from '@tanstack/react-router'
import ProfileSettingsPage from '../../pages/ProfileSettingsPage'
import AuthGuard from '../../guard/RouteGuard'

export const Route = createLazyFileRoute('/profile/$profileId/settings')({
  component: () => (
    <AuthGuard>
      <ProfileSettingsPage />
    </AuthGuard>
  ),
})
