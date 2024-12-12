import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import NavigationBar from "../components/molecules/NavigationBar";
import Footer from "../components/molecules/Footer";
import "./../App.css";

//elements that apply to all pages can be put here fx navigation, footer
export const Route = createRootRoute({
  component: () => (
    <>
      {/* to allow the scroll to go back to the top when navigating */}
      <ScrollRestoration />
      {/* </div> */}
      <NavigationBar />
      {/* //the outlet component is the content extracted from the respective route. */}
      <Outlet />
      <Footer />
    </>
  ),
});
