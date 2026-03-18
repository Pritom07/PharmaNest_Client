"use client";

import { getAmountData } from "@/actions/order.action";
import { cancelOrderItem } from "@/actions/orderItem.action";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableRow } from "@/components/ui/table";
import { T_amountData } from "@/types/amountDataType";
import { T_cancelOrderItem } from "@/types/cancelOrderItemType";
import { orderItemStatus, T_orderItem } from "@/types/orderItemType";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const OrderDetailsDisplay = ({
  id,
  paidOrders,
  deliveredOrders,
  cancelledOrders,
  generalOrders,
}: {
  id: string;
  paidOrders: T_orderItem[];
  deliveredOrders: T_orderItem[];
  cancelledOrders: T_orderItem[];
  generalOrders: T_orderItem[];
}) => {
  const [amountData, setAmountData] = useState<T_amountData | null>(null);

  useEffect(() => {
    const trackingAmount = async () => {
      const { data } = await getAmountData(id);
      setAmountData(data?.data);
    };
    trackingAmount();

    window.addEventListener("amountUpdated", trackingAmount);
    return () => {
      window.removeEventListener("amountUpdated", trackingAmount);
    };
  }, []);

  const handleOrderItemCancelled = async (
    id: string,
    name: string,
    price: number,
    quantity: number,
    status: orderItemStatus,
  ) => {
    const payLoad: T_cancelOrderItem = {
      price: price,
      quantity: quantity,
      status: status,
    };
    const { data } = await cancelOrderItem(id, payLoad);
    if (data.success === true) {
      toast.success(`${name} is Cancelled`);
      return window.dispatchEvent(new Event("amountUpdated"));
    }

    toast.error(`${name} isn't Cancelled`);
  };
  return (
    <div>
      <div className="bg-white w-full rounded-xl flex flex-col lg:flex-row justify-center items-start gap-10 p-8">
        <div className="w-[60%]">
          <h1 className="text-[22px] font-bold">Seller Message :</h1>
          <div className="bg-[#A2D2E2] rounded-xl text-black mt-4 p-5">
            <div className="flex flex-col justify-center items-center">
              <Button className="bg-red-600 hover:bg-red-600 p-2 rounded-xl text-white font-semibold text-xl">
                Important Notice
              </Button>
            </div>
            <div className="mt-3 text-justify font-semibold">
              Only the medicines that have already been delivered will appear in
              the <span className="font-bold">“Delivered Orders”</span> section.
              When the delivery person arrives, please first{" "}
              <span className="font-bold">receive and verify your parcel</span>.
              After confirming that you have received the correct medicine,
              click the <span className="font-bold">“Confirm to Pay”</span>{" "}
              button for that specific item. This action allows us to{" "}
              <span className="font-bold">
                track your total paid amount accurately
              </span>
              . Please note that if you click the
              <span className="font-bold">“Confirm to Pay”</span> button before{" "}
              <span className="font-bold">actually receiving the parcel</span>,
              the delivery person may assume that you have already received the
              medicine. In that case, the parcel may{" "}
              <span className="font-bold">not be handed over again</span>.{" "}
              <h1 className="mt-2">
                The <span className="font-bold">delivery charge</span> is
                applicable only for your{" "}
                <span className="font-bold">first parcel</span>.
                <span className="font-bold">
                  {" "}
                  No additional delivery charges
                </span>{" "}
                will be required for subsequent parcels.
              </h1>
              <h1 className="font-bold mt-2">
                Thank you for being with us. 🌷
              </h1>
            </div>
          </div>
        </div>
        <div className="w-[40%]">
          <h1 className="text-[22px] font-bold">Customer Section :</h1>
          <div className="bg-[#A2D2E2] rounded-xl text-black mt-4 p-5">
            <div className="flex flex-col justify-center items-center">
              <Button className="bg-green-600 hover:bg-green-600 text-xl font-semibold rounded-xl">
                Tracking Amount
              </Button>
            </div>
            <div className="mt-3">
              <Table className="font-bold text-[16px]">
                <TableBody>
                  <TableRow>
                    <TableCell>SubTotal</TableCell>
                    <TableCell>{amountData?.subtotal_amount} TK.</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Delivery Charge</TableCell>
                    <TableCell>{amountData?.delivery_charge} TK.</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Total</TableCell>
                    <TableCell>{amountData?.total_amount} TK.</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Paid</TableCell>
                    <TableCell>{amountData?.total_paid_amount} TK.</TableCell>
                  </TableRow>

                  <TableRow>
                    <TableCell>Due</TableCell>
                    <TableCell>
                      {Number(amountData?.total_amount) -
                        Number(amountData?.total_paid_amount)}{" "}
                      TK.
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
              <div className="mt-3">
                {amountData?.delivery_charge_status === true ? (
                  <Button className="w-full bg-[#008080] hover:bg-[#008080] text-[15px] font-semibold">
                    Delivery Charge Paid
                  </Button>
                ) : (
                  <Button className="w-full bg-[#008080] hover:bg-[#008080] text-[15px] font-semibold cursor-pointer">
                    Pay Delivery Charge
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white w-full rounded-xl mt-5 p-8">
        <h1 className="text-center text-4xl font-bold">Order Summery</h1>
        <section className="flex flex-col lg:flex-row justify-center items-start gap-5 mt-6">
          <div>
            <div className="border-2  border-slate-400 rounded-xl p-5">
              <h1 className="text-2xl font-bold">Delivered Orders :</h1>
              <div>
                {deliveredOrders.length === 0 ? (
                  <h1 className="mt-3.5 text-slate-500 text-[17px] font-semibold">
                    No Medicine Delivered Yet !
                  </h1>
                ) : (
                  deliveredOrders.map((orderItem: T_orderItem) => (
                    <div
                      key={orderItem.id}
                      className="bg-[#A2D2E2] rounded-xl p-3 mt-3.5 text-black font-semibold"
                    >
                      <div className="grid grid-cols-4 gap-4 ">
                        <h1 className="truncate">{orderItem.medicine?.name}</h1>
                        <h1>Quantity : {orderItem.quantity}</h1>
                        <h1>Price : {orderItem.price} TK.</h1>
                        <span className="text-center text-white bg-fuchsia-600 rounded-xl">
                          {orderItem.status === "DELIVERED" &&
                            orderItem.price_paying_status === false &&
                            "DELIVERED"}
                        </span>
                      </div>
                      <Button className="w-full mt-3 text-[16px] bg-green-700 hover:bg-green-700 cursor-pointer">
                        Confirm To Pay
                      </Button>
                    </div>
                  ))
                )}
              </div>
            </div>
            <div className="border-2  border-slate-400 rounded-xl mt-5 p-5">
              <h1 className="text-2xl font-bold">Paid Orders :</h1>
              <div>
                {paidOrders.length === 0 ? (
                  <h1 className="mt-3.5 text-slate-500 text-[17px] font-semibold">
                    No Paid Medicines Found !
                  </h1>
                ) : (
                  paidOrders.map((orderItem: T_orderItem) => (
                    <div
                      key={orderItem.id}
                      className="grid grid-cols-4 gap-4 bg-[#A2D2E2] rounded-xl p-3 mt-3.5 text-black font-semibold"
                    >
                      <h1 className="truncate">{orderItem.medicine?.name}</h1>
                      <h1>
                        Price :{" "}
                        {Number(orderItem.price) * Number(orderItem.quantity)}{" "}
                        TK.
                      </h1>
                      <span className="text-center text-white bg-fuchsia-600  rounded-xl">
                        {orderItem.status}
                      </span>
                      <span className="text-center text-white bg-green-700 rounded-xl">
                        {orderItem.price_paying_status === true && "PAID"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>

          <div>
            <div className="border-2  border-slate-400 rounded-xl p-5">
              <h1 className="text-2xl font-bold">All Orders :</h1>
              <div>
                {generalOrders.map((orderItem: T_orderItem) => (
                  <div
                    key={orderItem.id}
                    className="bg-[#A2D2E2] rounded-xl py-3 px-2 mt-3.5 text-black font-semibold"
                  >
                    <div className="grid grid-cols-4 gap-4 ">
                      <h1 className="truncate">{orderItem.medicine?.name}</h1>
                      <h1>Quantity : {orderItem.quantity}</h1>
                      <h1>Price : {orderItem.price} TK.</h1>
                      <span
                        className={`text-center text-white rounded-xl ${orderItem.status === "PLACED" && "bg-lime-600"} ${orderItem.status === "PROCESSING" && "bg-pink-500"} ${orderItem.status === "SHIPPED" && "bg-indigo-500"} `}
                      >
                        {orderItem.status}
                      </span>
                    </div>
                    <Button
                      onClick={() =>
                        handleOrderItemCancelled(
                          orderItem.id,
                          orderItem.medicine?.name as string,
                          orderItem.price,
                          orderItem.quantity,
                          orderItem.status,
                        )
                      }
                      className="w-full mt-3 text-[16px] cursor-pointer bg-red-600 hover:bg-red-600"
                      hidden={
                        orderItem.status === "PROCESSING" ||
                        orderItem.status === "SHIPPED"
                      }
                    >
                      Cancel Order
                    </Button>
                  </div>
                ))}
              </div>
            </div>
            <div className="border-2  border-slate-400 rounded-xl mt-5 p-5">
              <h1 className="text-2xl font-bold">Cancelled Orders :</h1>
              <div>
                {cancelledOrders.length === 0 ? (
                  <h1 className="mt-3.5 text-slate-500 text-[17px] font-semibold">
                    No Medicines Have Been Cancelled.
                  </h1>
                ) : (
                  cancelledOrders.map((orderItem: T_orderItem) => (
                    <div
                      key={orderItem.id}
                      className="grid grid-cols-4 gap-4 bg-[#A2D2E2] rounded-xl p-3 mt-3.5 text-black font-semibold"
                    >
                      <h1 className="truncate">{orderItem.medicine?.name}</h1>
                      <h1>Quantity : {orderItem.quantity}</h1>
                      <h1>Price : {orderItem.price} TK.</h1>
                      <span className="text-center bg-red-600 text-white rounded-xl">
                        {orderItem.status === "CANCELLED" && "CANCELLED"}
                      </span>
                    </div>
                  ))
                )}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default OrderDetailsDisplay;
