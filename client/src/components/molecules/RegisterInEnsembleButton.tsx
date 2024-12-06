import React from "react";
import Button from "../atoms/Button";
import { RegisterInEnsembleButtonProps } from "../../types/EnsembleType";
import TextBody from "../atoms/TextBody";

const RegisterInEnsembleButton: React.FC<RegisterInEnsembleButtonProps> = ({ registrationLoading, registrationError, registrationData, handleAddUserToEnsemble }) => {
  return (
    <div>
      <Button onClick={handleAddUserToEnsemble} buttonState="default" buttonVariant="primary" buttonLabel="Login" iconPosition="none" size="lg">
        {registrationLoading ? "Adding..." : "Join the ensemble"}
      </Button>

      {registrationError && <TextBody className="text-red-500 mt-4">Looks like you're already part of this ensemble!</TextBody>}

      {registrationData?.message && <TextBody className="text-green-500 mt-4">You have successfully joined the ensemble!</TextBody>}
    </div>
  );
};

export default RegisterInEnsembleButton;
