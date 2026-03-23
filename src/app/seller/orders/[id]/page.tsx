import OrderItemsDisplay from "@/components/modules/Seller/OrderItemsDisplay";
import { orderItemServices } from "@/services/orderItem.services";

const StatusUpdationPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await orderItemServices.getAllOrderItemForSeller(id);
  const orderItems = data?.data;
  return (
    <div className="max-w-7xl mx-auto px-3.5 pt-5">
      <OrderItemsDisplay orderItems={orderItems} id={id} />
    </div>
  );
};

export default StatusUpdationPage;
