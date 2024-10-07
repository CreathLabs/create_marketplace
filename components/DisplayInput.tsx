"use client";
import React, { useState } from "react";
import { Icon } from "@iconify/react";
import { cn } from "@/lib";

interface Props {
  label: string;
  name: string;
  value: string | number;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  className?: string;
}

const DisplayInput: React.FC<Props> = ({
  label,
  name,
  placeholder,
  type,
  value,
  className = "",
}) => {
  const [inputType, setInputType] = useState<string>(type);

  return (
    <div className="space-y-3 h-fit w-full">
      <label htmlFor={name}>
        <h3 className={`text-base font-medium`}>{label}</h3>
      </label>
      <div className="w-full h-full relative">
        <input
          id={name}
          name={name}
          value={value}
          className={cn(
            `w-full px-4 py-[14px] bg-grayTwo placeholder:text-black/80 placeholder:font-light text-base text-black outline-none autofill:bg-white`,
            className
          )}
          disabled={true}
          placeholder={placeholder}
        />
        {["password", "confirm_password", "password_confirmation"].includes(
          name
        ) && (
          <div className="absolute h-full top-0 bottom-0 right-4 flex flex-col justify-center">
            {inputType === "password" ? (
              <Icon
                icon="ion:eye"
                onClick={() => setInputType("text")}
                className="!text-sm md:!text-base !text-primary-100 cursor-pointer"
              />
            ) : (
              <Icon
                icon="ion:eye-off"
                onClick={() => setInputType("password")}
                className="!text-sm md:!text-base !text-mainGray cursor-pointer"
              />
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default DisplayInput;
