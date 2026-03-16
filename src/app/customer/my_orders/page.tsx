import Orders from "@/components/modules/Customer/Orders";
import { orderServices } from "@/services/order.service";

const OrderPage = async () => {
  const { data } = await orderServices.getAllOrders();
  const customerOrders = data?.data;
  return (
    <div className="max-w-7xl mx-auto px-3.5 pt-5">
      <Orders customerOrders={customerOrders} />
    </div>
  );
};

export default OrderPage;
