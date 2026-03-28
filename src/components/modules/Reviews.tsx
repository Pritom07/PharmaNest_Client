import { T_review } from "@/types/reviewType";
import Marquee from "react-fast-marquee";
import { Card, CardContent, CardHeader } from "../ui/card";
import Image from "next/image";
import { FaCircleUser } from "react-icons/fa6";

const Reviews = ({ reviews }: { reviews: T_review[] }) => {
  return (
    <div className="max-w-7xl mx-auto px-3.5 pt-5">
      <h1 className="text-xl sm:text-2xl font-bold text-center sm:text-left">
        What Our Customers Say :
      </h1>

      <Marquee pauseOnHover speed={50} className="mt-7">
        {reviews?.map((review: T_review) => (
          <Card
            key={review.id}
            className="w-65 sm:w-75 md:w-85 lg:w-90 mx-3 flex flex-col justify-between min-h-65
            "
          >
            <CardHeader>
              <div className="flex flex-col items-center text-center">
                {review.customer?.image ? (
                  <div className="relative w-16 h-16 sm:w-20 sm:h-20 rounded-full overflow-hidden">
                    <Image
                      src={review.customer.image}
                      alt={review.customer.name}
                      fill
                      priority
                      className="object-cover"
                    />
                  </div>
                ) : (
                  <FaCircleUser className="w-16 h-16 text-gray-400" />
                )}

                <h1 className="mt-2 font-bold text-base sm:text-lg">
                  {review.customer?.name}
                </h1>
              </div>
            </CardHeader>

            <CardContent className="text-center px-4 pb-6">
              <span className="text-2xl font-bold">“</span>

              <p className="italic text-slate-600 text-[16px] sm:text-[16px] font-medium truncate">
                {review.comment}
              </p>

              <span className="text-2xl font-bold">”</span>
            </CardContent>
          </Card>
        ))}
      </Marquee>
    </div>
  );
};

export default Reviews;
