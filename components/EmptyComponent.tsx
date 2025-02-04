"use client";
import Image from "next/image";
import React from "react";
import EmptySvg from "@/public/not-found.svg";
import { cn } from "@/lib";

type Props = {
  text: string;
  subText?: string;
  className?: string;
  button?: React.ReactElement;
};

const EmptyComponent: React.FC<Props> = ({
  text,
  subText,
  button,
  className,
}) => {
  return (
    <div className="w-full contain  flex h-full justify-center items-center ">
      <div
        className={cn("w-full max-w-[350px] space-y-4 lg:space-y-6", className)}
      >
        <div className="w-full flex flex-col gap-y-10 items-center justify-center">
          <Image
            src={EmptySvg}
            className="w-[257px] h-[257px] "
            alt="Empty Svg"
          />
          <h1 className="font-Playfair text-center font-semibold text-xl lg:text-3xl ">
            {text}
          </h1>
        </div>
        {text && subText && (
          <div className="w-full flex flex-col gap-y-8 items-center justify-center">
            {subText && <h1 className="text-center text-sm">{subText}</h1>}
            {button && button}
          </div>
        )}
      </div>
    </div>
  );
};

export default EmptyComponent;
