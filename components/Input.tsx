"use client";
import React, { useState, useEffect } from "react";
import { ErrorMessage, Field } from "formik";
import { Icon } from "@iconify/react";
import { cn } from "@/lib";

interface Props {
  label: string;
  name: string;
  value: string | number;
  placeholder: string;
  type: React.HTMLInputTypeAttribute;
  handleChange?: any;
  errors?: any;
  touched?: any;
  handleBlur?: any;
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<Props> = ({
  label,
  name,
  placeholder,
  errors,
  type,
  touched,
  value,
  handleChange,
  handleBlur,
  disabled,
  className = "",
}) => {
  const [inputType, setInputType] = useState<string>(type);
  const [active, setActive] = useState<boolean>(false);

  useEffect(() => {
    setInputType(type);
    if (value) {
      setActive(true);
    }
  }, []);

  return (
    <div className="space-y-3 h-fit w-full">
      <label htmlFor={name}>
        <h3 className={`text-base font-medium`}>{label}</h3>
      </label>
      <div className="w-full h-full relative">
        <Field
          id={name}
          name={name}
          type={inputType}
          value={value}
          className={cn(
            `w-full px-4 py-[14px] bg-grayTwo placeholder:text-black/80 placeholder:font-light text-base text-black outline-none autofill:bg-white`,
            className
          )}
          onChange={handleChange}
          disabled={disabled}
          placeholder={placeholder}
          onFocus={() => setActive(true)}
          onBlur={(e: React.FocusEvent) => {
            setActive(false);
            handleBlur(e);
          }}
        />
        {[
          "password",
          "confirm_password",
          "new_password",
          "password_confirmation",
        ].includes(name) && (
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
      <ErrorMessage
        className="text-[10px] !mt-2 font-medium text-red-500"
        name={name}
        component="div"
      />
    </div>
  );
};

export default Input;
