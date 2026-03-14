"use client";

import { getCurrentUserById } from "@/actions/user.action";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import {
  getLocalStorageItem,
  setLocalStorageItem,
} from "@/LocalstorageManagement/Localstorage";
import { T_medicineData } from "@/types/medicineDataTypes";
import { T_user } from "@/types/userType";
import { useForm } from "@tanstack/react-form";
import Image from "next/image";
import { useEffect, useState } from "react";
import * as z from "zod";
import { FaCircleDot } from "react-icons/fa6";
import { Button } from "@/components/ui/button";
import { createOrder } from "@/actions/order.action";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  customer_id: z.string(),
  name: z.string().min(1),
  phoneNumber: z.string().min(11),
  address: z.string().min(5),
});

const CustomerCheckOut = () => {
  const router = useRouter();
  const { data: currentUserData } = authClient.useSession();
  const [user, setUser] = useState<T_user | null>(null);
  const [medicines, setMedicines] = useState<T_medicineData[] | []>([]);
  const [deliveryCharge, setDeliveryCharge] = useState(100);
  const [isFormInitialized, setIsFormInitialized] = useState(false);

  useEffect(() => {
    (async () => {
      const customer_id = currentUserData?.user.id;
      const { data } = await getCurrentUserById(customer_id as string);
      setUser(data?.data);
    })();

    const medicinesArray = getLocalStorageItem();
    setMedicines(medicinesArray);
  }, [currentUserData]);

  const subTotal = medicines
    .map(
      (medicine: T_medicineData) =>
        Number(medicine.price) * Number(medicine.quantity),
    )
    .reduce((acc, currentVal) => acc + currentVal, 0);

  const handleDelivery = (charge: number) => {
    setDeliveryCharge(charge);
  };

  const form = useForm({
    defaultValues: {
      customer_id: user?.id ?? "",
      name: user?.name ?? "",
      phoneNumber: user?.phoneNumber ?? "",
      address: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const orderData = {
        customer_id: value.customer_id,
        subtotal_amount: subTotal,
        delivery_charge: deliveryCharge,
        total_amount: Number(subTotal) + Number(deliveryCharge),
        phoneNumber: value.phoneNumber,
        address: value.address,
        medicines: medicines,
      };

      const { data } = await createOrder(orderData);

      if (data.success === true) {
        Swal.fire({
          title: "Order Placed Successfully !",
          text: "Click ok to proceed.",
          icon: "success",
          confirmButtonColor: "#008080",
        });
        setLocalStorageItem([]);
        return router.push("/customer/my_orders");
      }
    },
  });

  useEffect(() => {
    if (user && !isFormInitialized) {
      form.reset({
        customer_id: user?.id,
        name: user?.name,
        phoneNumber: user?.phoneNumber ?? "",
        address: "",
      });
      setIsFormInitialized(true);
    }
  }, [user, isFormInitialized, form]);

  return (
    <div className="container max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 gap-7 items-start">
        <Card className="w-full">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Shipping Address
            </CardTitle>
          </CardHeader>

          <CardContent>
            <form
              id="OrderForm"
              onSubmit={(e) => {
                e.preventDefault();
                form.handleSubmit();
              }}
            >
              <FieldGroup>
                <form.Field
                  name="customer_id"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-[17px] font-bold"
                        >
                          Customer ID
                        </FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          disabled
                          className="w-full text-[16px] font-semibold border-2 border-slate-300"
                        />
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="name"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-[17px] font-bold"
                        >
                          Customer Name
                        </FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          disabled
                          className="w-full text-[16px] font-semibold border-2 border-slate-300"
                        />
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="phoneNumber"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-[17px] font-bold"
                        >
                          Phone Number
                        </FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full text-[16px] font-semibold border-2 border-slate-300"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="address"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel
                          htmlFor={field.name}
                          className="text-[17px] font-bold"
                        >
                          Address
                        </FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          className="w-full text-[16px] font-semibold border-2 border-slate-300"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </FieldGroup>
            </form>
          </CardContent>
        </Card>

        <Card className="px-8">
          <CardHeader className="border-b-2 border-slate-300 pb-1">
            <CardTitle className="text-2xl font-bold">Your Order</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="border-b-2 border-slate-300 pb-3">
              {medicines.map((medicine: T_medicineData) => (
                <div
                  key={medicine.id}
                  className="flex justify-center items-center gap-4"
                >
                  <div className="relative w-24 h-20">
                    <Image
                      src={medicine.img_url}
                      alt={medicine.name}
                      fill
                      priority
                      className="object-contain"
                    />
                  </div>
                  <div>
                    <h1 className="text-[17px] font-semibold">
                      {medicine.name} (x{medicine.quantity})
                    </h1>
                    <h1 className="text-slate-500 font-medium">
                      By {medicine.manufacturer}
                    </h1>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-5 px-2">
              <div className="flex items-center font-bold gap-12 text-[18px] border-b-2 border-slate-300 pb-3">
                <h1>Subtotal</h1>
                <h1>{subTotal} TK.</h1>
              </div>

              <div className="mt-2.5 border-b-2 border-slate-300 pb-3.5">
                <h1 className="font-bold text-[18px]">Delivery Charge :</h1>
                <div className="flex items-center gap-3 font-semibold mt-2">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryCharge === 100}
                    onChange={() => handleDelivery(100)}
                    className="cursor-pointer"
                  />
                  <h1>Inside Dhaka - 100 TK.</h1>
                </div>
                <div className="flex items-center gap-3 font-semibold mt-2">
                  <input
                    type="radio"
                    name="delivery"
                    checked={deliveryCharge === 130}
                    onChange={() => handleDelivery(130)}
                    className="cursor-pointer"
                  />
                  <h1>Outside Dhaka - 130 TK.</h1>
                </div>
              </div>

              <div className="mt-4 flex items-center gap-12 font-bold text-[18px] border-b-2 border-slate-300 pb-3">
                <h1>Total Amount</h1>
                <h1>{deliveryCharge + subTotal} TK.</h1>
              </div>

              <div className="mt-4">
                <h1 className="font-bold text-[18px]">Payment Method :</h1>
                <h1 className="flex items-center gap-2 mt-3">
                  <FaCircleDot className="text-[#008080]" />
                  <span className="font-semibold">Cash on Delivery</span>
                </h1>
              </div>
            </div>

            <div className="mt-8">
              <Button
                type="submit"
                form="OrderForm"
                className="w-full font-bold bg-[#008080] hover:bg-[#008080] cursor-pointer"
              >
                Place Order
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default CustomerCheckOut;
