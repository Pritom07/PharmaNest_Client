import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const TopRatedMedicines = () => {
  return (
    <div className="max-w-7xl mx-auto mt-6">
      <h1 className="font-bold text-2xl pl-2.5">Top Rated Medicines</h1>
      <div className="grid griid-cols-1 sm:grid-cols-2 lg:grid-cols-4 mt-5">
        <Card className="bg-white">
          <CardHeader>
            <div>
              {/* <Image src={} alt="" /> */}
              <h1>Drug Image</h1>
            </div>
          </CardHeader>
          <CardContent>
            <h1 className="text-xl font-bold">Drug Name</h1>
            <h1 className="text-slate-500 font-semibold">by Manufacturer</h1>
            <h1 className="text-[#008080] text-2xl font-bold">$ 122</h1>
          </CardContent>
          <CardFooter>
            <div className="grid grid-cols-2 gap-10">
              <h1>Rating</h1>
              <Button className="cursor-pointer text-white bg-[#008080]  hover:bg-[#008080]">
                Add to Cart
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default TopRatedMedicines;
