"use client";
import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "../../components/ui/table";
import { useQueryClient } from "@tanstack/react-query";
import { queryTrackingType } from "../../lib/types";
import { formatDate } from "../../lib/utils/formatDate";
import CreateableSelectDropdown from "@/lib/utils/CreateableSelectDropdown";
import { Button } from "../ui/button";
import toast from "react-hot-toast";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import Pagination, { PageState } from "@/lib/utils/Pagination";

const QueryTable = () => {
  const [data, setData] = useState<queryTrackingType[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [pageState, setPageState] = useState<PageState>({
    count: 0,
    skip: 0,
    take: 5,
  });
  const queryClient = useQueryClient();

  const getQueries = async () => {
    setIsLoading(true);
    try {
      const timestamp = Date.parse(new Date().toString());
      const res = await fetch(
        `/api/QueryTracking?${timestamp}&skip=${pageState.skip}&take=${pageState.take}`
      );
      const response = await res.json();
      console.log("response: " + JSON.stringify(response));
      setIsSuccess(true);
      setPageState({
        count: response.count,
        skip: pageState.skip,
        take: pageState.take,
      });
      setData(response.queries);
    } catch (error) {
      setIsSuccess(false);
    } finally {
      setIsLoading(false);
    }
  };

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
        getQueries();
      } else {
        toast.error("something went wrong! try again");
      }
    } catch (error) {
      toast.error("Error updating query");
      console.log(error);
    }
  };

  useEffect(() => {
    getQueries();
  }, [pageState.skip]);

  return (
    <>
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
          {!isLoading &&
            isSuccess &&
            data?.map((user, index) => (
              <TableRow key={user.id}>
                <TableCell className="font-bold">
                  <Sheet>
                    <SheetTrigger>{user.createdBy?.name}</SheetTrigger>
                    <SheetContent>
                      <SheetHeader>
                        <SheetTitle>Query Details</SheetTitle>
                        <SheetDescription>
                          <div className=" h-48 flex flex-col mt-4">
                            <div className="mb-4">
                              <h3 className="header-text">Subject: </h3>
                              <p>{user.subject}</p>
                            </div>
                            <div>
                              <h3 className="header-text">Description:</h3>
                              <p>{user.queryStatus}</p>
                            </div>
                          </div>
                        </SheetDescription>
                      </SheetHeader>
                    </SheetContent>
                  </Sheet>
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
        <Pagination pageState={pageState} onPageChange={setPageState} />
      </Table>
    </>
  );
};

export default QueryTable;
