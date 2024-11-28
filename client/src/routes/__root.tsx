import { createRootRoute, Outlet, ScrollRestoration } from "@tanstack/react-router";
import NavigationBar from "../components/molecules/NavigationBar";
import Footer from "../components/molecules/Footer";
import "./../App.css";
import Button from "../components/atoms/Button";
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
        to="/ensembles/$ensemblesId"
        params={{
          ensemblesId: "82",
        }}
        className="[&.active]:font-bold"
      >
        Profile
      </Link> */}
      <Button
        iconPosition="none"
        buttonState="default"
        buttonLabel="Register by email"
        size="mobile"
        buttonVariant="primary"
        className="no-underline w-auto inline"
        to="/ensembles/$ensemblesId"
        params={{
          ensemblesId: "651a1e9f8f1b2c001d3b0a10",
        }}
      />

      {/* </div> */}
      <NavigationBar />
      {/* //the outlet component is the content extracted from the respective route. */}
      <Outlet />
      <Footer />
    </>
  ),
});
