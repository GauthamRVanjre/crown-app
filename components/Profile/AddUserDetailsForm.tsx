"use client";
import { userTypes } from "@/lib/types";
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
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSession } from "next-auth/react";
import React, { ChangeEvent, useState } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { z } from "zod";
import { Switch } from "../ui/switch";
import { useQueryClient } from "@tanstack/react-query";
import { Dialog, DialogClose } from "../ui/dialog";
import { AddUserDetailFormValidation } from "@/lib/validations/AddUserDetailsFormValidation";

const AddUserDetailsForm = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { data: session } = useSession();
  const queryClient = useQueryClient();

  const form = useForm<z.infer<typeof AddUserDetailFormValidation>>({
    resolver: zodResolver(AddUserDetailFormValidation),
    defaultValues: {
      brokerName: "",
      phoneNumber: 0,
      investmentGoal: "",
      riskTakingCapacity: "",
    },
  });

  const onFinish = async (
    values: z.infer<typeof AddUserDetailFormValidation>
  ) => {
    setIsLoading(true);

    // console.log("values", values);
    try {
      const response = await fetch(`/api/users`, {
        method: "POST",
        body: JSON.stringify(values),
      });

      if (response.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("user created successfully");
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
              name="brokerName"
              render={({ field }) => (
                <FormItem className="mt-8 w-[400px]">
                  <FormLabel>Broker Name</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="glass rounded-2xl"
                      type="text"
                      placeholder="Enter Broker Name"
                      {...field}
                    />
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
                      disabled={isLoading}
                      className="glass rounded-2xl"
                      type="number"
                      placeholder="Enter Phone Number"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="investmentGoal"
              render={({ field }) => (
                <FormItem className="mt-8 w-[400px]">
                  <FormLabel>Investment Goal</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="glass rounded-2xl"
                      type="number"
                      placeholder="Enter Investment Goal"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="riskTakingCapacity"
              render={({ field }) => (
                <FormItem className="mt-8 w-[400px]">
                  <FormLabel>Risk Taking Capacity</FormLabel>
                  <FormControl>
                    <select
                      disabled={isLoading}
                      className="glass rounded-2xl"
                      {...field}
                    >
                      <option value="">Select</option>
                      <option value="low">Low</option>
                      <option value="medium">Medium</option>
                      <option value="high">High</option>
                    </select>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button className="mt-2" disabled={isLoading} type="submit">
              Submit
            </Button>
          </ScrollArea>
        </form>
      </Form>
    </>
  );
};

export default AddUserDetailsForm;
