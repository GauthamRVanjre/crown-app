"use client";
import LoginCard from "@/components/LoginCard";
import Navbar from "@/components/Navbar";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  const handleLogOut = async () => {
    console.log("clicked");
    await signOut();
    localStorage.clear();
  };
  return (
    <>
      <Navbar />
      <div className="flex justify-center items-center mt-10">
        <LoginCard />
      </div>

      <Button onClick={handleLogOut}>Log out</Button>
    </>
  );
}
