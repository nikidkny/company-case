import { createLazyFileRoute, useLocation } from "@tanstack/react-router";
import SignupForm from "../components/molecules/SignupForm";
import LoginForm from "../components/molecules/LoginForm";

export const Route = createLazyFileRoute("/accounts")({
  component: AccountsPage,
});

function AccountsPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const intent = searchParams.get("intent"); // Get the query parameter 'intent'

  return (
    <div>
      {intent === "register" && <SignupForm />}
      {intent === "login" && <LoginForm />}
      {!intent && <p>Please select login or register from the navigation.</p>}
    </div>
  );
}