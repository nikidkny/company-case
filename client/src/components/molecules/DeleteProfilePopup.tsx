import React from "react";
import Button from "../atoms/Button";
import TextHeadline from "../atoms/TextHeadline";
import TextInput from "../atoms/TextInput";
import TextBody from "../atoms/TextBody";
import { getFieldErrorMessage } from "../../utilities/auth";

interface DeleteProfileProps {
  isModalOpen: boolean;
  deleteUserPassword: string;
  setDeleteUserPassword: (value: string) => void;
  combinedErrors: string[];
  handleDeleteSubmit: (event: React.FormEvent) => void;
  handleDeleteCancel: () => void;
}

export default function DeleteProfile({
  isModalOpen,
  deleteUserPassword,
  setDeleteUserPassword,
  combinedErrors,
  handleDeleteSubmit,
  handleDeleteCancel,
}: DeleteProfileProps) {
  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-black bg-opacity-50">
      <div className="flex flex-col gap-6 items-center bg-white p-6 rounded-lg shadow-lg w-120">
        <TextHeadline variant="h3" size="sm">
          Confirm Deletion
        </TextHeadline>
        <form onSubmit={handleDeleteSubmit}>
          <TextInput
            inputType="password"
            id="deletePassword"
            name="deletePassword"
            placeholder="Enter your password"
            className="w-80"
            value={deleteUserPassword}
            onChange={(value) => setDeleteUserPassword(value)}
            isValid={!(combinedErrors.length > 0)}
            validityMsg={combinedErrors[0]}
            required={true}
          />
          {combinedErrors.length > 0 && (
            <TextBody className="text-red-500 text-sm mt-1">
              {getFieldErrorMessage(combinedErrors, "User not found")}
            </TextBody>
          )}
          <div className="modal-actions flex gap-4 pt-2">
            <Button
              buttonVariant="primary"
              size="lg"
              iconPosition="none"
              type="submit"
              buttonLabel="Confirm"
            />
            <Button
              buttonVariant="secondary"
              size="lg"
              iconPosition="none"
              type="button"
              onClick={handleDeleteCancel}
              buttonLabel="Cancel"
            />
          </div>
        </form>
      </div>
    </div>
  );
}
