export type T_orderResponseForAdmin = {
  id: string;
  subtotal_amount: number;
  trnxID: string;
  createdAt: Date;
  delivery_charge_taker_seller_id: string | null;
  customer: {
    name: string;
  };
};
