"use client";

import { createCategory } from "@/actions/category.action";
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
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import Swal from "sweetalert2";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(2),
  description: z.string().min(5),
});

const CreateCategoryDialog = () => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: "",
      description: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const { data } = await createCategory(value);

      if (data.success === true) {
        Swal.fire({
          title: `${value.name} added successfully!`,
          text: "Click ok to proceed",
          icon: "success",
          confirmButtonColor: "#008080",
        });
        setOpen(false);
        form.reset();
      }
    },
  });
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        id="categoryForm"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="bg-[#008080] hover:bg-[#008080] cursor-pointer"
          >
            Create Category
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Create New Category</DialogTitle>
            <DialogDescription>
              Add a new category to help organize medicines and improve product
              management.
            </DialogDescription>
          </DialogHeader>
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Category Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter Category Name"
                    />
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="description"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Description</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      placeholder="Enter Description"
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
              <Button className="bg-red-600 hover:bg-red-600 cursor-pointer">
                Cancel
              </Button>
            </DialogClose>
            <Button
              type="submit"
              form="categoryForm"
              className="bg-[#008080] hover:bg-[#008080] cursor-pointer"
            >
              Create
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default CreateCategoryDialog;
