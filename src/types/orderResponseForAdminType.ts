export type T_orderResponseForAdmin = {
  id: string;
  subtotal_amount: number;
  trnxID: string;
  createdAt: Date;
  delivery_charge_taker_seller_id: string;
  customer: {
    name: string;
  };
  deliveryChargeTaker: string;
  count: number;
  pending: number;
  shipped: number;
  delivered: number;
  paid: number;
  cancelled: number;
};
