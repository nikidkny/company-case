import { createLazyFileRoute } from '@tanstack/react-router'
import AddInstrumentPage from '../pages/AddInstrumentPage'

export const Route = createLazyFileRoute('/profile/instruments/edit')({
  component: AddInstrumentPage,
})
