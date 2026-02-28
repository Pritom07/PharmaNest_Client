"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
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
import { Input } from "@/components/ui/input";
import { authClient } from "@/lib/auth-client";
import { useForm } from "@tanstack/react-form";
import { useRouter } from "next/navigation";
import { FaGoogle } from "react-icons/fa";
import { toast } from "react-toastify";
import * as z from "zod";

const formSchema = z.object({
  name: z.string().min(1),
  email: z.email("Invalid email address"),
  password: z.string().min(8),
  role: z.enum(["CUSTOMER", "SELLER"], {
    message: "Role must be CUSTOMER or SELLER",
  }),
});

export function SignupForm({ ...props }: React.ComponentProps<typeof Card>) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      name: "",
      email: "",
      password: "",
      role: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { data, error } = await authClient.signUp.email(value);
        if (data && error === null) {
          toast.success("User created successfully !");
          return router.push("/login");
        }
        toast.error("SOMETHING_WENT_WRONG");
        console.log(error);
        return;
      } catch (err: any) {
        toast.error(err.message);
        return;
      }
    },
  });

  return (
    <Card
      {...props}
      className="bg-[#E0F2f1] border-2 border-slate-300 shadow-2xl"
    >
      <CardHeader>
        <CardTitle className="text-center text-2xl font-bold">
          Create an account
        </CardTitle>
        <CardDescription className="text-center font-semibold">
          Enter your information below to create your account
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form
          id="signup"
          onSubmit={(e) => {
            e.preventDefault();
            form.handleSubmit();
          }}
        >
          <FieldGroup>
            <form.Field
              name="name"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Full Name</FieldLabel>
                    <Input
                      type="text"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your name"
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
                      aria-invalid={isInvalid}
                      placeholder="m@gmail.com"
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
              name="password"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Password</FieldLabel>
                    <Input
                      type="password"
                      id={field.name}
                      name={field.name}
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      aria-invalid={isInvalid}
                      placeholder="Enter your password"
                      className="border-2 border-slate-300"
                    />
                    <FieldDescription>
                      Must be at least 8 characters long.
                    </FieldDescription>
                    {isInvalid && (
                      <FieldError errors={field.state.meta.errors} />
                    )}
                  </Field>
                );
              }}
            />

            <form.Field
              name="role"
              children={(field) => {
                const isInvalid =
                  field.state.meta.isTouched && !field.state.meta.isValid;
                return (
                  <Field data-invalid={isInvalid}>
                    <FieldLabel htmlFor={field.name}>Role</FieldLabel>
                    <select
                      id={field.name}
                      name={field.name}
                      value={field.state.value || ""}
                      onChange={(e) => field.handleChange(e.target.value)}
                      className="border-2 border-slate-300 rounded-lg p-1"
                    >
                      <option value="" disabled>
                        SELECT YOUR ROLE
                      </option>
                      <option value="CUSTOMER">CUSTOMER</option>
                      <option value="SELLER">SELLER</option>
                    </select>
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
      <CardFooter className="flex flex-col gap-1.5">
        <Button
          type="submit"
          form="signup"
          className="w-full text-white bg-[#008080] hover:bg-[#008080] cursor-pointer"
        >
          Sign Up
        </Button>
        <Button className="w-full cursor-pointer bg-red-500 text-white hover:bg-red-500">
          <FaGoogle />
          Continue with Google
        </Button>
        <FieldDescription className="text-center font-semibold">
          Already have an account? <a href="/login">Sign in</a>
        </FieldDescription>
      </CardFooter>
    </Card>
  );
}
