import CenteredLayout from '@/components/layouts/CenteredLayout';
import ButtonLink from '@/components/shared/ButtonLink';
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: IndexComponent,
})

function IndexComponent() {
  return (
    <CenteredLayout>
      <section className="p-4">
        <h1 className="text-md md:text-2xl lg:text-3xl">
          Messaging, Reimagined for Privacy
        </h1>
        <div className="mt-2 flex gap-2">
          <ButtonLink to="/login">Login</ButtonLink>
          <ButtonLink to="/signup">Signup</ButtonLink>
        </div>
      </section>
    </CenteredLayout>
  );
}
