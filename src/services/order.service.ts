import { cookies } from "next/headers";
import { env } from "../../env";
import { T_orderMedicine } from "@/types/orderMedicineType";
import { T_payDeliveryCharge } from "@/types/payDeliveryChargeType";

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

  getAllOrders: async function () {
    try {
      const cookieStore = await cookies();
      const url = `${BACKEND_URL}/api/customer/orders`;
      const config: RequestInit = {
        headers: {
          Cookie: cookieStore.toString(),
        },
      };
      config.next = { tags: ["orderListUpdated"] };

      const res = await fetch(url.toString(), config);
      const data = await res.json();

      if (data.success === true) {
        return { data: data, error: { message: null } };
      }
      return { data: null, error: { message: "SOMETHING_WENT_WRONG" } };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  deleteOrder: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/customer/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();
      return { data: data, error: { message: null } };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  getAmountData: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/customer/amountData/${id}`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
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

  payDeliveryCharge: async function (id: string, payLoad: T_payDeliveryCharge) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/customer/payDelivery/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payLoad),
      });
      const data = await res.json();

      return data;
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },
};
