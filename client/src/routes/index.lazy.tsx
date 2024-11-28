import { createLazyFileRoute } from "@tanstack/react-router";
import Hero from "../components/molecules/Hero";
//import { useStore } from "../store/useStore";
export const Route = createLazyFileRoute("/")({
  component: Home,
});

//the content of the homepage goes here
function Home() {
  // const { user, loginStatus } = useStore();
  // console.log("user", user);
  // console.log("loginStatus", loginStatus);
  return (
    <div className="p-6">
      {/* hero */}
      <Hero />
      {/* other contents if necessary */}
    </div>
  );
}
