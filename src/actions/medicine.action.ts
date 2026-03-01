"use server";

import { medicineServices } from "@/services/medicine.services";
import { T_medicineData } from "@/types/medicineDataTypes";

export const addMedicine = async (medicineData: T_medicineData) => {
  return await medicineServices.addMedicine(medicineData);
};

export const getAllMedicines = async () => {
  return await medicineServices.viewAllMedicines();
};
