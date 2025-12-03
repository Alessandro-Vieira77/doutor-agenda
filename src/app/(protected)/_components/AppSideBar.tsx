import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import Image from "next/image";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "#",
    icon: LayoutDashboard,
  },
  {
    title: "Agedamentos",
    url: "#",
    icon: CalendarDays,
  },
  {
    title: "Médicos",
    url: "#",
    icon: Stethoscope,
  },
  {
    title: "Pacientes",
    url: "#",
    icon: UsersRound,
  },
];

export function AppSidebar() {
  return (
    <Sidebar>
      <SidebarHeader className="py-6 pl-8">
        <Image src="/logo.svg" alt="Logo" width={136} height={28} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <item.icon />
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton className="flex h-20 w-full items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Avatar className="h-10 w-10 rounded-lg">
                      <AvatarImage
                        src="https://github.com/shadcn.png"
                        alt="image profile"
                      />
                      <AvatarFallback>SC</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <p className="text-sm font-bold">Shadcn</p>
                      <p className="text-muted-foreground text-xs">
                        valessando33@gmail.com
                      </p>
                    </div>
                  </div>
                  <MoreVertical size={24} color="var(--primary)" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="right"
                className="flex items-center gap-4"
              >
                <DropdownMenuItem className="flex w-full items-center gap-4">
                  <LogOut size={24} color="var(--primary)" />
                  <span>logout</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
