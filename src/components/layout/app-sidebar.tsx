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

const data = [
  {
    title: "Add New Medicine",
    url: "/seller/medicines/add_medicine",
  },
  {
    title: "View Medicines",
    url: "/seller/medicines/view_medicines",
  },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
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
