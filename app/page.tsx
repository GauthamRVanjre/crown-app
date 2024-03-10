"use client";
import LoginCard from "@/components/LoginCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data, status } = useSession();

  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <LoginCard />
      </div>
    </>
  );
}
