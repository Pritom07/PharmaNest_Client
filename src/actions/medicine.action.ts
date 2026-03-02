"use server";

import { medicineServices } from "@/services/medicine.services";
import { T_medicineData } from "@/types/medicineDataTypes";
import { revalidateTag } from "next/cache";

export const addMedicine = async (medicineData: T_medicineData) => {
  const res = await medicineServices.addMedicine(medicineData);
  revalidateTag("Medicines", "max");
  return res;
};
