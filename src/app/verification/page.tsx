"use client";

import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { REGEXP_ONLY_DIGITS } from "input-otp";
import toast from "react-hot-toast";
import {
  useRegisterUserMutation,
  useSendOtpMutation,
} from "@/redux/services/AuthService";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { useRouter } from "next/navigation";
import Loader from "@/components/Loader";

// Error DTO type
type ErrorDTO = {
  status: number;
  data: {
    success: boolean;
    message: string;
    stack: string;
  };
};

export default function Page() {
  const [otp, setOtp] = useState<string>("");
  const router = useRouter();
  const { tempData } = useSelector((state: RootState) => state.auth);

  const [registerUser, { isLoading: isRegistering }] =
    useRegisterUserMutation();

  const [sendOtp, { isLoading: isSendingOtp, data: otpData, error: otpError }] =
    useSendOtpMutation();

  // Handle OTP submission
  const handleSubmit = async () => {
    if (!otp || otp.length !== 6) {
      return toast.error("Please enter a valid 6-digit OTP.");
    }

    try {
      const response = await registerUser({ ...tempData, otp }).unwrap();
      toast.success(response?.message || "Registered successfully!");
      setOtp("");
      router.push("/"); // Or redirect to dashboard/login page
    } catch (err) {
      const errorData = err as ErrorDTO;
      toast.error(errorData?.data?.message || "Registration failed.");
    }
  };

  // Handle resend OTP
  const handleResend = async () => {
    try {
      const res = await sendOtp(tempData).unwrap();
      toast.success(res?.message || "OTP resent successfully!");
      setOtp("");
    } catch (err) {
      const errorData = err as ErrorDTO;
      toast.error(errorData?.data?.message || "Failed to resend OTP.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-white dark:bg-gray-900 px-4">
      {(isRegistering || isSendingOtp) && <Loader />}

      <Card className="w-full max-w-md shadow-xl">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl font-bold">
            Verify Your Email
          </CardTitle>
          <CardDescription className="text-gray-600 dark:text-gray-300">
            We've sent a 6-digit code to your email. Enter it below to continue.
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="flex justify-center">
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={otp}
              onChange={setOtp}
            >
              <InputOTPGroup>
                {Array.from({ length: 6 }).map((_, i) => (
                  <InputOTPSlot key={i} index={i} />
                ))}
              </InputOTPGroup>
            </InputOTP>
          </div>

          <Button
            onClick={handleSubmit}
            className="w-full"
            disabled={isRegistering || isSendingOtp || otp.length !== 6}
          >
            Submit Code
          </Button>

          <Button
            variant="ghost"
            className="w-full"
            onClick={handleResend}
            disabled={isRegistering || isSendingOtp}
          >
            Resend Email
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
