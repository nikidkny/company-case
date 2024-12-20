import { getFieldErrorMessage } from "../../utilities/auth";
import Button from "../atoms/Button";
import TextBody from "../atoms/TextBody";
import TextHeadline from "../atoms/TextHeadline";
import TextInput from "../atoms/TextInput";

interface ChangePasswordProps {
    showPasswordFields: boolean;
    setShowPasswordFields: (value: boolean) => void;
    currentPassword: string | undefined;
    newPassword: string;
    confirmNewPassword: string;
    setCurrentPassword: (value: string) => void;
    setNewPassword: (value: string) => void;
    setConfirmNewPassword: (value: string) => void;
    setHasChanges: (value: boolean) => void;
    combinedErrors: string[];
}

export default function ChangePassword({
    showPasswordFields,
    setShowPasswordFields,
    currentPassword,
    newPassword,
    confirmNewPassword,
    setCurrentPassword,
    setNewPassword,
    setConfirmNewPassword,
    setHasChanges,
    combinedErrors
}: ChangePasswordProps) {
    return (
        <div>
            <TextHeadline variant="h2" size="sm">
                Settings
            </TextHeadline>
            <div className="settings-password-wrapper flex flex-col gap-4">
                <TextHeadline variant="h3" size="sm">
                    Password
                </TextHeadline>
                {!showPasswordFields && (
                    <Button
                        buttonVariant="secondary"
                        onClick={() => setShowPasswordFields(true)}
                        iconPosition="none"
                        size="lg"
                        buttonLabel="Change password"
                    />
                )}
                {showPasswordFields && (
                    <div className="flex flex-col gap-4">
                        <TextInput
                            inputType="password"
                            id="currentPassword"
                            name="currentPassword"
                            placeholder="Current Password"
                            value={currentPassword || ""}
                            onChange={(value) => setCurrentPassword(value)}
                            isValid={!getFieldErrorMessage(combinedErrors, "Current") && !getFieldErrorMessage(combinedErrors, "Current password")}
                            validityMsg={getFieldErrorMessage(combinedErrors, "Current") || getFieldErrorMessage(combinedErrors, "Current password")}
                        />
                        <TextInput
                            inputType="password"
                            id="newPassword"
                            name="newPassword"
                            placeholder="New Password"
                            value={newPassword}
                            onChange={(value) => {
                                setNewPassword(value);
                                setHasChanges(true);
                            }}
                            isValid={!getFieldErrorMessage(combinedErrors, "Password do not match") && !getFieldErrorMessage(combinedErrors, "New password")}
                            validityMsg={getFieldErrorMessage(combinedErrors, "Password do not match") || getFieldErrorMessage(combinedErrors, "New password")}
                        />
                        <TextInput
                            inputType="password"
                            placeholder="Confirm New Password"
                            id="confirmNewPassword"
                            name="confirmNewPassword"
                            value={confirmNewPassword}
                            onChange={(value) => {
                                setConfirmNewPassword(value);
                                setHasChanges(true);
                            }}
                            isValid={!getFieldErrorMessage(combinedErrors, "Password do not match") && !getFieldErrorMessage(combinedErrors, "Confirm Password")}
                            validityMsg={getFieldErrorMessage(combinedErrors, "Password do not match") || getFieldErrorMessage(combinedErrors, "Confirm Password")}
                        />
                    </div>
                )}

                {getFieldErrorMessage(combinedErrors, "User not found") && (
                    <TextBody className="text-red-500 text-sm mt-1" >{getFieldErrorMessage(combinedErrors, "User not found")}</TextBody>
                )}

            </div>
        </div>
    );
}
