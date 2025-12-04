"use client";
import {
  CalendarDays,
  LayoutDashboard,
  LogOut,
  MoreVertical,
  Stethoscope,
  UsersRound,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
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
import { authClient } from "@/lib/auth-client";

// Menu items.
const items = [
  {
    title: "Dashboard",
    url: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    title: "Agedamentos",
    url: "/appointments",
    icon: CalendarDays,
  },
  {
    title: "Médicos",
    url: "/doctors",
    icon: Stethoscope,
  },
  {
    title: "Pacientes",
    url: "/patients",
    icon: UsersRound,
  },
];

export function AppSidebar() {
  const router = useRouter();
  const pathName = usePathname();

  const handleLogout = async () => {
    await authClient.signOut();
    await authClient.revokeSessions();
    router.push("/authentication");
  };

  const session = authClient.useSession();

  const handleAcronym = (name: string) => {
    return name
      ?.split(" ")
      ?.map((chart, index) => {
        if (index > 1) return;
        return chart[0];
      })
      ?.join("")
      ?.toUpperCase();
  };

  return (
    <Sidebar>
      <SidebarHeader className="py-6 pl-8">
        <Image
          src="/logo.svg"
          alt="Logo"
          width={136}
          height={28}
          loading="lazy"
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Menu principal</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton
                    asChild
                    isActive={pathName === item.url}
                    className={`data-[active=true]:bg-sidebar-primary/10 data-[active=true]:text-sidebar-primary hover:text-sidebar-primary hover:font-semibold`}
                  >
                    <Link href={item.url}>
                      <item.icon color={"var(--primary)"} />
                      <span>{item.title}</span>
                    </Link>
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
                        src={session.data?.user?.image as string}
                        alt="image profile"
                      />
                      <AvatarFallback className="h-10 w-10 rounded-lg">
                        {handleAcronym(
                          session.data?.user?.clinic?.name as string,
                        )}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0.5">
                      <p className="w-40 truncate text-sm font-bold">
                        {session.data?.user?.clinic?.name}
                      </p>
                      <p className="text-muted-foreground w-40 truncate text-xs">
                        {session.data?.user?.email}
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
                  <Button
                    variant="ghost"
                    onClick={handleLogout}
                    className="flex gap-2"
                  >
                    <LogOut size={24} color="var(--primary)" />
                    <span>logout</span>
                  </Button>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
