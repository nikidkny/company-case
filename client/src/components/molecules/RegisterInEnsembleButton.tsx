import React from 'react';
import Button from '../atoms/Button';
import { RegisterInEnsembleButtonProps } from '../../types/EnsembleType';

const RegisterInEnsembleButton: React.FC<RegisterInEnsembleButtonProps> = ({
    registrationLoading,
    registrationError,
    registrationData,
    handleAddUserToEnsemble,
}) => {
    return (
        <div>
            <Button
                onClick={handleAddUserToEnsemble}
                buttonState="default"
                buttonVariant="primary"
                buttonLabel="Login"
                iconPosition="none"
            >
                {registrationLoading ? 'Adding...' : 'Add User to Ensemble'}
            </Button>

            {registrationError && (
                <div className="text-red-500 mt-2">
                    Error: {registrationError}
                </div>
            )}

            {registrationData?.message && (
                <div className="text-green-500 mt-2">
                    {registrationData.message}
                </div>
            )}
        </div>
    );
};

export default RegisterInEnsembleButton;
