"use server";

import { orderServices } from "@/services/order.service";
import { T_orderMedicine } from "@/types/orderMedicineType";
import { T_payDeliveryCharge } from "@/types/payDeliveryChargeType";
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

export const getAmountData = async (id: string) => {
  return await orderServices.getAmountData(id);
};

export const payDeliveryCharge = async (
  id: string,
  payLoad: T_payDeliveryCharge,
) => {
  return await orderServices.payDeliveryCharge(id, payLoad);
};

export const getSellerEndOrders = async () => {
  return await orderServices.getSellerEndOrders();
};

export const getOrderById = async (id: string) => {
  return await orderServices.getOrderById(id);
};

export const get_Last_FiveDays_Orders_For_Admin = async () => {
  return await orderServices.get_Last_FiveDays_Orders_For_Admin();
};
