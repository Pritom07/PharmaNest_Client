"use client";

import { getOrderById } from "@/actions/order.action";
import { getUserStatus } from "@/actions/user.action";
import { orderItemStatus, T_orderItem } from "@/types/orderItemType";
import { T_orderResponse } from "@/types/orderResponseType";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import Swal from "sweetalert2";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { updateOrderItemStatus } from "@/actions/orderItem.action";

const ItemStatus = ["PROCESSING", "SHIPPED", "DELIVERED", "PLACED"];

const OrderItemsDisplay = ({
  orderItems,
  id,
}: {
  orderItems: T_orderItem[];
  id: string;
}) => {
  const [status, setStatus] = useState();
  const [orderinfo, setOrderInfo] = useState<T_orderResponse>();
  const router = useRouter();
  const hasShown = useRef(false);

  useEffect(() => {
    (async () => {
      const { data } = await getUserStatus();
      const userStatus = data?.data.status;
      setStatus(userStatus);

      if (userStatus !== "ACTIVE" && !hasShown.current) {
        hasShown.current = true;
        await Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Currently You Are Not Allowed For This Action !",
          confirmButtonColor: "#008080",
        });
        router.replace("/seller/orders");
      }
    })();

    (async () => {
      const { data } = await getOrderById(id);
      const orderData = data?.data;
      setOrderInfo(orderData);
    })();
  }, []);

  if (status !== "ACTIVE") {
    return null;
  }

  const handleStatusChange = async (id: string, status: orderItemStatus) => {
    await updateOrderItemStatus(id, { status });
  };

  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 max-w-4xl mx-auto gap-1 md:gap-6 bg-[#A2D2E2] rounded-xl px-6 py-7">
        <div className="space-y-1 text-sm md:text-base">
          <h1 className="font-semibold lg:text-[18px]">
            Customer Name : {orderinfo?.customer?.name}
          </h1>
          <h1 className="font-semibold lg:text-[18px]">
            Phone Number : {orderinfo?.phoneNumber}
          </h1>
          <h1 className="font-semibold lg:text-[18px]">
            Address : {orderinfo?.address}
          </h1>
        </div>

        <div className="space-y-1 text-sm md:text-base">
          <h1 className="font-semibold lg:text-[18px]">
            Seller ID : {orderinfo?.seller_id}
          </h1>
          <h1 className="font-semibold lg:text-[18px]">
            trnx ID : {orderinfo?.trnxID}
          </h1>
          <h1 className="font-semibold lg:text-[18px]">
            Order Placed :{" "}
            {new Date(orderinfo?.createdAt as Date).toLocaleDateString(
              "en-GB",
              {
                day: "numeric",
                month: "long",
                year: "numeric",
              },
            )}
          </h1>
        </div>
      </div>

      <h1 className="text-center text-xl md:text-3xl font-bold mt-8">
        Update Order Status Here !
      </h1>

      <div className="mt-6 space-y-4 pb-6 lg:pb-0">
        {orderItems.map((order: T_orderItem) => (
          <div key={order.id} className="bg-white rounded-xl p-3 shadow-sm">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-y-2.5 lg:gap-4 px-2">
              <div className="flex flex-col lg:flex-row items-center gap-3">
                <div className="relative w-16 h-14 md:w-20 md:h-16">
                  <Image
                    src={order.medicine?.img_url as string}
                    alt={order.medicine?.name as string}
                    fill
                    priority
                    className="object-contain"
                  />
                </div>

                <h1 className="font-bold lg:font-semibold text-[15px] md:text-[17px]">
                  {order.medicine?.name}
                </h1>
              </div>

              <h1 className="font-semibold text-[15px] md:text-[17px]">
                Price : {order.price}
              </h1>

              <h1 className="font-semibold text-[15px] md:text-[17px]">
                Quantity : {order.quantity}
              </h1>

              <div className="flex items-center gap-2">
                <span className="font-semibold text-sm md:text-[17px]">
                  Status :
                </span>

                <span
                  className={`text-white px-3 py-1 text-xs md:text-[16px] font-semibold rounded
                  ${order.status === "PLACED" && "bg-lime-600"}
                  ${order.status === "PROCESSING" && "bg-pink-500"}
                  ${order.status === "SHIPPED" && "bg-indigo-500"}
                  ${order.status === "CANCELLED" && "bg-red-600"}
                  ${order.status === "DELIVERED" && "bg-fuchsia-600"}
                `}
                >
                  {order.status}
                </span>
              </div>

              {order.price_paying_status === true ? (
                <span className="bg-green-700 text-white text-center px-3 py-1 text-xs md:text-[16px] font-semibold rounded">
                  PAID
                </span>
              ) : order.status === "CANCELLED" ? (
                <h1 className="text-slate-600 text-[17px] font-semibold">
                  Customer cancelled it !
                </h1>
              ) : (
                <div className="w-full sm:w-52">
                  <Combobox
                    items={ItemStatus}
                    onValueChange={(status: orderItemStatus | null) => {
                      if (!status) return;
                      handleStatusChange(order.id, status);
                    }}
                  >
                    <ComboboxInput placeholder="Update Status" />
                    <ComboboxContent>
                      <ComboboxList>
                        {(item) => (
                          <ComboboxItem key={item} value={item}>
                            {item}
                          </ComboboxItem>
                        )}
                      </ComboboxList>
                    </ComboboxContent>
                  </Combobox>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default OrderItemsDisplay;
