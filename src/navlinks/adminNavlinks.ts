import { T_navlinks } from "@/types/navlinksType";
import { CgProfile } from "react-icons/cg";

export const adminNavLinks: T_navlinks[] = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Admin Dashboard", href: "/admin_dashboard" },
  { name: "Profile", href: "/profile", icon: CgProfile }
];
