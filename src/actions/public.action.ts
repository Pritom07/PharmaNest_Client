"use server";

import { publicServices } from "@/services/public.services";

export const getMedicineByName = async (medicineData: {
  medicineSearchField: string;
}) => {
  return await publicServices.getMedicineByName(medicineData);
};

export const getCategories = async () => {
  return await publicServices.getCategories();
};
