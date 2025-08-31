import { createFileRoute } from '@tanstack/react-router'
import useRedirectIfAuthenticated from '@/hooks/useRedirectIfAuthenticated';
import useRedirectIfUnauthenticated from '@/hooks/useRedirectIfUnauthenticated';

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  useRedirectIfAuthenticated("/chat");
  useRedirectIfUnauthenticated("/login");
}
