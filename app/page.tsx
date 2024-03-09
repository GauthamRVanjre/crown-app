"use client";
import LoginCard from "@/components/LoginCard";
import { Button } from "@/components/ui/button";
import { useSession, signOut } from "next-auth/react";

export default function Home() {
  const { data } = useSession();

  const handleLogOut = async () => {
    await signOut();
    localStorage.clear();
  };
  return (
    <>
      <h1>Hello</h1>
      <h1>Hello, testing development branch</h1>
      <div className="flex justify-center items-center">
        <LoginCard />
      </div>
      <div>{JSON.stringify(data?.user)}</div>

      <Button onClick={() => handleLogOut}>Log out</Button>
    </>
  );
}
