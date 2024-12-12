import { createLazyFileRoute } from '@tanstack/react-router'
import AddInstrumentPage from '../../../pages/AddInstrumentPage'

export const Route = createLazyFileRoute(
  '/profile/$profileId/instruments/edit',
)({
  component: AddInstrumentPage,
})
