import React from "react";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import UserInvestmentsTable from "./UserInvestmentsTable";
import UserQueriesTable from "./UserQueriesTable";
const InvestmentsDetailCard = ({ userId }: { userId: string | undefined }) => {
  return (
    <Card>
      <CardHeader>
        <Tabs defaultValue="investments" className="w-full">
          <TabsList>
            <TabsTrigger className="text-xl font-bold" value="investments">
              Investments
            </TabsTrigger>
            <TabsTrigger className="text-xl font-bold" value="queries">
              Queries
            </TabsTrigger>
          </TabsList>
          <TabsContent value="investments">
            <UserInvestmentsTable userId={userId} />
          </TabsContent>
          <TabsContent value="queries">
            <UserQueriesTable userId={userId} />
          </TabsContent>
        </Tabs>
      </CardHeader>
      <CardContent></CardContent>
    </Card>
  );
};

export default InvestmentsDetailCard;
