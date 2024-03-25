"use client";
import { useSession } from "next-auth/react";
import React from "react";

const page = () => {
  const { data: session } = useSession();

  return <div>Welcome to the Crown, {session?.user.name}</div>;
};

export default page;