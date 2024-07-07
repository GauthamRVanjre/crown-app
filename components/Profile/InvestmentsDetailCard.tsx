import React from "react";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { investmentType, userTypes } from "@/lib/types";
import { formatDate, formatTime } from "@/lib/utils/formatDate";
import AddInvestmentsModal from "../Investments/AddInvestmentsModal";
import { useQuery } from "@tanstack/react-query";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Input } from "postcss";
import { Button } from "../ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const InvestmentsDetailCard = ({ userId }: { userId: string | undefined }) => {
  const getUserInvestments = async () => {
    const res = await fetch(`/api/investments/${userId}`);
    const data = await res.json();
    return data;
  };

  const { data, isLoading, isSuccess, refetch } = useQuery<investmentType[]>({
    queryKey: ["investments"],
    queryFn: getUserInvestments,
    refetchOnReconnect: true,
  });

  console.log("data", data);

  return (
    <Card>
      <CardHeader>
        <Tabs defaultValue="account" className="w-[400px]">
          <TabsList>
            <TabsTrigger className="text-xl font-bold" value="account">
              Investments
            </TabsTrigger>
            <TabsTrigger className="text-xl font-bold" value="password">
              Queries
            </TabsTrigger>
          </TabsList>
          <TabsContent value="account">
            Make changes to your account here.
          </TabsContent>
          <TabsContent value="password">Change your password here.</TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end">
          <AddInvestmentsModal id={userId} />
        </div>
        <div className="overflow-auto">
          <table className="min-w-full w-full">
            <thead>
              <tr className="border-t border-gray-200 dark:border-gray-800">
                <th>Order placed at Date</th>
                <th>Order placed at Time</th>
                <th>Type</th>
                <th>Amount</th>
                <th>Status</th>
                <th>Approved/Rejected At</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {data &&
                data?.map((investment) => (
                  <tr
                    key={investment.id}
                    className="bg-gray-50 dark:bg-gray-800"
                  >
                    <td className="px-4 py-3 text-sm">
                      {formatDate(investment.transactionDate)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {formatTime(investment.transactionDate)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      {investment.transactionType}
                    </td>
                    <td className="px-4 py-3 text-sm">{investment.amount}</td>
                    <td className="px-4 py-3 text-sm">
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            // className="text-white bg-green-600 mr-2 border-none"
                            variant="outline"
                          >
                            {investment.status}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-80">
                          {investment.approvalNote
                            ? investment.approvalNote
                            : investment.rejectionNote}
                        </PopoverContent>
                      </Popover>
                    </td>
                    {investment.updatedAt ? (
                      <td className="px-4 py-3 text-sm">
                        {formatDate(investment.updatedAt) +
                          " - " +
                          formatTime(investment.updatedAt)}
                      </td>
                    ) : (
                      <td className="px-4 py-3 text-sm">-</td>
                    )}
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentsDetailCard;
