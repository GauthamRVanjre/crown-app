import LoginForm from "@/components/LoginForm";
import { Button } from "@/components/ui/button";

export default function Home() {
  return (
    <>
      <h1>Hello, testing development branch</h1>
      <div className="flex justify-center items-center">
        <LoginForm />
      </div>
    </>
  );
}
