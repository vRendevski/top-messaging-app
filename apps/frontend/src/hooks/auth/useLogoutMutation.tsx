import { useMutation } from "@tanstack/react-query";
import authService from "@/services/authService";

export default function useLogoutMutation(){
  const { mutateAsync } = useMutation({
    mutationFn: authService.logout
  });

  return mutateAsync;
}