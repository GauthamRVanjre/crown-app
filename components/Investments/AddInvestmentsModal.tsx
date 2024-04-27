import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddInvestmentForm from "./AddInvestmentForm";

const AddInvestmentsModal = ({ id }: { id: string | undefined }) => {
  return (
    <>
      <Dialog>
        <DialogTrigger>+ Add Investment</DialogTrigger>
        <DialogContent className=" border-none">
          <DialogHeader>
            <DialogTitle>Add Investment</DialogTitle>
            <DialogDescription>
              <AddInvestmentForm id={id} />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default AddInvestmentsModal;
