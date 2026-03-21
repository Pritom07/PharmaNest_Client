export type T_orderResponse = {
  id: string;
  customer_id: string;
  subtotal_amount: number;
  delivery_charge: number;
  total_amount: number;
  total_paid_amount: number;
  delivery_charge_status: boolean;
  phoneNumber: string;
  address: string;
  trnxID: String;
  delivery_charge_taker_seller_id?: string;
  customer?: {
    name: string;
  };
  createdAt: string;
  updatedAt: string;
};
