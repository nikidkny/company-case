// src/components/EnsembleButton.tsx
import React, { useState } from 'react';
import { useFetch } from '../../hooks/use-fetch';
import Button from '../atoms/Button';

const RegisterInEnsembleButton = () => {
    //TODO:
    // - Mock reading pathParam
    // - Mock UserId Extraction from cookies or decode cookie in the backend
    const userId = "651a1e9f8f1b2c001d3b0a1b";
    const ensembleId = "651a1e9f8f1b2c001d3b0a10";

    const { data, loading, error, triggerFetch } = useFetch(
        { message: '' }, 
        '/userEnsemble',
        'POST',
        {
            'Content-Type': 'application/json', 
        },
        { userId, ensembleId } 
    );

    const handleAddUserToEnsemble = () => {
        // Trigger the fetch
        triggerFetch();
    };

    return (
        <div>
            <Button
                onClick={handleAddUserToEnsemble}
                buttonState="default" buttonVariant="primary" buttonLabel="Login" iconPosition="none"
            >
                {loading ? 'Adding...' : 'Add User to Ensemble'}
            </Button>

            {error && (
                <div className="text-red-500 mt-2">
                    Error: {error}
                </div>
            )}

            {data?.message && (
                <div className="text-green-500 mt-2">
                    {data.message}
                </div>
            )}
        </div>
    );
};

export default RegisterInEnsembleButton;
