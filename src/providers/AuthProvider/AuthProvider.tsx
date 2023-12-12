"use client";

import { createContext, useEffect, useState } from "react";
import { User } from "@/client/response.types";

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
