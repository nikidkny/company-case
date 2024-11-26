import { createLazyFileRoute } from "@tanstack/react-router";
import ProfilePage from "../pages/ProfilePage";
import AuthGuard from "../guard/RouteGuard";

export const Route = createLazyFileRoute("/profile/$profileId")({
  component: () => (
    <AuthGuard>
      <ProfilePage />
    </AuthGuard>
  ),
});
// //user profile
// function ProfilePage() {
//   return "Hello /profile/$profileId!";
// }
