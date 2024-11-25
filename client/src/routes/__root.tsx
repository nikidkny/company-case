
import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import NavigationBar from "../components/molecules/NavigationBar";
import Footer from "../components/molecules/Footer";
import "./../App.css";
//elements that apply to all pages can be put here fx navigation, footer
export const Route = createRootRoute({
  component: () => (
    <>
      <ScrollRestoration />
      {/* <div className="p-2 flex gap-2">
        <Link to="/" className="[&.active]:font-bold">
          Home
        </Link> */}
      {/* //testing out going to a route with specific id */}
      {/* <Link
          to="/ensembles/$ensembleId"
          params={{
            ensembleId: "82",
          }}
          className="[&.active]:font-bold"
        >
          Profile
        </Link> */}
      {/* </div> */}
      <NavigationBar />
      {/* //the outlet component is the content extracted from the respective route. */}
      <Outlet />
      <Footer />
    </>
  ),
});