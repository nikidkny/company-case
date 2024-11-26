import { createLazyFileRoute } from "@tanstack/react-router";
import Hero from "../components/molecules/Hero";
export const Route = createLazyFileRoute("/")({
  component: Home,
});

//the content of the homepage goes here
function Home() {
  return (
    <div className="p-6">
      {/* hero */}
      <Hero />
      {/* other contents if necessary */}
    </div>
  );
}
