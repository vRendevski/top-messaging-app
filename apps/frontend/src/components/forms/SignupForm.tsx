import { Form } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { zodV4Resolver } from '@/utils/zodV4Resolver';
import { AuthSchemas, type AuthTypes } from '@vRendevski/shared/schemas/rest/';
import { useAuth } from '@/hooks/useAuth';
import InputField from "./InputField";

export default function SignupForm() {
  const { signup } = useAuth();
  const form = useForm<AuthTypes.RegisterBody>({
    resolver: zodV4Resolver(AuthSchemas.requests.register.body),
    defaultValues: {
      username: "",
      email: "",
      password: ""
    }
  });

  async function onSubmitValid(data: AuthTypes.RegisterBody) {
    await signup(data);
  }

  return (
    <Form {...form} >
      <form onSubmit={form.handleSubmit(onSubmitValid)} className="grid gap-4">
        <InputField control={form.control} name="username" label="Username" type="text" />
        <InputField control={form.control} name="email" label="Email" type="email" />
        <InputField control={form.control} name="password" label="Password" type="password" />
        <Button type="submit">Submit</Button>
      </form>
    </Form>
  );
}