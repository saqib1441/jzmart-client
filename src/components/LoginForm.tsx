import { FC } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";

const LoginForm: FC = () => {
  return (
    <form className="space-y-4 text-center">
      <div className="space-y-1">
        <Label>Email</Label>
        <Input type="email" placeholder="Enter your email" />
      </div>
      <div className="space-y-1">
        <Label>Password</Label>
        <Input type="password" placeholder="Enter your password" />
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Checkbox />
          <Label className="font-normal">Remember me</Label>
        </div>
        <Link href="/forget">Forgot your password?</Link>
      </div>
      <Button>Login</Button>
    </form>
  );
};

export default LoginForm;
