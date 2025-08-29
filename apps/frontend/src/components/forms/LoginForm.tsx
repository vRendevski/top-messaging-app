import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { AuthSchemas, type AuthTypes } from '@vRendevski/shared/schemas/rest';
import { zodV4Resolver } from '@/utils/zodV4Resolver';
import useLoginMutation from '@/hooks/useLoginMutation';
import InputField from './InputField';

export default function LoginForm() {
  const login = useLoginMutation();
  const form = useForm<AuthTypes.LoginBody>({
    resolver: zodV4Resolver(AuthSchemas.requests.login.body),
    defaultValues: {
      email: "",
      password: ""
    }
  });

  async function onSubmit(data: AuthTypes.LoginBody) {
    await login(data);
  }
  
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="grid gap-4">
        <InputField control={form.control} name="email" label="Email" type="email" />
        <InputField control={form.control} name="password" label="Password" type="password" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  )
}