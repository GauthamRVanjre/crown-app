"use client";
import ProfileLayout from "@/components/Profile/ProfileLayout";
import { useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const { data: session } = useSession();

  return (
    <>
      <div>Welcome to the Crown, {session?.user.name}</div>
      <ProfileLayout />
    </>
  );
};

export default Page;
