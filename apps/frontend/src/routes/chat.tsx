import { useEffect } from 'react';
import { createFileRoute, Outlet } from '@tanstack/react-router';
import { SidebarProvider } from '@/components/ui/sidebar';
import ChatroomContextProvider from '@/hooks/useChatrooms';
import ChatSidebar from '@/components/sidebar/ChatSidebar';
import SidebarMobileOnlyTrigger from '@/components/sidebar/SidebarMobileOnlyTrigger';
import useRedirectIfUnauthenticated from '@/hooks/useRedirectIfUnauthenticated';
import { useSocket } from '@/hooks/useSocket';

export const Route = createFileRoute('/chat')({
  component: ChatComponent,
})

function ChatComponent() {
  useRedirectIfUnauthenticated("/");

  const { socket } = useSocket();

  useEffect(() => {
    socket.connect();

    return () => {
      socket.disconnect();
    }
  }, [socket]);

  return (
    <SidebarProvider>
      <ChatroomContextProvider>
        <ChatSidebar />
        <SidebarMobileOnlyTrigger />
        <Outlet/>
      </ChatroomContextProvider>
    </SidebarProvider>
  );
}
