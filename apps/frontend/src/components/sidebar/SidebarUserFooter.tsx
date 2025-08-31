import { useState } from 'react';
import {
  SidebarFooter,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from '@/components/ui/sidebar';
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem
} from '@/components/ui/dropdown-menu';
import { UserIcon, LogOutIcon, ChevronDown, ChevronUp } from 'lucide-react';
import { useAuth } from '@/hooks/useAuth';

export default function SidebarUserFooter(){
  const { user, logout } = useAuth();
  const [ isDropdownOpen, setIsDropdownOpen ] = useState<boolean>(false);

  return (
    <SidebarFooter>
      <SidebarMenu>
        <SidebarMenuItem>
          <DropdownMenu onOpenChange={setIsDropdownOpen}>
            <DropdownMenuTrigger asChild>
              <SidebarMenuButton>
                <UserIcon /> { user?.username }
                { isDropdownOpen ? <ChevronUp className="ml-auto" /> : <ChevronDown className="ml-auto" /> }
              </SidebarMenuButton>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='top' className="w-[var(--radix-popper-anchor-width)]">
              <DropdownMenuItem variant={"destructive"} onClick={logout}>
                <LogOutIcon /> Logout
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </SidebarMenuItem> 
      </SidebarMenu>
    </SidebarFooter>
  );
}