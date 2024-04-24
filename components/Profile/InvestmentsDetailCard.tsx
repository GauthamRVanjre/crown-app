import React from "react";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { userTypes } from "@/lib/types";
import { formDate } from "@/lib/utils/formatDate";

const InvestmentsDetailCard = ({ data }: { data: userTypes | undefined }) => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Investments</h2>
      </CardHeader>
      <CardContent>
        <div className="overflow-auto">
          <table className="min-w-full w-full">
            <thead>
              <tr className="border-t border-gray-200 dark:border-gray-800">
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Date
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Type
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Amount
                </th>
                <th className="px-4 py-2 text-left text-sm font-medium text-gray-500 dark:text-gray-400">
                  Status
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-800">
              {data?.investments.map((investment) => (
                <tr key={investment.id} className="bg-gray-50 dark:bg-gray-800">
                  <td className="px-4 py-3 text-sm">
                    {formDate(investment.transactionDate)}
                  </td>
                  <td className="px-4 py-3 text-sm">
                    {investment.transactionType}
                  </td>
                  <td className="px-4 py-3 text-sm">{investment.amount}</td>
                  <td className="px-4 py-3 text-sm">{investment.status}</td>
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
