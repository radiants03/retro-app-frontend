"use client";

import Alert from "@/components/alerts/Alert";
import FilledButton from "@/components/buttons/FilledButton";
import InputField from "@/components/fields/InputField";
import { PPasswordReset } from "@/utils/api/payloads";
import { resetPassword } from "@/utils/api/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

const ForgotPassword = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [alert, setAlert] = useState<{
    text: string;
    type: "error" | "info" | "default" | "success" | "warning";
  }>({ text: "", type: "default" });

  const handleReset = async () => {
    const payload: PPasswordReset = {
      email: email,
      first_name: firstName,
      new_password: newPassword,
      confirm_password: confirmPassword,
    };
    const { data, error } = await resetPassword(payload);
    if (!error) {
      push("/login");
    } else {
      setAlert({
        text: error,
        type: "error",
      });
    }
  };

  return (
    <>
      <div className="h-screen">
        <div className="flex flex-row h-full">
          {/* Right side */}
          <div className="flex w-full h-full items-center justify-center px-10">
            <div className="w-96">
              <p className="text-black/50 text-lg pb-2">Forgot password</p>
              <h1 className="text-4xl font-bold pb-15">Reset password</h1>
              <div className="flex flex-col space-y-4 pb-15">
                <Alert label={alert.text} type={alert.type} />
                <InputField
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                  type="text"
                  placeholder="First name"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <InputField
                  type="text"
                  placeholder="New password"
                  required
                  onChange={(e) => setNewPassword(e.target.value)}
                />
                <InputField
                  type="text"
                  placeholder="Confirm password"
                  required
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <a
                  href="/signup"
                  className="text-yellow-600 underline pb-5 md:pb-0"
                >
                  I don't have an account
                </a>
                <FilledButton
                  label="Reset"
                  className="w-50"
                  onClick={handleReset}
                  disabled={isButtonDisabled}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default ForgotPassword;
