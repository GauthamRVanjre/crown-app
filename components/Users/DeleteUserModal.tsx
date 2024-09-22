import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "../ui/button";
import { useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";

interface DeleteUserModalProps {
  userId: string;
}

const DeleteUserModal: React.FC<DeleteUserModalProps> = ({ userId }) => {
  const queryClient = useQueryClient();
  const onSubmit = async () => {
    try {
      const deleteUser = await fetch(`/api/users/${userId}`, {
        method: "DELETE",
      });
      if (deleteUser.status === 200) {
        queryClient.invalidateQueries({ queryKey: ["users"] });
        toast.success("user created successfully");
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  return (
    <Dialog>
      <DialogTrigger>Delete User</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Are you absolutely sure?</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete the user
            and remove data from the servers.
          </DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button onClick={onSubmit}>Confirm</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DeleteUserModal;
