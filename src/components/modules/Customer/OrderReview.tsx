"use client";

import { createOrUpdateReview } from "@/actions/review.action";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldError, FieldGroup } from "@/components/ui/field";
import { authClient } from "@/lib/auth-client";
import { T_orderResponse } from "@/types/orderResponseType";
import { T_review } from "@/types/reviewType";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { MdOutlineRateReview } from "react-icons/md";
import Swal from "sweetalert2";
import * as z from "zod";

const formSchema = z.object({
  comment: z.string().min(2),
});

const OrderReview = ({ order }: { order: T_orderResponse }) => {
  const [open, setOpen] = useState(false);
  const { data } = authClient.useSession();
  const customer_id = data?.user.id;

  const form = useForm({
    defaultValues: {
      comment: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const payLoad = {
        customer_id,
        order_id: order.id,
        comment: value.comment,
      };
      const { data } = await createOrUpdateReview(payLoad as T_review);

      if (data.success === true) {
        setOpen(false);
        Swal.fire({
          title: "Review Done !",
          text: "Click ok to proceed",
          icon: "success",
          confirmButtonColor: "#008080",
        });
        return form.reset();
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        id="reviewText"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="cursor-pointer font-semibold bg-amber-600 hover:bg-amber-600"
            disabled={order.is_All_OrderItem_Delivered_and_Paid === false}
          >
            <MdOutlineRateReview /> Review
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Write a Review</DialogTitle>
            <DialogDescription className="text-justify">
              Please share your honest feedback with us. Your review will help
              improve our service and assist other customers. Share your review
              within 200 words.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form.Field
              name="comment"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <textarea
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter Your Review"
                      className="border-2 border-slate-300 rounded-[3px] p-2"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />
          </FieldGroup>
          <DialogFooter>
            <DialogClose asChild>
              <Button className="cursor-pointer bg-red-500 hover:bg-red-500">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="reviewText"
              className="bg-[#008080] hover:bg-[#008080] cursor-pointer"
            >
              Share
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default OrderReview;
