import { useEffect } from "react";
import { useNavigate } from "@tanstack/react-router";
import { useAuth } from "./useAuth";
import { type RouterLink } from "@/utils/RouterLinkType";

export default function useRedirectIfUnauthenticated(to: RouterLink) {
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if(!user) {
      navigate({ to });
    }
  }, [user, navigate, to]);
}