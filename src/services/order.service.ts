import { cookies } from "next/headers";
import { env } from "../../env";
import { T_orderMedicine } from "@/types/orderMedicineType";

const BACKEND_URL = env.BACKEND_URL;
export const orderServices = {
  createOrder: async function (payLoad: T_orderMedicine) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/customer/order`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payLoad),
      });
      const data = await res.json();

      if (data.success === true) {
        return { data: data, error: { message: null } };
      }
      return { data: null, error: { message: "SOMETHING_WENT_WRONG" } };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },
};
