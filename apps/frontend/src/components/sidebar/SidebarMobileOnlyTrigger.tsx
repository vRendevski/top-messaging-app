import { SidebarTrigger } from '@/components/ui/sidebar';
import { useIsMobile } from '@/hooks/use-mobile';

export default function SidebarMobileOnlyTrigger() {
  const isMobile = useIsMobile();

  return (
    <>
      { isMobile && <SidebarTrigger /> }
    </>
  )
}