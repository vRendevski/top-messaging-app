import { useMutation } from '@tanstack/react-query';
import authService from '@/services/authService';

interface LoginMutationProps {
  email: string,
  password: string
}

export default function useLoginMutation() {
  const { mutateAsync } = useMutation({
    mutationFn: ({ email, password }: LoginMutationProps) => authService.login(email, password)
  });

  return mutateAsync;
}