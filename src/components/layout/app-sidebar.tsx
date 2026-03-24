import * as React from "react";

import {
  Sidebar,
  SidebarContent,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar";
import { USER_ROLE } from "@/types/userType";
import { adminRoutes } from "@/sidebarRoutes/adminRoutes";
import { sellerRoutes } from "@/sidebarRoutes/sellerRoutes";
import { T_sidebarRoutes } from "@/types/sidebarRoutesType";

export function AppSidebar({
  userRole,
  ...props
}: { userRole: USER_ROLE } & React.ComponentProps<typeof Sidebar>) {
  let data: T_sidebarRoutes[] = [];

  switch (userRole) {
    case USER_ROLE.ADMIN:
      data = adminRoutes;
      break;
    case USER_ROLE.SELLER:
      data = sellerRoutes;
      break;
    default:
      data = [];
  }

  return (
    <Sidebar {...props} className="absolute mt-16">
      <SidebarContent>
        <SidebarGroupContent>
          <SidebarMenu className="pt-4">
            {data.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <a href={item.url} className="font-semibold text-lg">
                    {item.title}
                  </a>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroupContent>
      </SidebarContent>
      <SidebarRail />
    </Sidebar>
  );
}
