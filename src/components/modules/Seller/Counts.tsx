import { Button } from "@/components/ui/button";
import Link from "next/link";

const Counts = () => {
  return (
    <div className="pt-6">
      <div className="flex flex-col lg:flex-row justify-between items-center">
        <h1 className="text-3xl font-bold">Seller Dashboard</h1>
        <section className="flex justify-center items-center gap-3 mt-4 lg:mt-0">
          <Link href="/seller/medicines">
            <Button className="bg-[#008080] hover:bg-[#008080] cursor-pointer">
              Manage Medicines
            </Button>
          </Link>
          <Link href="/seller/orders">
            <Button className="bg-[#008080] hover:bg-[#008080] cursor-pointer">
              Orders
            </Button>
          </Link>
        </section>
      </div>
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mt-6">
        <div className="bg-white shadow-xl rounded-2xl p-10 border-2 border-green-600">
          <h1 className="text-center text-2xl font-bold">Total Revenue</h1>
          <h1 className="text-center text-3xl font-bold mt-2 text-green-600">
            $1400
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-10 border-2 border-blue-600">
          <h1 className="text-center text-2xl font-bold">Active Orders</h1>
          <h1 className="text-center text-3xl font-bold mt-2 text-blue-600">
            12
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-10 border-2 border-amber-600">
          <h1 className="text-center text-2xl font-bold">Total Medicines</h1>
          <h1 className="text-center text-3xl font-bold mt-2 text-amber-600">
            250
          </h1>
        </div>
        <div className="bg-white shadow-xl rounded-2xl p-10 border-2 border-rose-600">
          <h1 className="text-center text-2xl font-bold">Low Stock Alert</h1>
          <h1 className="text-center text-3xl font-bold mt-2 text-rose-600">
            15
          </h1>
        </div>
      </section>
    </div>
  );
};

export default Counts;
