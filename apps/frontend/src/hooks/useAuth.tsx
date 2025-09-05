import { createContext, useContext, useState, useEffect, useCallback } from "react";
import useLoginMutation from "./auth/useLoginMutation";
import useSignupMutation from "./auth/useSignupMutation";
import useMeMutation from "./auth/useMeMutation";
import useLogoutMutation from "./auth/useLogoutMutation";
import { type AuthTypes } from "@vRendevski/shared";

type User = AuthTypes.MeResponse;

interface AuthContextProviderState {
  user: User | null,
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextProviderState | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  const loginMutation = useLoginMutation();
  const signupMutation = useSignupMutation();
  const meMutation = useMeMutation();
  const logoutMutation = useLogoutMutation();

  const refetchMe = useCallback(async () => {
    try{
      const response = await meMutation() 
      if(!response.success) {
        context?.setUser(null);
        return;
      }
      context?.setUser(response.data);
    }
    catch {
      context?.setUser(null);
    }
  }, [context, meMutation]);

  const logout = useCallback(async () => {
    try {
      await logoutMutation();
    }
    finally {
      context?.setUser(null)
    }
  }, [context, logoutMutation]);

  if(context === undefined) {
    throw new Error("useAuth must be called within an AuthContextProvider");
  }

  return {
    user: context.user,
    login: loginMutation,
    signup: signupMutation,
    refetchMe,
    logout
  }
}

export default function AuthContextProvider({ children }: { children: React.ReactNode }) {
  const [ user, setUser ] = useState<User | null>(null);
  const me = useMeMutation();

  useEffect(() => {
    (async () => {
      try {
        const response = await me();
        if(!response.success) { 
          setUser(null);
          return;
        }
        setUser(response.data);
      }
      catch {
        setUser(null);
      }
    })();
  }, [me])

  return (
    <AuthContext.Provider value={{ user, setUser }} >
      { children }
    </AuthContext.Provider>
  )
}