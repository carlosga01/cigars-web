"use server";

import { SignInRequest, SignUpRequest } from "@/api/request.types";

export async function signIn(data: SignInRequest) {
  const response = await fetch(`https://cigars-api.onrender.com/sign-in`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}

export async function signUp(data: SignUpRequest) {
  const response = await fetch(`https://cigars-api.onrender.com/sign-up`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  const result = await response.json();
  return result;
}
