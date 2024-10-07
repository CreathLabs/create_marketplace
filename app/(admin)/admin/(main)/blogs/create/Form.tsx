"use client";
import React, { useState } from "react";
import * as yup from "yup";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { addBlog, addCollectible } from "@/actions";
import { toast } from "react-toastify";
import { handleError, parseErrors } from "@/lib/helpers";
import { uploadToCloudinary } from "@/lib/cloudinary";
import CustomEditor from "@/components/CkEditor";

const collectibleSchema = yup.object().shape({
  title: yup.string().required("This field is required."),
  content: yup.string().required("This field is required."),
  cover_image: yup.mixed().required("This field is required"),
});

interface collectibleValues extends yup.InferType<typeof collectibleSchema> {
  cover_image: any;
}

const FormComp = () => {
  const [url, setUrl] = useState("");
  const initialValues: collectibleValues = {
    title: "",
    content: "",
    cover_image: "",
  };

  const router = useRouter();

  const processMedia = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    const fileList = e.target.files;

    if (!fileList || fileList.length === 0) {
      return;
    }

    const file = fileList[0];

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setUrl(reader.result as string);
      }
    };

    reader.readAsDataURL(file);

    setFieldValue("cover_image", file);
  };

  return (
    <div className="px-10 py-8 space-y-6">
      <Formik
        initialValues={initialValues}
        validationSchema={collectibleSchema}
        onSubmit={(data, { resetForm, setSubmitting }) => {
          (async () => {
            try {
              const cover_image = await uploadToCloudinary(data.cover_image);
              await addBlog({ ...data, cover_image });
              resetForm();
              setSubmitting(false);
              toast.success("Blog added Successful");
              router.push("/admin/blogs");
            } catch (error) {
              const err = parseErrors(error);
              handleError(err.errors);
              setSubmitting(false);
            }
          })();
        }}
      >
        {({
          errors,
          touched,
          handleSubmit,
          values,
          handleChange,
          handleBlur,
          isSubmitting,
          setFieldValue,
        }) => (
          <Form autoComplete="off" className="w-full space-y-12 ">
            <div className="space-y-8">
              <div className="w-full grid grid-cols-2 ">
                <div className="w-full h-[496px] bg-grayTwo relative">
                  {url && (
                    <Image
                      src={url}
                      fill
                      className="w-full h-full object-cover"
                      alt="Image"
                    />
                  )}
                </div>
                <div className="w-full h-full flex items-center justify-center ">
                  <label
                    htmlFor="cover_image"
                    onClick={(e) => e.stopPropagation()}
                    className=" w-fit cursor-pointer flex"
                  >
                    <input
                      type="file"
                      id="cover_image"
                      name="cover_image"
                      onBlur={handleBlur}
                      multiple={false}
                      onChange={(e) => processMedia(e, setFieldValue)}
                      className="hidden"
                      accept=".png, .jpg, .jpeg, .gif"
                    />

                    <div className="py-4 rounded-full border border-black bg-white text-[15px] flex justify-center items-center text-black w-[196px]">
                      <h1>Upload Cover Image</h1>
                    </div>
                  </label>
                </div>
              </div>
              <div className="list-outside">
                <div className="grid grid-cols-2 justify-between items-center bg-black py-4 px-5 rounded-t-lg">
                  <input
                    value={values.title}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    name="title"
                    placeholder="Enter Blog Title"
                    className={`w-full px-4 py-1  bg-transparent placeholder:text-white/80 text-base text-white outline-none ${
                      errors.title ? "border border-red-400" : "border-none"
                    } `}
                  />
                  <div className="flex justify-end">
                    <Button
                      text="Publish"
                      action={handleSubmit}
                      loading={isSubmitting}
                      textStyles="text-[13px]"
                      className="py-2 rounded-full border border-black bg-white text-black w-[106px]"
                    />
                  </div>
                </div>
                <CustomEditor
                  name="content"
                  handleChange={setFieldValue}
                  placeholder="Enter blog content here"
                />
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormComp;
