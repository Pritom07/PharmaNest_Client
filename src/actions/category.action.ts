"use server";

import { categoryServices } from "@/services/category.services";
import { T_category } from "@/types/categoryResponseType";
import { T_editCategory } from "@/types/editCategoryType";
import { revalidateTag } from "next/cache";

export const createCategory = async (payLoad: T_category) => {
  const res = await categoryServices.createCategory(payLoad);
  revalidateTag("categoryUpdated", "max");
  return res;
};

export const deleteCategory = async (id: number) => {
  const res = await categoryServices.deleteCategory(id);
  revalidateTag("categoryUpdated", "max");
  return res;
};

export const editCategory = async (id: number, payLoad: T_editCategory) => {
  const res = await categoryServices.editCategory(id, payLoad);
  revalidateTag("categoryUpdated", "max");
  return res;
};

export const getCategoryForSeller = async () => {
  return await categoryServices.getCategoryForSeller();
};
