import Counts from "@/components/modules/Seller/Counts";
import RecentOrders from "@/components/modules/Seller/RecentOrders";

export const dynamic = "force-dynamic";
const SellerDashboardPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-3.5">
      <Counts />
      <RecentOrders />
    </div>
  );
};

export default SellerDashboardPage;
