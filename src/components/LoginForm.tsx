"use client";

import { FC, FormEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import Link from "next/link";
import { Checkbox } from "./ui/checkbox";
import { useLoginUserMutation } from "@/redux/services/AuthService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

// Reusable error type
type ErrorDTO = {
  status: number;
  data: {
    message: string;
    stack?: string;
    success: boolean;
  };
};

const LoginForm: FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const router = useRouter();
  const [loginUser, { isLoading }] = useLoginUserMutation();

  const handleLogin = async (e: FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      return toast.error("All fields are required.");
    }

    try {
      const response = await loginUser({ email, password }).unwrap();
      toast.success(response?.message || "Login successful!");
      router.push("/");
    } catch (err) {
      const error = err as ErrorDTO;
      const message =
        error?.data?.message ||
        (err instanceof Error ? err.message : "Login failed.");
      toast.error(message);
    }
  };

  return (
    <form className="space-y-4 text-center" onSubmit={handleLogin}>
      {/* Loader */}
      {isLoading && <Loader />}

      <div className="space-y-1 text-left">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="space-y-1 text-left">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <div className="flex items-center justify-between text-sm">
        <div className="flex items-center gap-2">
          <Checkbox id="remember-me" />
          <Label
            htmlFor="remember-me"
            className="font-normal cursor-pointer select-none"
          >
            Remember me
          </Label>
        </div>
        <Link
          href="/forget"
          className="underline text-blue-600 hover:text-blue-800"
        >
          Forgot password?
        </Link>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        Login
      </Button>
    </form>
  );
};

export default LoginForm;
