import React from "react";
import Button from "../atoms/Button";
import { RegisterInEnsembleButtonProps } from "../../types/EnsembleType";

const RegisterInEnsembleButton: React.FC<RegisterInEnsembleButtonProps> = ({ registrationLoading, registrationError, registrationData, handleAddUserToEnsemble }) => {
  return (
    <div>
      <Button onClick={handleAddUserToEnsemble} buttonState="default" buttonVariant="primary" buttonLabel="Login" iconPosition="none" size="lg">
        {registrationLoading ? "Adding..." : "Join the ensemble"}
      </Button>

      {registrationError && <div className="text-red-500 mt-2">Error: {registrationError}</div>}

      {registrationData?.message && <div className="text-green-500 mt-2">{registrationData.message}</div>}
    </div>
  );
};

export default RegisterInEnsembleButton;
