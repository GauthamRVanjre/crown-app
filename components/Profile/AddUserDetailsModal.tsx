import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddUserDetailsForm from "./AddUserDetailsForm";

const AddUserDetailsModal = () => {
  return (
    <>
      <Dialog>
        <DialogTrigger>+ Add New User</DialogTrigger>
        <DialogContent className=" border-none">
          <DialogHeader>
            <DialogTitle>Add New User</DialogTitle>
            <DialogDescription>
              <AddUserDetailsForm />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddUserDetailsModal;
