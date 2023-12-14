"use client";

import { createContext, useState } from "react";
import { User } from "@/api/response.types";

export type AuthContextValues = {
  isAuthenticated?: boolean;
  user?: User;
};

export const AuthContext = createContext<AuthContextValues>({});

export default function AuthProvider({ ...props }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState<User>();

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
      }}
      {...props}
    />
  );
}
