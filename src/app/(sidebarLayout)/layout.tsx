import { AppSidebar } from "@/components/layout/app-sidebar";
import { Separator } from "@/components/ui/separator";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { role } from "@/constants/role";
import { userServices } from "@/services/user.service";
import { USER_ROLE } from "@/types/userType";
import React from "react";

const SidebarLayout = async ({
  adminSlot,
  sellerSlot,
}: {
  adminSlot: React.ReactNode;
  sellerSlot: React.ReactNode;
}) => {
  const data = await userServices.getSession();
  const userRole = data?.user.role;
  return (
    <SidebarProvider>
      <AppSidebar userRole={userRole as USER_ROLE} />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
          <SidebarTrigger className="-ml-1" />
          <Separator
            orientation="vertical"
            className="mr-2 data-[orientation=vertical]:h-4"
          />
        </header>
        <div>{userRole === role.ADMIN ? adminSlot : sellerSlot}</div>
      </SidebarInset>
    </SidebarProvider>
  );
};

export default SidebarLayout;
