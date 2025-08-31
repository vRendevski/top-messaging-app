import { createContext, useContext, useState, useEffect, useCallback } from "react";
import useLoginMutation from "./auth/useLoginMutation";
import useSignupMutation from "./auth/useSignupMutation";
import useMeMutation from "./auth/useMeMutation";
import { type AuthTypes } from "@vRendevski/shared/schemas/rest";

type User = AuthTypes.MeResponse;

interface AuthContextProviderState {
  user: User | null,
  setUser: (user: User | null) => void
}

const AuthContext = createContext<AuthContextProviderState | undefined>(undefined);

export function useAuth() {
  const context = useContext(AuthContext);
  const login = useLoginMutation();
  const signup = useSignupMutation();
  const me = useMeMutation();

  const refetchMe = useCallback(async () => {
    try{
      const response = await me() 
      if(!response.success) {
        context?.setUser(null);
        return;
      }
      context?.setUser(response.data);
    }
    catch {
      context?.setUser(null);
    }
  }, [context, me])

  if(context === undefined) {
    throw new Error("useAuth must be called within an AuthContextProvider");
  }

  return {
    user: context.user,
    login,
    signup,
    refetchMe
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