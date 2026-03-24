import Dashboard from "@/components/modules/Admin/Dashboard";
import { orderServices } from "@/services/order.service";

const AdminDashboardPage = async () => {
  const { data } = await orderServices.getStatsForAdmin();
  const platformRevenue = data?.platformRevenue;
  const userGrowth = data?.userGrowth;
  const activeListing = data?.activeListing;
  const pendingDeliveries = data?.pendingDeliveries;

  return (
    <div className="max-w-7xl mx-auto px-3.5 pt-5">
      <Dashboard
        platformRevenue={platformRevenue}
        userGrowth={userGrowth}
        activeListing={activeListing}
        pendingDeliveries={pendingDeliveries}
      />
    </div>
  );
};

export default AdminDashboardPage;
