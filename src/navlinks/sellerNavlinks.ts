import { T_navlinks } from "@/types/navlinksType";
import { CgProfile } from "react-icons/cg";

export const sellerNavLinks: T_navlinks[] = [
  { name: "Home", href: "/" },
  { name: "Shop", href: "/shop" },
  { name: "Manage Medicines", href: "/manage_medicines" },
  { name: "Profile", href: "/profile", icon: CgProfile },
];
