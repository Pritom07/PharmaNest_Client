"use server";

import { userServices } from "@/services/user.service";
import { T_updateUser } from "@/types/userType";
import { revalidatePath } from "next/cache";

export const getSession = async () => {
  return await userServices.getSession();
};

export const updateUserProfileInfo = async (payLoad: T_updateUser) => {
  return await userServices.updateProfileInfo(payLoad);
};
