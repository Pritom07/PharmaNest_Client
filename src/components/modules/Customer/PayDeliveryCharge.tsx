"use client";

import { payDeliveryCharge } from "@/actions/order.action";
import { deliveredStatusChecking } from "@/actions/orderItem.action";
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
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { T_payDeliveryCharge } from "@/types/payDeliveryChargeType";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import Swal from "sweetalert2";
import * as z from "zod";

const formSchema = z.object({
  trnxID: z.string().min(1, "trnxID not added"),
  delivery_charge_taker_seller_id: z.string().min(1, "Seller ID not added"),
});

const PayDeliveryCharge = ({ id }: { id: string }) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      trnxID: "",
      delivery_charge_taker_seller_id: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const data = await deliveredStatusChecking(id);
      if (data.success === false) {
        setOpen(false);
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "Still No Items in Delivered Orders ! So, You Are Not Allowed To Pay Now.",
          confirmButtonColor: "#008080",
        });
        return form.reset();
      }

      const { data: deliveryChargeData } = await payDeliveryCharge(
        id,
        value as T_payDeliveryCharge,
      );

      if (deliveryChargeData) {
        Swal.fire({
          title: "Delivery Charge paid!",
          text: "Click Ok to proceed",
          icon: "success",
          confirmButtonColor: "#008080",
        });
        window.dispatchEvent(new Event("amountUpdated"));
        setOpen(false);
        return form.reset();
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "trnxID or Seller ID isn't correct !",
        confirmButtonColor: "#008080",
      });
      setOpen(false);
      return form.reset();
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        id="deliveryChargeForm"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="w-full bg-[#008080] hover:bg-[#008080] border-[#008080] text-[15px] text-white hover:text-white font-semibold cursor-pointer"
          >
            PAY DELIVERY CHARGE
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Delivery Charge Payment</DialogTitle>
            <DialogDescription>
              Proceed to pay the delivery charge to continue with your order.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form.Field
              name="trnxID"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>trnxID</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter trnxID"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="delivery_charge_taker_seller_id"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Seller ID</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter Seller ID"
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
              <Button className="border-2 border-slate-300 bg-white text-black hover:bg-white hover:text-black cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              form="deliveryChargeForm"
              type="submit"
              className="bg-[#008080] hover:bg-[#008080] cursor-pointer"
            >
              Pay Now
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default PayDeliveryCharge;
