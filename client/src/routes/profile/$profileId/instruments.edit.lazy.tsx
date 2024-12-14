import { createLazyFileRoute } from "@tanstack/react-router";
import AddInstrumentPage from "../../../pages/AddInstrumentPage";
import AuthGuard from "../../../guard/RouteGuard";

export const Route = createLazyFileRoute("/profile/$profileId/instruments/edit")({
  component: () => (
    <AuthGuard>
      <AddInstrumentPage />
    </AuthGuard>
  ),
});
