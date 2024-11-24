import { createLazyFileRoute } from '@tanstack/react-router'
import ProfilePage from '../pages/ProfilePage'

export const Route = createLazyFileRoute('/profile/$profileId')({
  component: ProfilePage,
})
// //user profile
// function ProfilePage() {
//   return "Hello /profile/$profileId!";
// }
