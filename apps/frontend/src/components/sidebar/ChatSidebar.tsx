import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from '@/components/ui/sidebar';
import SidebarUserChatMenuItem from './SidebarUserChatMenuItem';
import SidebarUserFooter from './SidebarUserFooter';
import { useUserChats } from '@/hooks/useUserChats';

export default function ChatSidebar() {
  const { userChats } = useUserChats();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Direct Messages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              { userChats.map(userChat => (
                <SidebarUserChatMenuItem
                  key={userChat.id} 
                  id={userChat.id}
                  username={userChat.username}  
                  isOnline={userChat.isOnline}
                />
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarUserFooter /> 
    </Sidebar>
  );
}