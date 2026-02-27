import { T_navlinks } from "@/types/navlinksType";
import { CgProfile } from "react-icons/cg";

export const customerNavLinks: T_navlinks[] = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "My Orders", href: "/my_orders" },
  { name: "Profile", href: "/profile", icon: CgProfile },
];
