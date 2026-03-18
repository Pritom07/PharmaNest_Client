"use server";

import { orderItemServices } from "@/services/orderItem.services";
import { T_cancelOrderItem } from "@/types/cancelOrderItemType";
import { revalidateTag } from "next/cache";

export const cancelOrderItem = async (
  id: string,
  payLoad: T_cancelOrderItem,
) => {
  const res = await orderItemServices.cancelOrderItem(id, payLoad);
  revalidateTag("orderItemUpdated", "max");
  return res;
};
