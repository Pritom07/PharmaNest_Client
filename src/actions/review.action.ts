"use server";

import { reviewServices } from "@/services/review.services";
import { T_review } from "@/types/reviewType";
import { revalidateTag } from "next/cache";

export const createOrUpdateReview = async (payLoad: T_review) => {
  const res = await reviewServices.createOrUpdateReview(payLoad);
  revalidateTag("reviewsUpdated", "max");
  return res;
};
