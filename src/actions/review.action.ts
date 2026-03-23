"use server";

import { reviewServices } from "@/services/review.services";
import { T_review } from "@/types/reviewType";

export const createOrUpdateReview = async (payLoad: T_review) => {
  return await reviewServices.createOrUpdateReview(payLoad);
};
