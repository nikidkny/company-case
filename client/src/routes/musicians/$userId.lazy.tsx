import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../../guard/RouteGuard";
import UserDetails from "../../pages/MusicianDetailsPage";

export const Route = createLazyFileRoute("/musicians/$userId")({
  component: () => (
    <AuthGuard>
      <UserDetails />
    </AuthGuard>
  ),
});
