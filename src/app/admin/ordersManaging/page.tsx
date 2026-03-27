import OrdersHandle from "@/components/modules/Admin/OrdersHandle";
import PaginationControll from "@/components/ui/paginationControll";
import { orderServices } from "@/services/order.service";

const OrdersManagementPage = async ({
  searchParams,
}: {
  searchParams: Promise<{ page: string }>;
}) => {
  const { page } = await searchParams;
  const { data } = await orderServices.getOrderStats({ page });
  const orders = data?.data;
  const ordersLength = orders?.length;
  const metaData = data?.metaData;
  return (
    <div className="max-w-7xl mx-auto px-3.5 pt-5">
      <OrdersHandle orders={orders} />
      <PaginationControll length={ordersLength} metaData={metaData} />
    </div>
  );
};

export default OrdersManagementPage;
