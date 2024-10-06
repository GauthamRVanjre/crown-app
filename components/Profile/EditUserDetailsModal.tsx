import React, { useState } from "react";
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
import EditUserDetailsAdminPersona from "./EditUserDetailsFormAdminPersona";

interface EditUserDetailsModalProps {
  data: userTypes | undefined;
  isAdmin: boolean;
}

const EditUserDetailsModal: React.FC<EditUserDetailsModalProps> = ({
  data,
  isAdmin,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <div className="mr-2">
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogTrigger>
            {isAdmin ? "Edit User" : "+ Edit Profile"}
          </DialogTrigger>
          <DialogContent className=" border-none">
            <DialogHeader>
              <DialogTitle>
                {isAdmin ? "Edit User" : "Edit Profile"}
              </DialogTitle>
              <DialogDescription>
                {isAdmin ? (
                  <EditUserDetailsAdminPersona
                    data={data}
                    setIsOpen={setIsOpen}
                  />
                ) : (
                  <EditUserDetailsForm data={data} setIsOpen={setIsOpen} />
                )}
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
};

export default EditUserDetailsModal;
