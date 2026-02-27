import Link from "next/link";
import { FaFacebook } from "react-icons/fa";
import { FaLinkedin } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
import { FaSquareXTwitter } from "react-icons/fa6";

const Footer = () => {
  return (
    <footer className="bg-[#A2D2E2]">
      <div className="max-w-7xl mx-auto px-6 sm:px-10 lg:px-16 py-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          <div>
            <h1 className="font-bold text-lg sm:text-xl">Quick Links</h1>
            <div className="mt-4 space-y-2">
              <Link href="/shop" className="underline font-semibold block">
                Shop
              </Link>
              <Link href="/login" className="underline font-semibold block">
                Login
              </Link>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-lg sm:text-xl">Resources</h1>
            <div className="mt-4 space-y-2">
              <Link href="#" className="underline font-semibold block">
                Help
              </Link>
              <Link href="#" className="underline font-semibold block">
                Sales
              </Link>
              <Link href="#" className="underline font-semibold block">
                Advertise
              </Link>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-lg sm:text-xl">Contact Info</h1>
            <div className="mt-4 font-semibold space-y-1">
              <p>
                <span className="font-bold">Email:</span>{" "}
                pritommohajon4545@gmail.com
              </p>
              <p>
                <span className="font-bold">Address:</span> Nawab Siraj-ud-Dowla
                Road, Chattogram
              </p>
            </div>
          </div>

          <div>
            <h1 className="font-bold text-lg sm:text-xl">Social Media</h1>
            <div className="mt-4 flex items-center gap-4">
              <FaFacebook className="text-2xl sm:text-3xl cursor-pointer hover:scale-110 transition" />
              <FaLinkedin className="text-2xl sm:text-3xl cursor-pointer hover:scale-110 transition" />
              <FaWhatsappSquare className="text-2xl sm:text-3xl cursor-pointer hover:scale-110 transition" />
              <FaSquareXTwitter className="text-2xl sm:text-3xl cursor-pointer hover:scale-110 transition" />
            </div>
          </div>
        </div>

        <div className="border-t border-black/20 mt-10 pt-6 text-center text-sm sm:text-base font-medium">
          © {new Date().getFullYear()} PharmaNest. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
