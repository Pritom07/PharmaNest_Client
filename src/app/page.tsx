import Features from "@/components/modules/Features";
import Support from "@/components/modules/Support";
import TopRatedMedicines from "@/components/modules/TopRatedMedicines";
import { Home_Accordion } from "@/components/modules/Accordion";
import Image from "next/image";
import { publicServices } from "@/services/public.services";
import Reviews from "@/components/modules/Reviews";
import { reviewServices } from "@/services/review.services";

export default async function Home() {
  const { data } = await publicServices.getTopRatedMedicine();
  const { data: allReviews } = await reviewServices.gettingAllReviews();
  const topMedicines = data?.data;
  const reviews = allReviews?.data;

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
      <Reviews reviews={reviews} />
      <Support />
    </div>
  );
}
