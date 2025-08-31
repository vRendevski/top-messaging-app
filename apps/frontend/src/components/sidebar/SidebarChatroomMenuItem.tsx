import {
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarMenuBadge
} from '@/components/ui/sidebar';
import OnlineCircle from '../shared/OnlineCircle';
import OfflineCircle from '../shared/OfflineCircle';

interface SidebarChatroomMenuItemProps {
  name: string,
  isActive: boolean,
  unreadCount: number
}

export default function SidebarChatroomMenuItem({ name, isActive, unreadCount }: SidebarChatroomMenuItemProps) {
  return (
    <SidebarMenuItem>
      <SidebarMenuButton>
        { isActive ? <OnlineCircle /> : <OfflineCircle /> }
        { name }
        { unreadCount > 0 && <SidebarMenuBadge>{ unreadCount }</SidebarMenuBadge> }
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}