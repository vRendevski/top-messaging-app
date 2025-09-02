import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarGroupContent,
  SidebarMenu,
} from '@/components/ui/sidebar';
import SidebarChatroomMenuItem from './SidebarChatroomMenuItem';
import SidebarUserFooter from './SidebarUserFooter';
import  { useChatrooms } from '@/hooks/useChatrooms';

export default function ChatSidebar() {
  const { chatrooms, dispatch } = useChatrooms();
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Messages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              { chatrooms.map(chatroom => (
                <SidebarChatroomMenuItem 
                  key={chatroom.id} 
                  name={chatroom.name}  
                  isActive={chatroom.isActive}
                  unreadCount={chatroom.unreadCount}
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