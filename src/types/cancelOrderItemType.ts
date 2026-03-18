import { orderItemStatus } from "./orderItemType";

export type T_cancelOrderItem = {
  id?: string;
  price: number;
  quantity: number;
  status: orderItemStatus;
};
