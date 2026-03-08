import { T_searchParams } from "@/types/searchParamsType";
import { env } from "../../env";
import { T_searchOptions } from "@/types/searchOptionsType";

const BACKEND_URL = env.BACKEND_URL;
export const publicServices = {
  getAllMedicines: async function (
    searchPamams: T_searchParams,
    options: T_searchOptions,
  ) {
    try {
      const url = new URL(`${BACKEND_URL}/api/medicines`);

      if (searchPamams) {
        Object.entries(searchPamams).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

      const config: RequestInit = {};

      if (options.cache) {
        config.cache = options.cache as RequestCache;
      }

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

  getMedicineById: async function (id: string) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/medicines/${id}`);
      const data = await res.json();

      if (data.success === true) {
        return { data: data, error: { message: null } };
      }
      return { data: null, error: { message: "SOMETHING_WENT_WRONG" } };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  getMedicineByName: async function (medicineData: {
    medicineSearchField: string;
  }) {
    try {
      const res = await fetch(`${BACKEND_URL}/api/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
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
};
