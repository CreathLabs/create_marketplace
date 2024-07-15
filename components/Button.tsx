"use client";
import { cn } from "@/lib";
import React from "react";

interface Props {
  textStyles?: string;
  text: string;
  className?: string;
  action?: () => void;
  leadingAccessory?: React.ReactElement;
}

const Button: React.FC<Props> = ({
  textStyles = "",
  text,
  className = "",
  action,
  leadingAccessory,
}) => {
  return (
    <button
      onClick={async () => {
        "use client";
        action?.();
      }}
      className={cn(
        "text-black font-semibold px-3 py-[14px] text-base leading-[23.22px] flex justify-center items-center gap-x-4 border-b-2 border-black",
        className
      )}
    >
      {leadingAccessory && leadingAccessory}
      <h1 className={cn("", textStyles)}>{text}</h1>
    </button>
  );
};

export default Button;
