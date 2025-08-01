import { toast } from "react-toastify";
import { CustomError } from "./errors";
import otpGenerator from "otp-generator";
import jwt from "jsonwebtoken";
import { Admin, User } from "@prisma/client";

export const parseErrors = (err: any) => {
  if (err instanceof CustomError) {
    console.log(err.serializeErrors());
    return { errors: err.serializeErrors(), code: err.statusCode };
  } else {
    // Log all errors for debugging
    console.error('Unhandled error:', err);

    // Handle different error types
    let message = "Something went wrong";

    if (err?.response?.data?.message) {
      message = err.response.data.message;
    } else if (err?.message) {
      message = err.message;
    } else if (typeof err === 'string') {
      message = err;
    }

    const errors = [{ message }];
    return { errors: errors, code: err?.response?.status || 400 };
  }
};

export const handleError = (errors: { message: string }[]) => {
  errors.forEach((item) => {
    toast.error(item.message);
  });
};

export const handleInfo = (message: string) => {
  toast.info(message);
};

export const handleSuccess = (message: string) => {
  toast.success(message);
};

export const generateOtp = () => {
  const otp = otpGenerator.generate(5, {
    digits: true,
    lowerCaseAlphabets: false,
    upperCaseAlphabets: false,
    specialChars: false,
  });

  return otp;
};

export const jwtSignCustomer = (user: User) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      username: user.username,
    },
    process.env.SECRET!
  );

  return token;
};

export const jwtSignAdmin = (user: Admin) => {
  const token = jwt.sign(
    {
      id: user.id,
      email: user.email,
      full_name: user.full_name,
      role: user.role,
    },
    process.env.SECRET!
  );

  return token;
};

export function convertTimeToDateTime(timeString: string) {
  const today = new Date();
  const [time, modifier] = timeString.split(" ");
  let [hours, minutes] = time.split(":").map(Number);

  if (modifier === "PM" && hours !== 12) hours += 12;
  if (modifier === "AM" && hours === 12) hours = 0;

  today.setHours(hours, minutes, 0, 0);
  return today.toISOString();
}

// Global error handler for network and unexpected errors
export const handleGlobalError = (error: any, context?: string) => {
  console.error(`Error in ${context || 'unknown context'}:`, error);

  if (error?.code === 'NETWORK_ERROR' || error?.message?.includes('fetch')) {
    toast.error('Network error. Please check your connection and try again.');
  } else if (error?.code === 'TIMEOUT') {
    toast.error('Request timed out. Please try again.');
  } else {
    const parsed = parseErrors(error);
    handleError(parsed.errors);
  }
};

// Helper to show different types of notifications
export const showNotification = {
  error: (message: string) => toast.error(message),
  success: (message: string) => toast.success(message),
  info: (message: string) => toast.info(message),
  warning: (message: string) => toast.warn(message),
};