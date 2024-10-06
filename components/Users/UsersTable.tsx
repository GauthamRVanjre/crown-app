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
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { userTypes } from "@/lib/types";
import DeleteUserModal from "./DeleteUserModal";
import EditUserDetailsModal from "../Profile/EditUserDetailsModal";

const UsersTable = () => {
  const getUsers = async () => {
    console.log("users fetch");
    const res = await fetch("/api/users");
    const data = await res.json();
    return data;
  };

  const { data, isLoading, isSuccess } = useQuery<userTypes[]>({
    queryKey: ["users"],
    queryFn: getUsers,
    // staleTime: 0,
    refetchOnReconnect: true,
  });

  return (
    <Table>
      <TableCaption>A list of Users</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Admin</TableHead>
          <TableHead>Phone Number</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {isLoading && <div className="text-center pt-4">Loading...</div>}
        {isSuccess &&
          data?.map((user) => (
            <TableRow key={user.id}>
              <TableCell className="font-bold">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.isAdmin ? "YES" : "NO"}</TableCell>
              <TableCell>{user.phoneNumber}</TableCell>
              <TableCell className="flex flex-row">
                <EditUserDetailsModal data={user} isAdmin={true} />
                <DeleteUserModal userId={user.id} />
              </TableCell>
            </TableRow>
          ))}
      </TableBody>
    </Table>
  );
};

export default UsersTable;
