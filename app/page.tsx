"use client";
import { useSession, signOut, signIn } from "next-auth/react";
import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";

export default function Home() {
  const { data } = useSession();

  const handleLogOut = async () => {
    await signOut();
    localStorage.clear();
  };
  return (
    <>
      {/* <h1>Hello, testing development branch</h1>
      <div className="flex justify-center items-center">
        <LoginForm />
      </div> */}
      <div>{JSON.stringify(data?.user?.name)}</div>

      <Button onClick={() => handleLogOut}>Log out</Button>
    </>
  );
}
