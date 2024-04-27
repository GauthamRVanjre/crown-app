import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import EditUserDetailsForm from "./EditUserDetailsForm";
import { userTypes } from "@/lib/types";

const EditUserDetailsModal = ({ data }: { data: userTypes | undefined }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>+ Edit Profile</DialogTrigger>
        <DialogContent className=" border-none">
          <DialogHeader>
            <DialogTitle>Edit Profile</DialogTitle>
            <DialogDescription>
              <EditUserDetailsForm data={data} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default EditUserDetailsModal;
