import OrderDetailsDisplay from "@/components/modules/Customer/OrderDetailsDisplay";
import { orderItemServices } from "@/services/orderItem.services";

const OrderDetailPage = async ({
  params,
}: {
  params: Promise<{ id: string }>;
}) => {
  const { id } = await params;
  const { data } = await orderItemServices.getAllOrderItems(id);
  const paidOrders = data?.paidOrders;
  const deliveredOrders = data?.deliveredOrders;
  const cancelledOrders = data?.cancelledOrders;
  const generalOrders = data?.generalOrders;
  return (
    <div className="max-w-7xl mx-auto px-3.5 pt-7 pb-8">
      <OrderDetailsDisplay
        id={id}
        paidOrders={paidOrders}
        deliveredOrders={deliveredOrders}
        cancelledOrders={cancelledOrders}
        generalOrders={generalOrders}
      />
    </div>
  );
};

export default OrderDetailPage;
