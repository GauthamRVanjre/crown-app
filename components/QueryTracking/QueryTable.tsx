"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { queryTrackingType } from "../../lib/types";
import { formatDate } from "../../lib/utils/formatDate";
import CreateableSelectDropdown from "@/lib/utils/CreateableSelectDropdown";
import { Button } from "../ui/button";
import toast from "react-hot-toast";

const QueryTable = () => {
  const queryClient = useQueryClient();

  const getQueries = async () => {
    const res = await fetch("/api/QueryTracking");
    const data = await res.json();
    return data;
  };

  const { data, isLoading, isSuccess, refetch } = useQuery<queryTrackingType[]>(
    {
      queryKey: ["query"],
      queryFn: getQueries,
      refetchOnReconnect: true,
    }
  );

  const [statusValue, setStatusValue] = useState<
    { label: string; value: string } | null | undefined
  >();
  const [editQuery, setEditQuery] = useState(-1);
  const queryStatusOptions = [
    { label: "Raised", value: "Raised" },
    { label: "InProcess", value: "InProcess" },
    { label: "Resolved", value: "Resolved" },
    { label: "Rejected", value: "Rejected" },
  ];

  const updateQuery = async (id: string) => {
    try {
      const response = await fetch(`/api/QueryTracking/${id}`, {
        method: "PUT",
        body: JSON.stringify({ status: statusValue?.value }),
      });

      if (response.status === 201) {
        queryClient.invalidateQueries({ queryKey: ["query"] });
        toast.success("Query updated successfully");
      } else {
        toast.error("something went wrong! try again");
      }
    } catch (error) {
      toast.error("Error updating query");
      console.log(error);
    }
  };

  return (
    <Table>
      <TableCaption>A list of Queries</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Created By</TableHead>
          <TableHead>Subject</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created At</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <div className="text-center pt-4">Loading...</div>}
        {isSuccess &&
          data?.map((user, index) => (
            <TableRow key={user.id}>
              <TableCell className="font-bold">
                {user.createdBy?.name}
              </TableCell>
              <TableCell>{user.subject}</TableCell>
              <TableCell>
                {index === editQuery ? (
                  <CreateableSelectDropdown
                    value={statusValue}
                    setValue={setStatusValue}
                    options={queryStatusOptions}
                    isLoading={false}
                    defaultValue={{
                      label: user.queryStatus,
                      value: user.queryStatus,
                    }}
                    placeholder="Select Status"
                  />
                ) : (
                  user.queryStatus
                )}
              </TableCell>
              <TableCell>{formatDate(user.createdAt)}</TableCell>

              <TableCell>
                {index === editQuery ? (
                  <Button
                    onClick={() => {
                      updateQuery(user.id);
                      setEditQuery(-1);
                    }}
                  >
                    Update
                  </Button>
                ) : (
                  <Button onClick={() => setEditQuery(index)}>
                    Edit Query
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default QueryTable;
