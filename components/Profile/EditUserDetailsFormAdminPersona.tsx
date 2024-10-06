"use client";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Switch } from "../ui/switch";
import { useQueryClient } from "@tanstack/react-query";
import { userTypes } from "@/lib/types";
import { EditUserDetailFormAdminPersonaValidation } from "@/lib/validations/EditUserDetailFormAdminPersonaValidation";

const EditUserDetailsAdminPersona = ({
  data,
  setIsOpen,
}: {
  data: userTypes | undefined;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const form = useForm<
    z.infer<typeof EditUserDetailFormAdminPersonaValidation>
  >({
    resolver: zodResolver(EditUserDetailFormAdminPersonaValidation),
    defaultValues: {
      isAdmin: data?.isAdmin,
      email: data?.email,
      phoneNumber: data?.phoneNumber,
    },
  });

  const onFinish = async (
    values: z.infer<typeof EditUserDetailFormAdminPersonaValidation>
  ) => {
    console.log("values", values);
    try {
      const response = await fetch(`/api/users/${data?.id}`, {
        method: "PUT",
        body: JSON.stringify({
          isAdmin: values?.isAdmin,
          email: values?.email,
          phoneNumber: values?.phoneNumber,
        }),
      });
      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        queryClient.refetchQueries({ queryKey: ["users"] });
        toast.success("user updated successfully");
      } else {
        toast.error("something went wrong! try again");
      }
      setIsOpen(false);
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

          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem className="mt-8 w-[400px]">
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter Phone Number"
                    {...field}
                    disabled={isLoading}
                    className="glass rounded-2xl"
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

          <Button
            className={`${isLoading && "loader"} mt-2`}
            disabled={isLoading}
            type="submit"
          >
            Submit
          </Button>
        </form>
      </Form>
    </>
  );
};

export default EditUserDetailsAdminPersona;
