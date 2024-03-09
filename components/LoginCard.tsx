"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

import { useState } from "react";
import toast from "react-hot-toast";
import LoginForm from "./LoginForm";

const LoginCard = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [loading, setLoading] = useState(false);

  // try {
  //   const result = await signIn("credentials", {
  //     email: values.email,
  //     password: values.password,
  //     redirect: false,
  //     callbackUrl: "/",
  //   });
  //   if (result?.error) {
  //     toast.error("Invalid Credentials");
  //   }
  //   if (result?.url) {
  //     toast.success("login successfull");
  //   }
  // } catch (error) {
  //   console.log("something went wrong");
  // } finally {
  //   setIsLoading(false);
  // }

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Login</CardTitle>
          <CardDescription>
            Login to your account by entering your email address and password
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <LoginForm />
        </CardContent>
        <CardFooter></CardFooter>
      </Card>
    </>
  );
};

export default LoginCard;
