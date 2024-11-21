import { createLazyFileRoute, useLocation } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/accounts")({
  component: AccountsPage,
});
//where register/login will be
function AccountsPage() {
  //this is how we access the customData key for the intent
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const intent = searchParams.get("intent"); // Get the query parameter 'intent'
  return (
    <>
      <p>/accounts page with both login and register components</p>
      {intent === "register" && "<RegisterComponent />"}
      {intent === "login" && "<LoginComponent />"}
    </>
  );
}
