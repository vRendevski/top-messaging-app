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

export default function ChatSidebar() {
  return (
    <Sidebar>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Messages</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              <SidebarChatroomMenuItem name='haah' isActive={true} unreadCount={0}/> 
              <SidebarChatroomMenuItem name='dinodameski' isActive={false} unreadCount={5}/> 
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarUserFooter /> 
    </Sidebar>
  );
}