import {
  SidebarMenuItem,
  SidebarMenuButton,
  useSidebar
} from '@/components/ui/sidebar';
import { useNavigate } from '@tanstack/react-router';
import UserPresence from '../shared/UserPresence';

interface SidebarChatroomMenuItemProps {
  id: number,
  username: string,
  isOnline: boolean,
}

export default function SidebarUserChatMenuItem({ id, username, isOnline }: SidebarChatroomMenuItemProps) {
  const navigate = useNavigate();
  const { setOpenMobile } = useSidebar();

  function handleMenuItemButtonClick(){
    setOpenMobile(false);
    navigate({ to: "/chat/$chatId", params: { chatId: id }});
  }

  return (
    <SidebarMenuItem>
      <SidebarMenuButton onClick={handleMenuItemButtonClick}>
        <UserPresence username={username} isOnline={isOnline} /> 
      </SidebarMenuButton>
    </SidebarMenuItem>
  );
}