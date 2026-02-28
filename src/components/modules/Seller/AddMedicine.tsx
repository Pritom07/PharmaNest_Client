"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import {
  Combobox,
  ComboboxContent,
  ComboboxInput,
  ComboboxItem,
  ComboboxList,
} from "@/components/ui/combobox";
import { Input } from "@/components/ui/input";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { T_framework } from "@/types/FrameworkType";
import { useEffect, useState } from "react";
import { getSession } from "@/actions/user.action";
import { toast } from "react-toastify";
import { T_medicineData } from "@/types/medicineDataTypes";
import { addMedicine } from "@/actions/medicine.action";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  name: z.string().min(1),
  price: z.number().min(1, "Price is not added"),
  stock: z.number().min(5),
  manufacturer: z.string().min(1),
  category_id: z.number().min(1, "Category is not selected"),
  user_id: z.string(),
  user_name: z.string(),
});

const AddMedicine = () => {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      price: 1,
      stock: 5,
      manufacturer: "",
      category_id: 0,
      user_id: "",
      user_name: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const medicineData: T_medicineData = {
          name: value.name,
          price: Number(value.price),
          stock: Number(value.stock),
          manufacturer: value.manufacturer,
          category_id: Number(value.category_id),
          user_id: userInfo?.user_id,
        };
        const { data } = await addMedicine(medicineData);

        if (data.data && data.success === true) {
          toast.success("Medicine added successfully !");
          return router.push("/seller/medicines/all_medicines");
        }

        return toast.error("SOMETHING_WENT_WRONG");
      } catch (err: any) {
        return toast.error(err.message);
      }
    },
  });

  const frameworks: T_framework[] = [
    { label: "Next.js", value: 1 },
    { label: "SvelteKit", value: 2 },
    { label: "Nuxt", value: 3 },
  ];

  const [userInfo, setUserInfo] = useState<{
    user_name?: string;
    user_id?: string;
  }>({});

  useEffect(() => {
    (async () => {
      const { session, user } = await getSession();
      const user_name = user?.name;
      const user_id = user?.id;
      setUserInfo({ user_name, user_id });
    })();
  }, []);

  return (
    <div className="max-w-4xl mx-auto py-6 px-3.5">
      <Card className="bg-[#E0F2f1] border-2 border-slate-300 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Add New Medicine
          </CardTitle>
        </CardHeader>
        <CardContent>
          <form
            id="add_medicine"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
              <div className="flex flex-col lg:flex-row gap-3">
                <form.Field
                  name="user_id"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>User ID</FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={userInfo?.user_id ?? ""}
                          className="border-2 border-slate-300"
                          disabled
                        />
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="user_name"
                  children={(field) => {
                    return (
                      <Field>
                        <FieldLabel htmlFor={field.name}>User Name</FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={userInfo?.user_name ?? ""}
                          className="border-2 border-slate-300"
                          disabled
                        />
                      </Field>
                    );
                  }}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-3 lg:-mt-2">
                <form.Field
                  name="name"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Medicine Name
                        </FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter Medicine Name"
                          className="border-2 border-slate-300"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="manufacturer"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Manufacturer Name
                        </FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
                          placeholder="Enter Manufacturer Name"
                          className="border-2 border-slate-300"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <div className="flex flex-col lg:flex-row gap-3 lg:-mt-2">
                <form.Field
                  name="price"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Price ($)</FieldLabel>
                        <Input
                          type="number"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.handleChange(
                              value === "" ? 0 : Number(value),
                            );
                          }}
                          className="border-2 border-slate-300"
                        />
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="stock"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Stock</FieldLabel>
                        <Input
                          type="number"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.handleChange(
                              value === "" ? 0 : Number(value),
                            );
                          }}
                          className="border-2 border-slate-300"
                        />
                        <FieldDescription>
                          You have to store minimum 5
                        </FieldDescription>
                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />
              </div>

              <form.Field
                name="category_id"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid} className="lg:-mt-8">
                      <FieldLabel htmlFor={field.name}>Category</FieldLabel>
                      <Combobox
                        items={frameworks}
                        onValueChange={(item: T_framework | null) => {
                          if (item) {
                            field.handleChange(item.value);
                          }
                        }}
                        itemToStringValue={(item) => item?.label ?? ""}
                      >
                        <ComboboxInput
                          className="border-2 border-slate-300"
                          placeholder="Select category"
                        />
                        <ComboboxContent>
                          <ComboboxList>
                            {(framework: T_framework) => (
                              <ComboboxItem
                                key={framework.value}
                                value={framework}
                              >
                                {framework.label}
                              </ComboboxItem>
                            )}
                          </ComboboxList>
                        </ComboboxContent>
                      </Combobox>

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
        <CardFooter>
          <Button
            form="add_medicine"
            className="w-full bg-[#008080] hover:bg-[#008080] cursor-pointer"
          >
            Submit
          </Button>
        </CardFooter>
      </Card>
    </div>
  );
};

export default AddMedicine;
