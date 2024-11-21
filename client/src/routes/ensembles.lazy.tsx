import { createLazyFileRoute } from '@tanstack/react-router'

export const Route = createLazyFileRoute('/ensembles')({
  component: EnsemblesPage,
})
//ensembles list page
function EnsemblesPage() {
  return 'Hello /ensemblesPage!'
}
