/**
 * v0 by Vercel.
 * @see https://v0.dev/t/pf65nwPv5iv
 * Documentation: https://v0.dev/docs#integrating-generated-code-into-your-nextjs-app
 */
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export default function Component() {
  return (
    <div className="w-full py-6 space-y-6">
      <div className="container space-y-4">
        <Card>
          <CardHeader>
            <h2 className="text-xl font-bold">Profile</h2>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Name</Label>
                <div className="font-medium">Jenny Wilson</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="font-medium">jenny@example.com</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Phone</Label>
                <div className="font-medium">+1 (555) 123-4567</div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <div className="font-medium">
                  123 Street Rd, Cityville, CA, 90001
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
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
      </div>
    </div>
  );
}