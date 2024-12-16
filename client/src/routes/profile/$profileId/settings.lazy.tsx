import { createLazyFileRoute } from "@tanstack/react-router";
import AuthGuard from "../../../guard/RouteGuard";
import ProfileSettingsPage from "../../../pages/ProfileSettingsPage";

export const Route = createLazyFileRoute("/profile/$profileId/settings")({
  component: () => (
    <AuthGuard>
      <ProfileSettingsPage />
    </AuthGuard>
  ),
});
