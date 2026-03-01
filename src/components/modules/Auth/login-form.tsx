"use client";

import { cn } from "@/lib/utils";
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
import { useForm } from "@tanstack/react-form";
import * as z from "zod";
import { toast } from "react-toastify";
import { FaGoogle } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";
import { useRouter } from "next/navigation";

const formSchema = z.object({
  email: z.email("Invalid email address"),
  password: z.string().min(8),
});

export function LoginForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter();
  const form = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
    validators: {
      onSubmit: formSchema,
    },
    onSubmit: async ({ value }) => {
      try {
        const { data, error } = await authClient.signIn.email(value);
        if (data && error === null) {
          toast.success("Login successfull !");
          return router.push("/");
        }
        toast.error("SOMETHING_WENT_WRONG");
        return;
      } catch (err: any) {
        toast.error(err.message);
        return;
      }
    },
  });

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card className="bg-[#E0F2f1] border-2 border-slate-300 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-center text-2xl font-bold">
            Login to your account
          </CardTitle>
          <CardDescription className="text-center font-semibold">
            Enter your email below to login to your account
          </CardDescription>
        </CardHeader>

        <CardContent>
          <form
            id="loginForm"
            onSubmit={(e) => {
              e.preventDefault();
              form.handleSubmit();
            }}
          >
            <FieldGroup>
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
            form="loginForm"
            className="bg-[#008080] hover:bg-[#008080] cursor-pointer w-full"
          >
            Login
          </Button>
          <Button
            variant="outline"
            type="button"
            className="bg-red-500 text-white hover:bg-red-500 hover:text-white cursor-pointer w-full"
          >
            <FaGoogle />
            Continue with Google
          </Button>
          <FieldDescription className="text-center font-semibold">
            Don&apos;t have an account? <a href="/signup">Sign up</a>
          </FieldDescription>
        </CardFooter>
      </Card>
    </div>
  );
}
