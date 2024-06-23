import { userTypes } from "@/lib/types";
import { AddConsultingCallsSchema } from "@/lib/validations/AddConsultingCallsFormValidation";
import { useQueryClient } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { z } from "zod";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import CreatableSelect from "react-select/creatable";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";

const AddConsultingCallForm = () => {
  const adminUsers: { key: string; value: string }[] = []; // {key: name, value: id}
  const clientUsers: { key: string; value: string }[] = [];

  const [isLoading, setIsLoading] = useState(false);
  const queryClient = useQueryClient();

  const getUsers = async () => {
    const res = await fetch("/api/users");
    const data: userTypes[] = await res.json();
    console.log(data);
    data.filter((d) =>
      d.isAdmin
        ? adminUsers.push({ key: d.name, value: d.id })
        : clientUsers.push({ key: d.name, value: d.id })
    );
  };

  useEffect(() => {
    getUsers();
  }, []);

  const form = useForm<z.infer<typeof AddConsultingCallsSchema>>({
    resolver: zodResolver(AddConsultingCallsSchema),
    defaultValues: {
      interviewerId: "",
      clientId: "",
      docLink: "",
    },
  });

  const onFinish = async (values: z.infer<typeof AddConsultingCallsSchema>) => {
    // setIsLoading(true);

    console.log("values", values);
    // try {
    //   const response = await fetch(`/api/users`, {
    //     method: "POST",
    //     body: JSON.stringify(values),
    //   });

    //   if (response.status === 200) {
    //     queryClient.invalidateQueries({ queryKey: ["users"] });
    //     toast.success("user created successfully");
    //   } else {
    //     toast.error("something went wrong! try again");
    //   }
    // } catch (error) {
    //   console.log("something went wrong");
    // } finally {
    //   setIsLoading(false);
    //   form.reset();
    // }
  };

  return (
    <>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onFinish)} className="space-y-8">
          <ScrollArea className="h-[400px]">
            <FormField
              control={form.control}
              name="interviewerId"
              render={({ field }) => (
                <FormItem className="mt-8 w-[400px]">
                  <FormLabel>Interviewer</FormLabel>
                  <FormControl>
                    <CreatableSelect
                      isDisabled={isLoading}
                      placeholder="Select Interviewer"
                      isClearable
                      options={adminUsers}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Client */}
            <FormField
              control={form.control}
              name="clientId"
              render={({ field }) => (
                <FormItem className="mt-8 w-[400px]">
                  <FormLabel>Client</FormLabel>
                  <FormControl>
                    <CreatableSelect
                      isDisabled={isLoading}
                      placeholder="Select client"
                      isClearable
                      options={clientUsers}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Doc Link */}
            <FormField
              control={form.control}
              name="docLink"
              render={({ field }) => (
                <FormItem className="mt-8 w-[400px]">
                  <FormLabel>Doc Link</FormLabel>
                  <FormControl>
                    <Input
                      disabled={isLoading}
                      className="glass rounded-2xl"
                      type="text"
                      placeholder="Enter Password"
                      {...field}
                    />
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

export default AddConsultingCallForm;
