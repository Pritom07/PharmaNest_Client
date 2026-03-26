"use server";

import { userServices } from "@/services/user.service";
import { T_updateUser, userStatus } from "@/types/userType";
import { revalidateTag } from "next/cache";

export const getSession = async () => {
  return await userServices.getSession();
};

export const getCurrentUserById = async (id: string) => {
  return await userServices.getUserById(id);
};

export const updateUserProfileInfo = async (payLoad: T_updateUser) => {
  return await userServices.updateProfileInfo(payLoad);
};

export const getUserStatus = async () => {
  return await userServices.getUserStatus();
};

export const updateUserStatus = async (
  id: string,
  payLoad: { status: userStatus },
) => {
  const res = await userServices.updateUserStatus(id, payLoad);
  revalidateTag("userUpdated", "max");
  return res;
};
