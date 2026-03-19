import { cookies } from "next/headers";
import { env } from "../../env";
import { T_cancelOrderItem } from "@/types/cancelOrderItemType";

const BACKEND_URL = env.BACKEND_URL;
export const orderItemServices = {
  getAllOrderItems: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const url = `${BACKEND_URL}/api/orderItem/customer/${id}`;
      const config: RequestInit = {
        headers: {
          Cookie: cookieStore.toString(),
        },
      };
      config.next = { tags: ["orderItemUpdated"] };

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

  cancelOrderItem: async function (id: string, payLoad: T_cancelOrderItem) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/orderItem/customer/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(payLoad),
      });
      const data = await res.json();

      return { data: data, error: { message: null } };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  deliveredStatusChecking: async function (id: string) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(
        `${BACKEND_URL}/api/orderItem/deliveredChecking/${id}`,
        {
          headers: {
            Cookie: cookieStore.toString(),
          },
        },
      );
      const data = await res.json();
      return data;
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },
};
