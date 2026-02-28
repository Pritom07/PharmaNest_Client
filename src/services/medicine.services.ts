import { T_medicineData } from "@/types/medicineDataTypes";
import { env } from "../../env";
import { cookies } from "next/headers";

export const medicineServices = {
  addMedicine: async function (medicineData: T_medicineData) {
    try {
      const cookieStore = await cookies();
      const BACKEND_URL = env.BACKEND_URL;
      const res = await fetch(`${BACKEND_URL}/api/seller/medicines`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Cookie: cookieStore.toString(),
        },
        body: JSON.stringify(medicineData),
      });
      const data = await res.json();
      console.log(data);
      return { data: data, error: { message: null } };
    } catch (err: any) {
      return { data: null, error: { message: err.message } };
    }
  },
};
