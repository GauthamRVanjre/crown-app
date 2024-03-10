"use client";
import Navbar from "@/components/Navbar";
import AddUserModal from "@/components/Users/AddUserModal";
import UsersTable from "@/components/Users/UsersTable";
import React from "react";

const page = () => {
  return (
    <>
      <Navbar />
      <div className="flex justify-end  pr-28 mt-16">
        <AddUserModal />
      </div>
      <div className=" flex justify-center items-center pl-32 pr-32 mt-10">
        <UsersTable />
      </div>
    </>
  );
};

export default page;
