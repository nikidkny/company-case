import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/profile/$profileId")({
  component: ProfilePage,
});
//user profile
function ProfilePage() {
  return "Hello /profile/$profileId!";
}
