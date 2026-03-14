"use server";

import { orderServices } from "@/services/order.service";
import { T_orderMedicine } from "@/types/orderMedicineType";

export const createOrder = async (payLoad: T_orderMedicine) => {
  return await orderServices.createOrder(payLoad);
};
