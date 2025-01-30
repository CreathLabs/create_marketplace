import React, { useState, useEffect } from "react";
import { ErrorMessage, Field } from "formik";
import { Icon } from "@iconify/react";
import { cn } from "@/lib";

interface Props {
  label: string;
  name: string;
  value: string | number;
  placeholder: string;
  handleChange: any;
  errors?: any;
  touched?: any;
  handleBlur?: any;
  disabled?: boolean;
  rows?: number;
  className?: string;
}

const TextArea: React.FC<Props> = ({
  label,
  name,
  placeholder,
  errors,
  touched,
  value,
  handleChange,
  handleBlur,
  disabled,
  rows,
  className = "",
}) => {
  return (
    <div className="space-y-3 h-fit w-full">
      <label htmlFor={name}>
        <h3 className={`text-base font-medium`}>{label}</h3>
      </label>
      <div className="w-full h-full relative">
        <Field
          id={name}
          name={name}
          value={value}
          as="textarea"
          className={cn(
            `w-full px-4 py-[14px] bg-grayTwo placeholder:text-black/80 placeholder:font-light text-base text-black outline-none autofill:bg-white`,
            className
          )}
          onChange={handleChange}
          autoComplete="off"
          disabled={disabled}
          placeholder={placeholder}
          onBlur={handleBlur}
          rows={rows}
        />
      </div>
      <ErrorMessage
        className="text-[10px] !mt-2 font-medium text-red-500"
        name={name}
        component="div"
      />
    </div>
  );
};

export default TextArea;
