import { createLazyFileRoute } from '@tanstack/react-router'
import App from '../App'

//this is the asset page for us to checkout our components
export const Route = createLazyFileRoute('/assets')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <>
      <App />
    </>
  )
}
