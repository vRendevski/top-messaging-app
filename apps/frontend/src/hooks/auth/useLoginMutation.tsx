import { useMutation } from '@tanstack/react-query';
import authService from "@/services/authService"

interface UseLoginMutationProps {
  email: string,
  password: string
}

export default function useLoginMutation() {
  const { mutateAsync } = useMutation({ 
    mutationFn: ({ email, password }: UseLoginMutationProps) => authService.login(email, password),
  });

  return mutateAsync;
}