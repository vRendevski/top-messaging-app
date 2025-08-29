import { createFileRoute } from '@tanstack/react-router'
import CenteredLayout from '@/components/layouts/CenteredLayout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from '@/components/ui/card';
import LoginForm from '@/components/forms/LoginForm';
import InlineButtonLink from '@/components/shared/InlineButtonLink';

export const Route = createFileRoute('/login')({
  component: LoginComponent,
})

function LoginComponent() {
  return (
    <CenteredLayout>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Ready to party? We are!
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LoginForm />
        </CardContent>
        <CardFooter>
          No account yet? 
          <InlineButtonLink to="/signup">Signup</InlineButtonLink>
        </CardFooter>
      </Card>
    </CenteredLayout>
  );
}
