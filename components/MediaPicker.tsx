"use client";
import { ErrorMessage } from "formik";
import React from "react";

interface Props {
  label: React.ReactNode;
  name: string;
  values: File[];
  handleChange: any;
  errors: any;
  touched: any;
  handleBlur?: any;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  limit?: number;
}

const MediaPicker: React.FC<Props> = ({
  label,
  name,
  values,
  handleChange,
  handleBlur,
  accept = ".jpg, .jpeg, .png, .pdf, .mp4",
  multiple = false,
  limit,
}) => {
  const processMedia = (e: React.ChangeEvent<HTMLInputElement>) => {
    const fileList = e.target.files;

    if (!fileList) {
      return;
    }

    if (limit !== undefined && fileList.length > limit) {
      return;
    }

    const files: File[] = Array.from(fileList);

    handleChange(name, multiple ? files : fileList[0]);
  };

  const removeMedia = (index: number) => {
    const updatedValue = multiple
      ? values.filter((_, i) => i !== index)
      : undefined;
    handleChange(name, updatedValue);
  };

  return (
    <div className="flex flex-col gap-y-6 h-fit w-full">
      <div>
        <h3 className={`text-base font-medium`}>{label}</h3>
      </div>
      <div>
        <label htmlFor={name} className="w-full cursor-pointer">
          <input
            type="file"
            id={name}
            name={name}
            onBlur={handleBlur}
            multiple={multiple}
            onChange={processMedia}
            className="hidden"
            accept={accept}
          />
          <h1 className="text-lg text-black font-bold ">
            {[...values].length > 0
              ? [...values].map((f) => f.name).join(", ")
              : "Click here to upload"}
          </h1>
        </label>
        <ErrorMessage
          className="text-[10px] !mt-2 font-medium text-red-500"
          name={name}
          component="div"
        />
      </div>
    </div>
  );
};

export default MediaPicker;
