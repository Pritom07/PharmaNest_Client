import { orderItemServices } from "@/services/orderItem.services";

const OrderDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await orderItemServices.getAllOrderItems(id);
  const orderItems = data?.data;
  return (
    <div className="max-w-7xl mx-auto px-3.5 pt-5">
      <h1>order detail page :{id}</h1>
    </div>
  );
};

export default OrderDetailPage;
