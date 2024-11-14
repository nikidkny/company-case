import { createLazyFileRoute } from "@tanstack/react-router";
export const Route = createLazyFileRoute("/")({
  component: Home,
});
//the content of the homepage goes here
function Home() {
  return (
    <div>
      {/* hero */}
      {/* other contents if necessary */}
    </div>
  );
}
