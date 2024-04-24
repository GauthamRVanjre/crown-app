import React from "react";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { userTypes } from "@/lib/types";

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
              <tr className="bg-gray-50 dark:bg-gray-800">
                <td className="px-4 py-3 text-sm">Seed Funding</td>
                <td className="px-4 py-3 text-sm">$100,000</td>
                <td className="px-4 py-3 text-sm">Active</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <td className="px-4 py-3 text-sm">Series A</td>
                <td className="px-4 py-3 text-sm">$500,000</td>
                <td className="px-4 py-3 text-sm">Active</td>
              </tr>
              <tr className="bg-gray-50 dark:bg-gray-800">
                <td className="px-4 py-3 text-sm">Series B</td>
                <td className="px-4 py-3 text-sm">$1,000,000</td>
                <td className="px-4 py-3 text-sm">Pending</td>
              </tr>
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  );
};

export default InvestmentsDetailCard;
