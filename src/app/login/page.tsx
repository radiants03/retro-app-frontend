"use client";

import Alert from "@/components/alerts/Alert";
import FilledButton from "@/components/buttons/FilledButton";
import InputField from "@/components/fields/InputField";
import { login } from "@/utils/api/user";
import { saveToLocalStorage } from "@/utils/handles";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Login = () => {
  const { push } = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [alert, setAlert] = useState<{
    text: string;
    type: "error" | "info" | "default" | "success" | "warning";
  }>({ text: "", type: "default" });

  const handleLogin = async () => {
    setButtonDisabled(true);
    if (email && password) {
      const payload = {
        email,
        password,
      };
      const { data, error } = await login(payload);
      if (!error) {
        saveToLocalStorage(
          data.first_name,
          data.last_name,
          data.email,
          data.accessToken,
          data.refreshToken
        );
        push("/dashboard");
      } else {
        setAlert({
          text: error,
          type: "error",
        });
        setButtonDisabled(false);
      }
    } else {
      setAlert({
        text: "Enter your credentials.",
        type: "error",
      });
      setButtonDisabled(false);
    }
  };

  return (
    <>
      <div className="h-screen">
        <div className="flex flex-row h-full">
          {/* Left side */}
          <div className="w-full h-full items-center justify-center bg-yellow-400 hidden lg:flex">
            <div>
              <h1 className="text-4xl font-bold">Keep up good work!</h1>
              <p className="text-black/50 text-xl pt-4 max-w-lg">
                __ We help to track your goals, improvements and weakness to
                make better future...
              </p>
              <img src="/Creative team-bro.svg" alt="Image" className="w-100" />
            </div>
          </div>

          {/* Right side */}
          <div className="flex w-full h-full items-center justify-center px-10">
            <div className="w-96">
              <p className="text-black/50 text-lg pb-2">Welcome</p>
              <h1 className="text-4xl font-bold pb-15">Login</h1>
              <div className="flex flex-col space-y-4 pb-15">
                <Alert label={alert.text} type={alert.type} />
                <InputField
                  type="email"
                  placeholder="Email"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                  type="password"
                  placeholder="Password"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <a
                  href="/forgot-password"
                  className="text-yellow-600 underline"
                >
                  Forgot password?
                </a>
              </div>
              <div className="flex flex-col md:flex-row justify-between items-center">
                <a
                  href="/signup"
                  className="text-yellow-600 underline pb-5 md:pb-0"
                >
                  I don't have an account
                </a>
                <FilledButton
                  label="Login"
                  className="w-50"
                  onClick={handleLogin}
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
export default Login;
