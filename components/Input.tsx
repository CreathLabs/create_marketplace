import React from "react";

interface Props {
  placeholder: string;
  value: string;
  label: string;
  type?: React.HTMLInputTypeAttribute | undefined;
}

const Input: React.FC<Props> = ({
  placeholder,
  value,
  label,
  type = "text",
}) => {
  return (
    <div className="space-y-3">
      <label htmlFor="" className="text-[15px] lg:text-base font-medium ">
        {label}
      </label>
      <input
        placeholder={placeholder}
        type={type}
        className="w-full px-4 py-[14px] bg-grayTwo placeholder:text-black/80 placeholder:font-light text-[15px] lg:text-base text-black outline-none "
      />
    </div>
  );
};

export default Input;
