import { useContext } from "react";
import { AuthContext, AuthContextValues } from "@/providers/AuthProvider/AuthProvider";

export default function useAuth(): AuthContextValues {
  return useContext<AuthContextValues>(AuthContext);
}
