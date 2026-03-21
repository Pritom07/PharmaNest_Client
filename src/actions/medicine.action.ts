"use server";

import { medicineServices } from "@/services/medicine.services";
import { T_medicineData } from "@/types/medicineDataTypes";
import { revalidateTag } from "next/cache";

export const addMedicine = async (medicineData: T_medicineData) => {
  const res = await medicineServices.addMedicine(medicineData);
  revalidateTag("Medicines", "max");
  return res;
};

export const deleteMedicine = async (id: string) => {
  const res = await medicineServices.deleteMedicine(id);
  revalidateTag("Medicines", "max");
  return res;
};

export const getmedicineById = async (id: string) => {
  return await medicineServices.getmedicineById(id);
};

export const updateMedicine = async (id: string, payLoad: T_medicineData) => {
  const res = await medicineServices.updateMedicine(id, payLoad);
  revalidateTag("Medicines", "max");
  return res;
};

export const getMedicineCountData = async () => {
  const res = await medicineServices.getMedicineCountData();
  revalidateTag("Medicines", "max");
  return res;
};
