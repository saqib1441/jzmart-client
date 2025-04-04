import { FC } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";

const RegisterForm: FC = () => {
  return (
    <form className="space-y-4 text-center">
      <div className="space-y-1">
        <Label>Name</Label>
        <Input placeholder="Enter your full name" />
      </div>
      <div className="space-y-1">
        <Label>Email</Label>
        <Input type="email" placeholder="Enter your email" />
      </div>
      <div className="space-y-1">
        <Label>Password</Label>
        <Input type="password" placeholder="Enter your password" />
      </div>
      <div className="space-y-1">
        <Label>Confirm Password</Label>
        <Input type="password" placeholder="Re-enter your password" />
      </div>
      <Button>Create Account</Button>
    </form>
  );
};

export default RegisterForm;
