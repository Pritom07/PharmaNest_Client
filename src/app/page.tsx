import Features from "@/components/modules/Features";
import Support from "@/components/modules/Support";
import TopRatedMedicines from "@/components/modules/TopRatedMedicines";
import { Home_Accordion } from "@/components/modules/Accordion";
import Image from "next/image";
import { publicServices } from "@/services/public.services";

export default async function Home() {
  const { data } = await publicServices.getTopRatedMedicine();
  const topMedicines = data?.data;
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
      <TopRatedMedicines topMedicines={topMedicines} />
      <Home_Accordion />
      <Support />
    </div>
  );
}
