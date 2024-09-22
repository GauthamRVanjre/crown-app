"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { AddUserFormValidation } from "@/lib/validations/AddUserFormValidation";
import { Switch } from "../ui/switch";
import { useQueryClient } from "@tanstack/react-query";
import PasswordField from "../PasswordField";
import { generateCustomerId } from "@/lib/utils/GenerateCustomerId";

const AddUserForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof AddUserFormValidation>>({
    resolver: zodResolver(AddUserFormValidation),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      isAdmin: false,
      customerId: "",
    },
  });

  const onFinish = async (values: z.infer<typeof AddUserFormValidation>) => {
    setIsLoading(true);

    console.log("values", values);
    try {
      const customerId = generateCustomerId(6);

      values.customerId = customerId;
      const response = await fetch(`/api/users`, {
        method: "POST",
        body: JSON.stringify(values),
      });
      if (response.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("user created successfully");
      } else if (response.status === 503) {
        toast.error("Email could not be sent to user");
      } else {
        toast.error("something went wrong! try again");
      }
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setIsLoading(false);
      form.reset();
    }
  };
  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-8">
          <ScrollArea className="h-[400px]">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="mt-8 w-[400px]">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="glass rounded-2xl"
                      type="text"
                      placeholder="Enter Name"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem className="mt-8 w-[400px]">
                  <FormLabel className="text-white-600">Enter Email</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="glass rounded-2xl"
                      type="text"
                      placeholder="Enter Email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem className="mt-8 w-[400px]">
                  <FormLabel className="text-white-600">
                    Enter Password
                  </FormLabel>
                  <FormControl>
                    <PasswordField isLoading={isLoading} field={field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="isAdmin"
              render={({ field }) => (
                <FormItem className="mt-4">
                  <FormLabel className="text-white-600">
                    Select Admin Status
                  </FormLabel>
                  <FormControl>
                    <div className="mt-4">
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-4 mb-2" disabled={isLoading} type="submit">
              Submit
            </Button>
          </ScrollArea>
        </form>
      </Form>
    </>
  );
};

export default AddUserForm;
