import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/profile/$profileId')({
  component: ProfilePage,
})
//user profile
function ProfilePage() {
  return 'Hello /profile/$profileId!'
}
