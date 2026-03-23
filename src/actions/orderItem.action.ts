"use server";

import { orderItemServices } from "@/services/orderItem.services";
import { T_cancelOrderItem } from "@/types/cancelOrderItemType";
import { orderItemStatus } from "@/types/orderItemType";
import { T_payOrderItem } from "@/types/payOrderItemType";
import { revalidateTag } from "next/cache";

export const cancelOrderItem = async (
  id: string,
  payLoad: T_cancelOrderItem,
) => {
  const res = await orderItemServices.cancelOrderItem(id, payLoad);
  revalidateTag("orderItemUpdated", "max");
  return res;
};

export const deliveredStatusChecking = async (id: string) => {
  return await orderItemServices.deliveredStatusChecking(id);
};

export const payOrderItem = async (id: string, payLoad: T_payOrderItem) => {
  const res = await orderItemServices.payOrderItem(id, payLoad);
  revalidateTag("orderItemUpdated", "max");
  return res;
};

export const getActiveRevenue = async () => {
  const res = await orderItemServices.getActiveRevenue();
  revalidateTag("orderItemUpdated", "max");
  return res;
};

export const updateOrderItemStatus = async (
  id: string,
  payLoad: { status: orderItemStatus },
) => {
  const res = await orderItemServices.updateOrderItemStatus(id, payLoad);
  revalidateTag("orderItemUpdated", "max");
  return res;
};
