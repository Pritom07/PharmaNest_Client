"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Image from "next/image";
import PharmaNest from "../../../public/images/PharmaNest.png";
import { authClient } from "@/lib/auth-client";
import { role } from "@/constants/role";
import { T_navlinks } from "@/types/navlinksType";
import { adminNavLinks } from "@/navlinks/adminNavlinks";
import { customerNavLinks } from "@/navlinks/customerNavlinks";
import { sellerNavLinks } from "@/navlinks/sellerNavlinks";
import { publicNavlinks } from "@/navlinks/publicNavlinks";
import { Button } from "../ui/button";
import { FaCartPlus } from "react-icons/fa6";
import { toast } from "react-toastify";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const router = useRouter();

  const [session, setSession] = useState<typeof data | null>(null);
  const { data } = authClient.useSession();

  useEffect(() => {
    setSession(data);
  }, [data]);

  const userRole = (session?.user as any)?.role as string | undefined;
  let routes: T_navlinks[] = [];

  switch (userRole) {
    case role.ADMIN:
      routes = adminNavLinks;
      break;
    case role.CUSTOMER:
      routes = customerNavLinks;
      break;
    case role.SELLER:
      routes = sellerNavLinks;
      break;
    default:
      routes = publicNavlinks;
      break;
  }

  const logOut = async () => {
    await authClient.signOut();
    toast.success("Thanks for visiting !");
    return router.push("/");
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-[#008080] shadow-md">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <div className="relative w-22 h-20">
              <Image
                src={PharmaNest}
                fill
                priority
                alt="PharmaNest Logo"
                className="object-contain"
              />
            </div>
            <h1 className="font-bold text-white text-2xl">PharmaNest</h1>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            {routes.map((link) => {
              const isActive = pathname === link.href;

              return (
                <Link
                  key={link.name}
                  href={link.href}
                  className="relative pb-1 font-medium transition text-white"
                >
                  {link.name === "Profile"
                    ? link.icon && <link.icon size={25} className="inline" />
                    : link.name}

                  {isActive && (
                    <span className="absolute left-0 bottom-0 w-full h-0.5 bg-white"></span>
                  )}
                </Link>
              );
            })}

            {userRole === role.CUSTOMER && (
              <FaCartPlus className="text-white text-xl" />
            )}

            {session ? (
              <Button
                onClick={logOut}
                className="bg-[#008080] text-white font-semibold text-[16px] lg:-mt-1 lg:-ml-3.5 cursor-pointer hover:bg-[#008080]"
              >
                Logout
              </Button>
            ) : (
              <FaCartPlus className="text-white text-xl" />
            )}
          </div>

          <button
            className="md:hidden bg-white"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <div
        className={`md:hidden bg-white shadow-md transition-all duration-300 ${
          isOpen ? "max-h-96 py-4" : "max-h-0 overflow-hidden"
        }`}
      >
        <div className="flex flex-col space-y-4 px-4">
          {routes.map((link) => {
            const isActive = pathname === link.href;

            return (
              <Link
                key={link.name}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`pb-1 font-medium border-b-2 w-fit ${
                  isActive
                    ? "text-black border-black"
                    : "text-gray-600 border-transparent"
                }`}
              >
                {link.name}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
