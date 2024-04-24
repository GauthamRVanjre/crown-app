import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import { investmentType } from "@/lib/types";
import { formDate } from "@/lib/utils/formatDate";

const InvestmentsTable = () => {
  const getInvestments = async () => {
    const res = await fetch("/api/investments?skip=0&take=10");
    const data = await res.json();
    // console.log("data", data);
    return data.data;
  };

  const {
    data: investmentData,
    isLoading,
    isSuccess,
    refetch,
  } = useQuery<investmentType[]>({
    queryKey: ["investments"],
    queryFn: getInvestments,
    refetchOnReconnect: true,
  });

  return (
    <Table>
      <TableCaption>A list of Investments</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Date</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <div className="text-center pt-4">Loading...</div>}
        {isSuccess &&
          investmentData?.map((investment) => (
            <TableRow key={investment.id}>
              <TableCell className="font-bold">
                {investment.client?.name}
              </TableCell>
              <TableCell>{formDate(investment.transactionDate)}</TableCell>
              <TableCell>{investment.transactionType}</TableCell>
              <TableCell>{investment.amount}</TableCell>
              <TableCell>{investment.status}</TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default InvestmentsTable;
