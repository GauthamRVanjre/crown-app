"use client";

import { LoginFormValidation } from "@/lib/validations/LoginFormValidation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toast } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "lucide-react";
import PasswordField from "./PasswordField";

const LoginForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof LoginFormValidation>>({
    resolver: zodResolver(LoginFormValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onFinish = async (values: z.infer<typeof LoginFormValidation>) => {
    setIsLoading(true);
    try {
      const result = await signIn("credentials", {
        email: values.email,
        password: values.password,
        redirect: false,
        callbackUrl: "/",
      });
      if (result?.error) {
        toast.error("Invalid Credentials");
      } else if (result?.url) {
        toast.success("Login successful");
        router.push("/Profile");
      }
    } catch (error) {
      console.error("Something went wrong", error);
      toast.error("An unexpected error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onFinish)} className="space-y-6">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white-600">Email</FormLabel>
              <FormControl>
                <Input
                  disabled={isLoading}
                  className="border-none"
                  type="email"
                  placeholder="Enter your Email"
                  {...field}
                />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white-600">Password</FormLabel>
              <FormControl>
                <PasswordField isLoading={isLoading} field={field} />
              </FormControl>
              <FormMessage className="text-red-600" />
            </FormItem>
          )}
        />
        <div className="flex justify-between items-center">
          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Logging in..." : "Login"}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default LoginForm;
