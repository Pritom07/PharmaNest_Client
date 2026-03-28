import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { T_medicineData } from "@/types/medicineDataTypes";
import Image from "next/image";
import Link from "next/link";
import { IoIosStar } from "react-icons/io";

const TopRatedMedicines = ({
  topMedicines,
}: {
  topMedicines: T_medicineData[];
}) => {
  return (
    <div className="max-w-7xl mx-auto mt-6 px-3.5">
      <h1 className="font-bold text-2xl">Top Rated Medicines :</h1>

      <div className="grid griid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mt-5">
        {topMedicines?.length > 0 &&
          topMedicines?.map((medicine) => (
            <Card key={medicine.id} className="bg-white flex flex-col">
              <CardHeader>
                <div className="relative w-full h-28">
                  <Image
                    src={medicine.img_url}
                    alt="Medicine Image"
                    fill
                    priority
                    className="object-contain"
                  />
                </div>
              </CardHeader>
              <CardContent className="grow">
                <h1 className="text-xl font-bold">{medicine.name}</h1>
                <h1 className="text-slate-500 font-semibold">
                  by {medicine.manufacturer}
                </h1>
                <h1 className="text-[#008080] text-2xl font-bold mt-2">
                  TK. {medicine.price}
                </h1>
              </CardContent>
              <CardFooter>
                <div className="grid grid-cols-2 gap-10">
                  <div className="flex">
                    <IoIosStar className="text-amber-600" />
                    <IoIosStar className="text-amber-600" />
                    <IoIosStar className="text-amber-600" />
                    <IoIosStar className="text-amber-600" />
                    <IoIosStar className="text-amber-600" />
                  </div>
                  <Link href={`/shop/medicine/${medicine.id}`}>
                    <Button className="cursor-pointer text-white bg-[#008080]  hover:bg-[#008080]">
                      View Details
                    </Button>
                  </Link>
                </div>
              </CardFooter>
            </Card>
          ))}
      </div>
    </div>
  );
};

export default TopRatedMedicines;
