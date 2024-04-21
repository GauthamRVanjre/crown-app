"use client";
import { useSession } from "next-auth/react";
import ProfileLayout from "@/components/Profile/ProfileLayout";
import Link from "next/link";
import React from "react";

const Page = () => {
  const { data: session } = useSession();

  return (
    <>
      <div>Welcome to the Crown, {session?.user.name}</div>
      {/* <Link href={`/profile/${session?.user.id}`}>Go to Profile</Link> */}
      <ProfileLayout />
    </>
  );
};

export default Page;
