import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';
import { type RouterLink } from '@/utils/RouterLinkType';

interface InlineButtonLinkProps {
  to: RouterLink,
  children: React.ReactNode,
  className?: string
}

export default function InlineButtonLink({ to, children, className = "" }: InlineButtonLinkProps) {
  return (
    <Button variant={'link'} className={`px-1 text-sky-500 ${className}`} asChild>
      <Link to={to}>{children}</Link>
    </Button>
  )
}