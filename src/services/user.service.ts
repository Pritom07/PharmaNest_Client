import { cookies } from "next/headers";
import { env } from "../../env";
import { T_updateUser } from "@/types/userType";

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

  updateProfileInfo: async function (payLoad: T_updateUser) {
    try {
      const BACKEND_URL = env.BACKEND_URL;
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/user/update-profile`, {
        method: "PATCH",
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
