"use client";

import { FC, FormEvent, useState } from "react";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { useSendOtpMutation } from "@/redux/services/AuthService";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { AppDispatch } from "@/redux/store";
import { setTempData } from "@/redux/slices/AuthSlice";
import Loader from "./Loader";

// Error DTO types
type ApiError = {
  status: number;
  data: {
    success: boolean;
    message: string;
    stack?: string;
  };
};

type FetchError = {
  error: string;
  status: "FETCH_ERROR";
};

const RegisterForm: FC = () => {
  const [sendOtp, { isLoading }] = useSendOtpMutation();
  const dispatch = useDispatch<AppDispatch>();
  const router = useRouter();

  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [passwordCriteria, setPasswordCriteria] = useState({
    length: false,
    uppercase: false,
    lowercase: false,
    number: false,
    specialChar: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;

    setFormValues((prev) => ({
      ...prev,
      [id]: value,
    }));

    if (id === "password") {
      validatePassword(value);
    }
  };

  const validatePassword = (password: string) => {
    setPasswordCriteria({
      length: password.length >= 6,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      number: /\d/.test(password),
      specialChar: /[@$!%*?&]/.test(password),
    });
  };

  const resetForm = () => {
    setFormValues({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
    });
    setPasswordCriteria({
      length: false,
      uppercase: false,
      lowercase: false,
      number: false,
      specialChar: false,
    });
  };

  const formHandler = async (e: FormEvent) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = formValues;

    // Basic validations
    if (!name || !email || !password || !confirmPassword) {
      return toast.error("All fields are required!");
    }

    if (name.trim().length <= 3) {
      return toast.error("Please enter a valid name.");
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return toast.error("Invalid email format.");
    }

    const passwordRegex =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{6,}$/;
    if (!passwordRegex.test(password)) {
      return toast.error(
        "Password must include uppercase, lowercase, number, and special character."
      );
    }

    if (password !== confirmPassword) {
      return toast.error("Passwords do not match.");
    }

    const payload = { name, email, password, purpose: "register" };

    try {
      const response = await sendOtp(payload);

      if ("error" in response) {
        const err = response.error as FetchError | ApiError;

        if ("status" in err && err.status === "FETCH_ERROR") {
          return toast.error(err.error);
        }

        if ("data" in err) {
          return toast.error(err.data.message);
        }

        return toast.error("Unexpected error occurred.");
      }

      dispatch(setTempData(payload));
      toast.success(response.data.message);
      resetForm();
      router.push("/verification");
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Something went wrong!";
      toast.error(message);
    }
  };

  return (
    <form className="space-y-4 text-center" onSubmit={formHandler}>
      {isLoading && <Loader />}

      {/* Name */}
      <div className="space-y-1">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          placeholder="Enter your full name"
          value={formValues.name}
          onChange={handleInputChange}
        />
      </div>

      {/* Email */}
      <div className="space-y-1">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="Enter your email"
          value={formValues.email}
          onChange={handleInputChange}
        />
      </div>

      {/* Password */}
      <div className="space-y-1">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="Enter your password"
          value={formValues.password}
          onChange={handleInputChange}
        />
        <ul className="list-disc pl-5 text-start text-sm">
          <li
            className={
              passwordCriteria.length ? "text-green-500" : "text-red-500"
            }
          >
            At least 6 characters
          </li>
          <li
            className={
              passwordCriteria.uppercase ? "text-green-500" : "text-red-500"
            }
          >
            One uppercase letter
          </li>
          <li
            className={
              passwordCriteria.lowercase ? "text-green-500" : "text-red-500"
            }
          >
            One lowercase letter
          </li>
          <li
            className={
              passwordCriteria.number ? "text-green-500" : "text-red-500"
            }
          >
            One number
          </li>
          <li
            className={
              passwordCriteria.specialChar ? "text-green-500" : "text-red-500"
            }
          >
            One special character
          </li>
        </ul>
      </div>

      {/* Confirm Password */}
      <div className="space-y-1">
        <Label htmlFor="confirmPassword">Confirm Password</Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="Re-enter your password"
          value={formValues.confirmPassword}
          onChange={handleInputChange}
        />
      </div>

      <Button type="submit" disabled={isLoading}>
        Create Account
      </Button>
    </form>
  );
};

export default RegisterForm;
