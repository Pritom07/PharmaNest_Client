"use client";

import { updateUserProfileInfo } from "@/actions/user.action";
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
import { authClient } from "@/lib/auth-client";
import { T_updateUser, T_user } from "@/types/userType";
import { useForm } from "@tanstack/react-form";
import { useState } from "react";
import { toast } from "react-toastify";

const EditProfileSection = ({
  currentUser,
  setUser,
}: {
  currentUser: T_user;
  setUser: React.Dispatch<React.SetStateAction<T_user>>;
}) => {
  const [open, setOpen] = useState(false);

  const form = useForm({
    defaultValues: {
      name: currentUser?.name ?? "",
      email: currentUser?.email ?? "",
      image: currentUser?.image ?? "",
      address: currentUser?.address ?? "",
      phoneNumber: currentUser?.phoneNumber ?? "",
      currentPassword: "",
      newPassword: "",
    },
    onSubmit: async ({ value }) => {
      const updateProfileInfo: T_updateUser = {};
      const updatePassword: any = {};

      if (value.name && value.name !== currentUser?.name) {
        updateProfileInfo.name = value.name;
      }

      if (value.email && value.email !== currentUser?.email) {
        updateProfileInfo.email = value.email;
      }

      if (value.image && value.image !== currentUser?.image) {
        updateProfileInfo.image = value.image;
      }

      if (value.address && value.address !== currentUser?.address) {
        updateProfileInfo.address = value.address;
      }

      if (value.phoneNumber && value.phoneNumber !== currentUser?.phoneNumber) {
        updateProfileInfo.phoneNumber = value.phoneNumber;
      }

      if (value.currentPassword && value.newPassword) {
        updatePassword.currentPassword = value.currentPassword;
        updatePassword.newPassword = value.newPassword;
      } else if (value.currentPassword || value.newPassword) {
        toast.error("Both current and new password required");
        return;
      }

      try {
        if (Object.keys(updateProfileInfo).length > 0) {
          const { data, error } =
            await updateUserProfileInfo(updateProfileInfo);

          if (!data?.success) {
            return toast.error(error?.message || "Profile update failed");
          }

          toast.success("Profile updated successfully");
          setUser((prev: any) => ({
            ...prev,
            ...updateProfileInfo,
          }));
          setOpen(false);
        }

        if (Object.keys(updatePassword).length > 0) {
          const { data, error } =
            await authClient.changePassword(updatePassword);

          if (!data) {
            return toast.error(error?.message || "Password update failed");
          }

          toast.success("Password updated successfully");
          setUser((prev: any) => ({
            ...prev,
            ...updateProfileInfo,
          }));
          setOpen(false);
        }

        if (
          Object.keys(updateProfileInfo).length === 0 &&
          Object.keys(updatePassword).length === 0
        ) {
          toast.error("No data to update");
        }
      } catch (err: any) {
        toast.error(err.message);
      }
    },
  });

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <form
        id="editprofile"
        onSubmit={(e) => {
          e.preventDefault();
          form.handleSubmit();
        }}
      >
        <DialogTrigger asChild>
          <Button
            onClick={() => setOpen(true)}
            className="bg-[#008080] hover:bg-[#008080] cursor-pointer font-semibold shadow-md shadow-cyan-700"
          >
            Edit Profile
          </Button>
        </DialogTrigger>

        <DialogContent className="sm:max-w-sm bg-[#E0F2f1]">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <FieldGroup>
            <div className="flex justify-center items-center gap-3">
              <form.Field
                name="name"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Name</FieldLabel>
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
                name="email"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Email</FieldLabel>
                      <Input
                        type="email"
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

            <div className="flex justify-center items-center gap-3">
              <form.Field
                name="image"
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

              <form.Field
                name="address"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Address</FieldLabel>
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

            <div className="flex justify-center items-center gap-3">
              <form.Field
                name="phoneNumber"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>Phone Number</FieldLabel>
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
                name="currentPassword"
                children={(field) => {
                  const isInvalid =
                    field.state.meta.isTouched && !field.state.meta.isValid;
                  return (
                    <Field data-invalid={isInvalid}>
                      <FieldLabel htmlFor={field.name}>
                        Current Password
                      </FieldLabel>
                      <Input
                        type="password"
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

            <form.Field
              name="newPassword"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>New Password</FieldLabel>
                    <Input
                      type="password"
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
          </FieldGroup>

          <DialogFooter>
            <DialogClose asChild>
              <Button
                variant="outline"
                className="bg-red-600 hover:bg-red-600 text-white hover:text-white cursor-pointer"
              >
                Cancel
              </Button>
            </DialogClose>
            <Button
              form="editprofile"
              type="submit"
              className="bg-[#008080] hover:bg-[#008080] cursor-pointer"
            >
              Save changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </form>
    </Dialog>
  );
};

export default EditProfileSection;
