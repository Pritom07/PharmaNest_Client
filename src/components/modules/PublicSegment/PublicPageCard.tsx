import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { T_medicineData } from "@/types/medicineDataTypes";
import Image from "next/image";
import Link from "next/link";

const PublicPageCard = ({ medicine }: { medicine: T_medicineData }) => {
  const {
    id,
    name,
    price,
    stock,
    user_id,
    createdAt,
    updatedAt,
    img_url,
    manufacturer,
  } = medicine;
  return (
    <Card>
      <CardHeader>
        <div className="relative w-full h-32">
          <Image
            src={img_url}
            alt={name}
            fill
            priority
            className="object-contain"
          />
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="text-2xl font-bold">{name}</h1>
        <h1 className=" text-slate-700 text-[18px] font-semibold">
          by {manufacturer}
        </h1>
        <h1 className="mt-3.5 text-[#008080] text-3xl font-bold">
          TK. {price}
        </h1>
      </CardContent>
      <CardFooter className="flex justify-end items-center">
        <Link href={`/shop/medicine/${id}`}>
          <Button className="bg-[#008080] hover:bg-[#008080] cursor-pointer">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PublicPageCard;
