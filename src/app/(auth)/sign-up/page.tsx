"use client";

import { Button, TextInput } from "@/components/base";
import { useState } from "react";
import { signUp } from "@/api/auth";

export default function SignUpPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function onPressSignUp() {
    try {
      const res = await signUp({
        email,
        password,
      });
      console.log("RES", res);
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <div className="flex h-screen flex-col items-center justify-center p-6 sm:p-24 bg-slate-50">
      <div className="container mx-auto w-full bg-slate-50 sm:w-96 border-0 border-slate-300 p-6 flex flex-col items-center w-full sm:border mb-4">
        <div className="text-center mb-6 text-4xl">Puros</div>
        <TextInput
          className="mb-2"
          placeholder="Email"
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextInput
          className="mb-6"
          placeholder="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <Button
          text="Sign up"
          className="w-full mb-4"
          onClick={onPressSignUp}
          disabled={!email || !password}
        />
      </div>
      <div className="container mx-auto w-full bg-slate-50 sm:w-96 border-0 border-slate-300 p-6 flex flex-col items-center w-full sm:border">
        <div className="text-sm text-slate-600">
          Have an account?{" "}
          <a className="text-blue-500 font-semibold" href="/sign-in">
            Sign in
          </a>
        </div>
      </div>
    </div>
  );
}
