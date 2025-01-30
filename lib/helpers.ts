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
    const errors = [
      {
        message: err?.message || "Something went wrong",
      },
    ];
    return { errors: errors, code: 400 };
  }
};

export const handleError = (errors: { message: string }[]) => {
  errors.forEach((item) => {
    toast.error(item.message);
  });
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
  const today = new Date(); // Get today's date
  const [hours, minutes] = timeString.split(":").map(Number);

  today.setHours(hours, minutes, 0, 0); // Set the time part

  return today.toISOString();
}
