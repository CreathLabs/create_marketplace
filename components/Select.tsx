"use client";
import { ErrorMessage } from "formik";
import { Inter } from "next/font/google";
import React from "react";
import Select, { components, DropdownIndicatorProps } from "react-select";
import { Icon } from "@iconify/react/dist/iconify.js";

const inter = Inter({ subsets: ["latin"] });

type Option = {
  value: string | number;
  label: string;
};

interface Props {
  label: string;
  name: string;
  value: string | number | string[] | undefined;
  placeholder: string;
  handleChange: any;
  error: string | string[] | undefined;
  touched: boolean | undefined;
  handleBlur: any;
  options: Option[];
  disabled?: boolean;
  setValue?: any;
  className?: string;
}

const DropdownIndicator = (props: DropdownIndicatorProps<Option, false>) => {
  return (
    <components.DropdownIndicator {...props}>
      <Icon icon="ion:caret-down" color="#858C94" className=" text-lg" />
    </components.DropdownIndicator>
  );
};

const SelectComp: React.FC<Props> = ({
  label,
  name,
  value,
  handleChange,
  handleBlur,
  options,
  placeholder,
  setValue,
  className = "",
}) => {
  return (
    <div className="space-y-3 h-fit w-full">
      <label htmlFor={name}>
        <h3 className="text-base font-medium ">{label}</h3>
      </label>
      <Select
        options={options}
        className="w-full"
        placeholder={placeholder}
        name={name}
        styles={{
          placeholder: (styles) => ({
            ...styles,
            color: "rgb(0 0 0 / 0.8)",
            fontWeight: 300,
            ...inter.style,
          }),
          indicatorSeparator: (styles) => ({ ...styles, display: "none" }),
          indicatorsContainer: (styles) => ({ ...styles }),
          dropdownIndicator: (styles) => ({
            ...styles,
            padding: "0px",
            paddingRight: "12px",
          }),
          valueContainer: (styles) => ({
            ...styles,
            paddingTop: "16px",
            paddingBottom: "16px",
            paddingLeft: "16px",
            fontSize: "14px",
            ...inter.style,
          }),
          input: (styles) => ({
            ...styles,
            padding: 0,
            margin: 0,
            caretColor: "white",
            color: "black",
            ...inter.style,
          }),
          control: (styles) => ({
            ...styles,
            borderRadius: className ? "9999px" : "0px",
            boxShadow: "none",
            border: className ? "1px solid #E2E8F0" : "none",
            backgroundColor: className ? "white" : "#F6F6F6",
            ":focus": {
              border: "none",
            },
            ":hover": {
              border: className ? "1px solid #E2E8F0" : "none",
            },
            height: "52px",
            ...inter.style,
          }),
          option: (styles, { isSelected }) => ({
            ...styles,
            fontSize: "14px",
            color: "black",
            backgroundColor: isSelected ? "#F6F4FF" : undefined,
            display: "flex",
            columnGap: "8px",
            alignItems: "center",
            ...inter.style,
            fontWeight: isSelected ? 600 : 400,
            ":hover": {
              ...styles[":active"],
              backgroundColor: "#F6F4FF",
            },
            "::after": {
              content: isSelected ? 'url("/checked.svg")' : '""',
              height: "16px",
            },
          }),
          menu: (styles) => ({ ...styles, borderRadius: "0px" }),
        }}
        value={options.find((option) => option.value === value)}
        onChange={(e) => {
          handleChange(name, e?.value);
          setValue?.(e?.value);
        }}
        onBlur={() => handleBlur(name, true)}
        components={{
          DropdownIndicator,
        }}
      />
      <ErrorMessage
        className="text-[10px] !mt-2 font-medium text-red-500"
        name={name}
        component="div"
      />
    </div>
  );
};

export default SelectComp;
