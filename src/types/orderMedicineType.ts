import { T_medicineData } from "./medicineDataTypes";

export type T_orderMedicine = {
  customer_id: string;
  subtotal_amount: number;
  delivery_charge: number;
  total_amount: number;
  phoneNumber: string;
  address: string;
  medicines: T_medicineData[];
};
