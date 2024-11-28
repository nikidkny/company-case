import { createLazyFileRoute } from '@tanstack/react-router'
import EditProfilePage from '../../../pages/EditProfilePage'

export const Route = createLazyFileRoute('/profile/$profileId/edit')({
  component: EditProfilePage,
})
