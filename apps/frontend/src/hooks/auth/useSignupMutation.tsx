import { useMutation } from "@tanstack/react-query"
import authService from "@/services/authService"

interface UseSignupMutationProps {
  username: string,
  email: string,
  password: string
}

export default function useSignupMutation() {
  const { mutateAsync } = useMutation({ 
    mutationFn: ({ username, email, password }: UseSignupMutationProps) => authService.signup(username, email, password), 
  });

  return mutateAsync;
}