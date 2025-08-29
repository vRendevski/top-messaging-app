import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { type RouterLink } from '@/utils/RouterLinkType';

interface ButtonLinkProps {
  to: RouterLink,
  children: React.ReactNode,
  className?: string
}

export default function ButtonLink({ to, children, className }: ButtonLinkProps) {
  return (
    <Button asChild className={`${className}`}>
      <Link to={to}>{children}</Link>
    </Button>
  );
}