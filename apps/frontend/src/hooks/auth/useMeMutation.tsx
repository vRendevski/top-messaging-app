import { useMutation } from "@tanstack/react-query";
import authService from "@/services/authService"

export default function useMeMutation() {
  const { mutateAsync } = useMutation({
    mutationKey: ["me"], 
    mutationFn: authService.me,
  });

  return mutateAsync;
}