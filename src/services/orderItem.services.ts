import { cookies } from "next/headers";
import { env } from "../../env";

const BACKEND_URL = env.BACKEND_URL;
export const orderItemServices = {
  getAllOrderItems: async function (id: string) {
    try {
      const cookieStore = await cookies();
      //   const res = await fetch(`${BACKEND_URL}/api/orderItem/customer/${id}`, {
      //     headers: {
      //       Cookie: cookieStore.toString(),
      //     },
      //   });

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
};
