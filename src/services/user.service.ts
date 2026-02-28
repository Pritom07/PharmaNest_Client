import { cookies } from "next/headers";
import { env } from "../../env";

export const userServices = {
  getSession: async function () {
    const cookieStore = await cookies();
    const API_URL = env.API_URL;
    try {
      const res = await fetch(`${API_URL}/get-session`, {
        headers: {
          Cookie: cookieStore.toString(),
        },
        cache: "no-store",
      });
      const data = await res.json();
      return data;
    } catch (err: any) {
      return err.message;
    }
  },
};
