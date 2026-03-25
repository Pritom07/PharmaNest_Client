"use client";

import { editCategory } from "@/actions/category.action";
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
import { T_editCategory } from "@/types/editCategoryType";
import { useForm } from "@tanstack/react-form";
import { useEffect, useState } from "react";
import { MdEditSquare } from "react-icons/md";
import Swal from "sweetalert2";
import * as z from "zod";

const formSchema = z.object({
  name: z.string(),
  description: z.string(),
});

const EditCategoryDialog = ({
  category_id,
  name,
  description,
}: {
  category_id: number;
  name: string;
  description: string;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: name,
      description: description,
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      const payLoad: T_editCategory = {};

      if (value.name && value.name !== name) {
        payLoad.name = value.name;
      }

      if (value.description && value.description !== description) {
        payLoad.description = value.description;
      }

      const data = await editCategory(category_id, payLoad);

      if (data.success === true) {
        setOpen(false);
        form.reset();
        return Swal.fire({
          title: "Updation Successfull!",
          text: "Click ok button to proceed",
          icon: "success",
          confirmButtonColor: "#008080",
        });
      }

      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Updation Failed!",
      });
      setOpen(false);
      form.reset();
    },
  });

  useEffect(() => {
    if (name && description) {
      form.reset({
        name: name,
        description: description,
      });
    }
  }, [name, description]);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        id={`editCategory-${category_id}`}
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
            <MdEditSquare /> Edit
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-sm">
          <DialogHeader>
            <DialogTitle>Edit Category</DialogTitle>
            <DialogDescription>
              Update the category details below and click save to apply the
              changes.
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
                      placeholder="Update Category Name"
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
                      placeholder="Update Description"
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
              form={`editCategory-${category_id}`}
              className="bg-[#008080] hover:bg-[#008080] cursor-pointer"
            >
              Save
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditCategoryDialog;
