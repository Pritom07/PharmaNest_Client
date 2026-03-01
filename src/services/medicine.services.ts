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
      return { data: data, error: { message: null } };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },

  viewAllMedicines: async function () {
    try {
      const cookieStore = await cookies();
      const res = await fetch(`${BACKEND_URL}/api/seller/medicines`, {
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
};
