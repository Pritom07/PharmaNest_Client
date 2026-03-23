import { cookies } from "next/headers";
import { env } from "../../env";
import { T_review } from "@/types/reviewType";

const BACKEND_URL = env.BACKEND_URL;
export const reviewServices = {
  gettingAllReviews: async function () {
    try {
      const url = `${BACKEND_URL}/api/customer/review`;
      const config: RequestInit = {
        next: { tags: ["reviewsUpdated"] },
      };
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

  createOrUpdateReview: async function (payLoad: T_review) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/customer/review`, {
        method: "PUT",
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
