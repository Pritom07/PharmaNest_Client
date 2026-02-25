import Features from "@/components/modules/Features";
import Support from "@/components/modules/Support";
import TopRatedMedicines from "@/components/modules/TopRatedMedicines";
import { Home_Accordion } from "@/components/modules/Accordion";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="relative w-full h-96">
        <Image
          src="/images/PharmaNestBanner.png"
          alt="PharmaNest Banner"
          fill
          priority
          className="object-cover"
        />
      </div>
      <Features />
      <TopRatedMedicines />
      <Home_Accordion />
      <Support />
    </div>
  );
}
