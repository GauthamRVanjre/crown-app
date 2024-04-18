import React from "react";
import { CardHeader, CardContent, Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "../ui/button";
import AddUserDetailsModal from "./AddUserDetailsModal";

const UserDetailsCard = () => {
  return (
    <Card>
      <CardHeader>
        <h2 className="text-xl font-bold">Profile</h2>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-end">
          <AddUserDetailsModal />
        </div>
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
  );
};

export default UserDetailsCard;
