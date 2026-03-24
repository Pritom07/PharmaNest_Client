import { Button } from "@/components/ui/button";
import Link from "next/link";
import OrderVsDateChart from "./OrderVsDateChart";
import { T_adminStats } from "@/types/adminStatsType";

const Dashboard = ({
  platformRevenue,
  userGrowth,
  activeListing,
  pendingDeliveries,
}: T_adminStats) => {
  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-2xl lg:text-3xl font-bold">
          Admin Dashboard
        </h1>
        <Link href="/admin/categoryManagement">
          <Button className="bg-[#008080] hover:bg-[#008080] font-semibold cursor-pointer">
            Administration
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 mt-6">
        <div className="bg-white rounded-xl px-5 py-10 shadow-2xl border-2 border-emerald-600">
          <h1 className="text-center text-2xl font-bold">Platform Revenue</h1>
          <h1 className="text-center text-4xl font-semibold mt-1 text-emerald-600">
            {platformRevenue}
          </h1>
        </div>
        <div className="bg-white rounded-xl px-5 py-10 border-2 border-blue-600 shadow-2xl">
          <h1 className="text-center text-2xl font-bold">User Growth</h1>
          <div className="mt-1 text-center">
            <h1 className="text-[18px] font-bold text-blue-600">
              Customers : {userGrowth.customer}
            </h1>
            <h1 className="text-[18px] font-bold text-blue-600">
              Sellers : {userGrowth.seller}
            </h1>
          </div>
        </div>
        <div className="bg-white rounded-xl px-5 py-10 shadow-2xl border-2 border-purple-600">
          <h1 className="text-center text-2xl font-bold">Active Listing</h1>
          <h1 className="text-center text-4xl font-semibold mt-1 text-purple-600">
            {activeListing}
          </h1>
        </div>
        <div className="bg-white rounded-xl px-5 py-10 shadow-2xl border-2 border-amber-600">
          <h1 className="text-center text-2xl font-bold">Pending Deliveries</h1>
          <h1 className="text-center text-4xl font-semibold mt-1 text-amber-600">
            {pendingDeliveries}
          </h1>
        </div>
      </div>

      <div className="pt-14 pb-12">
        <OrderVsDateChart />
      </div>
    </div>
  );
};

export default Dashboard;
