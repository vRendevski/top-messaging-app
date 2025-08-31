import { createFileRoute } from '@tanstack/react-router'
import CenteredLayout from '@/components/layouts/CenteredLayout';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter
} from "@/components/ui/card";
import SignupForm from '@/components/forms/SignupForm';
import InlineButtonLink from '@/components/shared/InlineButtonLink';
import useRedirectIfAuthenticated from '@/hooks/useRedirectIfAuthenticated';

export const Route = createFileRoute('/signup')({
  component: SignupComponent,
})

function SignupComponent() { 
  useRedirectIfAuthenticated("/");
  return (
    <CenteredLayout>
      <Card className="w-[350px]">
        <CardHeader>
          <CardTitle>Signup</CardTitle>
          <CardDescription>
            Go ahead, make our day. Sign up.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <SignupForm /> 
        </CardContent>
        <CardFooter>
          Already have an account? 
          <InlineButtonLink to='/login'>Login</InlineButtonLink>
        </CardFooter>
      </Card>
    </CenteredLayout>
  );
}
