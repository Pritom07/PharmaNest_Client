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
import { Field, FieldGroup } from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FaEdit } from "react-icons/fa";

const EditDialog = () => {
  const editMedicine = () => {
    console.log("bangladesh");
  };

  return (
    <div>
      <DialogComponent>
        <form>
          <DialogTrigger asChild>
            <Button
              variant="outline"
              className="bg-green-600 text-white hover:bg-green-600 hover:text-white cursor-pointer"
            >
              <FaEdit /> Edit
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <DialogHeader>
              <DialogTitle>Edit profile</DialogTitle>
              <DialogDescription>
                Make changes to your profile here. Click save when you&apos;re
                done.
              </DialogDescription>
            </DialogHeader>
            <FieldGroup>
              <Field>
                <Label htmlFor="name-1">Name</Label>
                <Input id="name-1" name="name" defaultValue="Pedro Duarte" />
              </Field>
              <Field>
                <Label htmlFor="username-1">Username</Label>
                <Input
                  id="username-1"
                  name="username"
                  defaultValue="@peduarte"
                />
              </Field>
            </FieldGroup>
            <DialogFooter>
              <DialogClose asChild>
                <Button variant="outline">Cancel</Button>
              </DialogClose>
              <Button onClick={editMedicine} type="submit">
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
