"use client";
import { useSession } from "next-auth/react";
import Link from "next/link";
import React from "react";
import { Button } from "@/components/ui/button";

const Page = () => {
  const { data: session } = useSession();

  return (
    <>
      <div>Welcome to the Crown, {session?.user.name}</div>
      <div className="flex justify-center items-center mt-10">
        <Link href={`/Profile/${session?.user.id}`}>
          <Button>Go to Profile</Button>
        </Link>
      </div>
    </>
  );
};

export default Page;
