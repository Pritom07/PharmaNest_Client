import { cookies } from "next/headers";
import { env } from "../../env";
import { T_searchParams } from "@/types/searchParamsType";
import { T_searchOptions } from "@/types/searchOptionsType";
import { T_category } from "@/types/categoryResponseType";
import { T_editCategory } from "@/types/editCategoryType";

const BACKEND_URL = env.BACKEND_URL;
export const categoryServices = {
  getAllCategory: async function (
    searchParams: T_searchParams,
    options: T_searchOptions,
  ) {
    try {
      const cookieStore = await cookies();
      const url = new URL(`${BACKEND_URL}/api/category`);
      const config: RequestInit = {
        headers: {
          Cookie: cookieStore.toString(),
        },
        next: {
          tags: ["categoryUpdated"],
        },
      };

      if (searchParams) {
        Object.entries(searchParams).forEach(([key, value]) => {
          if (value !== null && value !== undefined && value !== "") {
            url.searchParams.append(key, value.toString());
          }
        });
      }

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

  createCategory: async function (payLoad: T_category) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/category`, {
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

  deleteCategory: async function (id: number) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/category/${id}`, {
        method: "DELETE",
        headers: {
          Cookie: cookieStore.toString(),
        },
      });
      const data = await res.json();

      return data;
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  editCategory: async function (id: number, payLoad: T_editCategory) {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/category/update/${id}`, {
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

  getCategoryForSeller: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/category/sellerEnd`, {
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
};
