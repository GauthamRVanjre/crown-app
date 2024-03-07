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

const LoginForm = () => {
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
          <div className="space-y-1">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="email">email address</Label>
            <Input
              id="email"
              type="email"
              onChange={(e) => setemail(e.target.value)}
              placeholder="Enter Email"
              required
            />
          </div>
          <div className="space-y-1">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
            />
          </div>
        </CardContent>
        <CardFooter>
          {loading ? (
            <Button disabled>Please wait...</Button>
          ) : (
            <Button onClick={() => console.log("clicked")}>Login</Button>
          )}
        </CardFooter>
      </Card>
    </>
  );
};

export default LoginForm;
