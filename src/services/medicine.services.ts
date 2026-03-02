import { T_medicineData } from "@/types/medicineDataTypes";
import { env } from "../../env";
import { cookies } from "next/headers";

const BACKEND_URL = env.BACKEND_URL;

export const medicineServices = {
  addMedicine: async function (medicineData: T_medicineData) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/seller/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
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

  viewAllMedicines: async function (
    searchparams: { page?: string },
    options: { cache?: string; revalidate?: number },
  ) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${BACKEND_URL}/api/seller/medicines`);

      if (searchparams) {
        Object.entries(searchparams).forEach(([key, value]) => {
          if (value !== undefined && value !== null && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const config: RequestInit = {
        headers: {
          Cookie: cookieStore.toString(),
        },
      };

      if (options.cache) {
        config.cache = options.cache as RequestCache;
      }

      if (options.revalidate) {
        config.next = { revalidate: options.revalidate };
      }

      config.next = { ...config.next, tags: ["Medicines"] };

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
