import { useMutation } from "@tanstack/react-query"
import authService from "@/services/authService"

interface SignupMutationProps {
  username: string,
  email: string,
  password: string
}

export default function useSignupMutation() {
  const { mutateAsync } = useMutation({
    mutationFn: ({ username, email, password }: SignupMutationProps) => authService.signup(username, email, password)
  });

  return mutateAsync;
}