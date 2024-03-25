"use client";
import { ForgotPasswordFormValidation } from "@/lib/validations/ForgotPasswordFormValidation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn, useSession } from "next-auth/react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { DialogClose } from "./ui/dialog";
import { useQueryClient } from "@tanstack/react-query";

const ForgotPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof ForgotPasswordFormValidation>>({
    resolver: zodResolver(ForgotPasswordFormValidation),
    defaultValues: {
      email: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onFinish = async (
    values: z.infer<typeof ForgotPasswordFormValidation>
  ) => {
    // setIsLoading(true);
    console.log(values);
    try {
      if (values.password !== values.confirmPassword) {
        toast.error("Confirm password should be same as new password");
      }
    } catch (error) {}
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-8">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white-600">Email</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className=" border-none"
                    type="email"
                    placeholder="Enter your Email"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" text-red-600" />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white-600">New Password</FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className=" border-none"
                    type="password"
                    placeholder="Enter your New password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" text-red-600" />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="confirmPassword"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-white-600">
                  Confirm Password
                </FormLabel>
                <FormControl>
                  <Input
                    disabled={isLoading}
                    className=" border-none"
                    type="password"
                    placeholder="Confirm your Password"
                    {...field}
                  />
                </FormControl>
                <FormMessage className=" text-red-600" />
              </FormItem>
            )}
          />

          <Button type="submit">Reset Password</Button>
          {/* <DialogClose>
          </DialogClose> */}
        </form>
      </Form>
    </>
  );
};

export default ForgotPasswordForm;
