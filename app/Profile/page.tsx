"use client";
import TradingViewWidget from "@/components/TradingViewWidget";
import { useSession } from "next-auth/react";
import React from "react";

const Page = () => {
  const { data: session } = useSession();

  return (
    <>
      <div>Welcome to the Crown, {session?.user.name}</div>
    </>
  );
};

export default Page;
