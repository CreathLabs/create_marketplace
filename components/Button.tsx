"use client";
import { cn } from "@/lib";
import React from "react";
import ButtonLoader from "./ButtonLoader";

interface Props {
  textStyles?: string;
  text: string;
  className?: string;
  action?: () => void;
  leadingAccessory?: React.ReactElement;
  loading?: boolean;
  disabled?: boolean;
}

const Button: React.FC<Props> = ({
  textStyles = "",
  text,
  className = "",
  action,
  leadingAccessory,
  loading = false,
  disabled 
}) => {
  return (
    <button
      onClick={async (e) => {
        "use client";
        e.preventDefault();
        e.stopPropagation();
        action?.();
      }}

      className={cn(
        "text-black font-semibold px-3 py-[14px] text-sm lg:text-base leading-[23.22px] flex justify-center items-center gap-x-4 border-b-2 border-black",
        className
      )}
    >
      {leadingAccessory && leadingAccessory}
      <h1 className={cn("", textStyles)}>
        {" "}
        {loading ? <ButtonLoader /> : text}
      </h1>
    </button>
  );
};

export default Button;
