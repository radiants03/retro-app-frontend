"use client";

import Alert from "@/components/alerts/Alert";
import FilledButton from "@/components/buttons/FilledButton";
import InputField from "@/components/fields/InputField";
import { createUser } from "@/utils/api/user";
import { useRouter } from "next/navigation";
import { useState } from "react";

const Signup = () => {
  const { push } = useRouter();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [isButtonDisabled, setButtonDisabled] = useState(false);

  const [alert, setAlert] = useState<{
    text: string;
    type: "error" | "info" | "default" | "success" | "warning";
  }>({ text: "", type: "default" });

  const handleCreateUser = async () => {
    setButtonDisabled(true);
    if (firstName && email && password && passwordConfirm) {
      if (email.includes("@") && email.includes(".")) {
        if (password === passwordConfirm) {
          const payload = {
            first_name: firstName,
            last_name: lastName,
            email: email,
            password: password,
            confirm_password: passwordConfirm,
          };
          const { data, error } = await createUser(payload);
          if (!error) {
            setAlert({
              text: data.message,
              type: "success",
            });
            setTimeout(() => {
              push("/login");
            }, 1000);
          } else {
            setAlert({
              text: error,
              type: "error",
            });
            setButtonDisabled(false);
          }
        } else {
          setAlert({
            text: "Password confirmation wrong. Try again!",
            type: "error",
          });
          setButtonDisabled(false);
        }
      } else {
        setAlert({
          text: "Enter a valid email address.",
          type: "error",
        });
        setButtonDisabled(false);
      }
    } else {
      setAlert({
        text: "First name, Email and Password are requied.",
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
              <img src="/Good team-bro.svg" alt="Image" className="w-100" />
              <h1 className="text-4xl font-bold">Let's make a Retro.</h1>
              <p className="text-black/50 text-xl pt-4 max-w-lg">
                ___ We built sleek and minimalist retrospective board for you.
                Collect information well.
              </p>
            </div>
          </div>

          {/* Right side */}
          <div className="flex w-full h-full items-center justify-center px-10">
            <div className="w-96">
              <p className="text-black/50 text-lg pb-2">Welcome</p>
              <h1 className="text-4xl font-bold pb-15">Sign up</h1>
              <div className="flex flex-col space-y-4 pb-15">
                <Alert label={alert.text} type={alert.type} />
                <div className="flex flex-col md:flex-row w-full space-y-4 md:space-y-0 space-x-4">
                  <InputField
                    type="text"
                    placeholder="First name"
                    className="w-full"
                    required
                    onBlur={(e) => setFirstName(e.target.value)}
                  />
                  <InputField
                    type="text"
                    placeholder="Last name"
                    className="w-full"
                    onBlur={(e) => setLastName(e.target.value)}
                  />
                </div>
                <InputField
                  type="email"
                  placeholder="Email"
                  required
                  onBlur={(e) => setEmail(e.target.value)}
                />
                <InputField
                  type="password"
                  placeholder="Password"
                  required
                  onBlur={(e) => setPassword(e.target.value)}
                />
                <InputField
                  type="password"
                  placeholder="Confirm password"
                  required
                  onBlur={(e) => setPasswordConfirm(e.target.value)}
                />
                <a href="/login" className="text-yellow-600 underline">
                  I already have an account
                </a>
              </div>
              <div className="flex flex-row justify-center md:justify-end items-center">
                <FilledButton
                  label="Create"
                  className="w-50"
                  onClick={handleCreateUser}
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
export default Signup;
