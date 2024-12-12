import { createLazyFileRoute } from "@tanstack/react-router";
import EditProfilePage from "../../../pages/EditProfilePage";
import AuthGuard from "../../../guard/RouteGuard";

export const Route = createLazyFileRoute("/profile/$profileId/edit")({
  component: () => (
    <AuthGuard>
      <EditProfilePage />
    </AuthGuard>
  ),
});
