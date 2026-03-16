"use server";

import { orderServices } from "@/services/order.service";
import { T_orderMedicine } from "@/types/orderMedicineType";
import { revalidateTag } from "next/cache";

export const createOrder = async (payLoad: T_orderMedicine) => {
  const res = await orderServices.createOrder(payLoad);
  revalidateTag("orderListUpdated", "max");
  return res;
};

export const deleteOrder = async (id: string) => {
  const res = await orderServices.deleteOrder(id);
  revalidateTag("orderListUpdated", "max");
  return res;
};
