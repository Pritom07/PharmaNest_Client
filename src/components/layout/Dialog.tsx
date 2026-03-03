"use client";

import {
  Dialog as DialogComponent,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { FaEdit } from "react-icons/fa";
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { useEffect, useState } from "react";
import { getmedicineById, updateMedicine } from "@/actions/medicine.action";
import { T_medicineData } from "@/types/medicineDataTypes";
import { T_framework } from "@/types/FrameworkType";
import { toast } from "react-toastify";

const formSchema = z.object({
  name: z.string().min(1),
  manufacturer: z.string().min(1),
  price: z.number().min(1, "Price is not added"),
  stock: z.number().min(5),
  category_id: z.number().min(1, "Category is not selected"),
  img_url: z.string().min(1),
});

const EditDialog = ({ medicine_id }: { medicine_id: string }) => {
  const [medicine, setMedicine] = useState<{
    success: boolean;
    message: string;
    data: T_medicineData;
  } | null>(null);

  const editMedicine = async () => {
    const { data } = await getmedicineById(medicine_id);
    setMedicine(data);
  };

  const medicinedata = medicine?.data;

  const form = useForm({
    defaultValues: {
      name: medicinedata?.name ?? "",
      manufacturer: medicinedata?.manufacturer ?? "",
      price: medicinedata?.price ?? 1,
      stock: medicinedata?.stock ?? 5,
      category_id: 0,
      img_url: medicinedata?.img_url ?? "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { data } = await updateMedicine(
        medicinedata?.id as string,
        value as T_medicineData,
      );

      if (data.success === true) {
        toast.success("Medicine Data is updated !");
      }
    },
  });

  useEffect(() => {
    if (medicinedata) {
      form.reset({
        name: medicinedata.name,
        manufacturer: medicinedata.manufacturer,
        price: medicinedata.price,
        stock: medicinedata.stock,
        category_id: medicinedata.category_id,
        img_url: medicinedata.img_url,
      });
    }
  }, [medicinedata]);

  const frameworks: T_framework[] = [
    { label: "Tablet", value: 1 },
    { label: "Capsule", value: 2 },
    { label: "Syrup", value: 3 },
    { label: "Injection", value: 4 },
    { label: "Antibiotic", value: 5 },
    { label: "Pain Relief", value: 6 },
    { label: "Antiseptic", value: 7 },
    { label: "Vitamin & Supplement", value: 8 },
    { label: "Diabetes Care", value: 9 },
    { label: "Cardiac Care", value: 10 },
    { label: "Skin Care", value: 11 },
    { label: "Eye & Ear Drops", value: 12 },
  ];

  return (
    <div>
      <DialogComponent>
        <form
          id="editMedicine"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <DialogTrigger asChild>
            <Button
              onClick={editMedicine}
              variant="outline"
              className="bg-green-600 text-white hover:bg-green-600 hover:text-white cursor-pointer"
            >
              <FaEdit /> Edit
            </Button>
          </DialogTrigger>

          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Edit Medicine Data</DialogTitle>
              <DialogDescription>
                Make changes to your added medicine here. Click save when
                you&apos;re done.
              </DialogDescription>
            </DialogHeader>

            <FieldGroup>
              <div className="flex justify-between items-center gap-3">
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

              <div className="flex justify-between items-center gap-3">
                <form.Field
                  name="price"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>
                          Price (TK.)
                        </FieldLabel>
                        <Input
                          type="number"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => {
                            const value = e.target.value;
                            field.handleChange(
                              value === "" ? 1 : Number(value),
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
                              value === "" ? 5 : Number(value),
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
              </div>

              <div className="flex justify-between items-center gap-3">
                <form.Field
                  name="category_id"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;

                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor="category_id">Category</FieldLabel>

                        <select
                          id="category_id"
                          name="category_id"
                          value={field.state.value}
                          onChange={(e) =>
                            field.handleChange(Number(e.target.value))
                          }
                          className="border-2 border-slate-300 rounded-md px-2 py-2 w-full"
                        >
                          <option value={0} disabled>
                            Select Category
                          </option>
                          {frameworks.map((framework) => (
                            <option
                              key={framework.value}
                              value={framework.value}
                            >
                              {framework.label}
                            </option>
                          ))}
                        </select>

                        {isInvalid && (
                          <FieldError errors={field.state.meta.errors} />
                        )}
                      </Field>
                    );
                  }}
                />

                <form.Field
                  name="img_url"
                  children={(field) => {
                    const isInvalid =
                      field.state.meta.isTouched && !field.state.meta.isValid;
                    return (
                      <Field data-invalid={isInvalid}>
                        <FieldLabel htmlFor={field.name}>Image URL</FieldLabel>
                        <Input
                          type="text"
                          id={field.name}
                          name={field.name}
                          value={field.state.value}
                          onChange={(e) => field.handleChange(e.target.value)}
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
            </FieldGroup>

            <DialogFooter>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  className="bg-[#d33] text-white hover:bg-[#d33] hover:text-white cursor-pointer"
                >
                  Cancel
                </Button>
              </DialogClose>

              <Button
                form="editMedicine"
                type="submit"
                className="bg-[#008080] hover:bg-[#008080] cursor-pointer"
              >
                Save changes
              </Button>
            </DialogFooter>
          </DialogContent>
        </form>
      </DialogComponent>
    </div>
  );
};

export default EditDialog;
