import { createLazyFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import Hero from "../components/molecules/Hero";
export const Route = createLazyFileRoute("/")({
  component: Home,
});
//the content of the homepage goes here
function Home() {
  const [loginStatus, setLoginStatus] = useState<boolean>(false);
  //when the user logs in, the state is changed and passed on to the hero to display the personalised hero

  return (
    <div className="p-6">
      {/* hero */}
      <Hero loginStatus={loginStatus} />
      {/* other contents if necessary */}
    </div>
  );
}
