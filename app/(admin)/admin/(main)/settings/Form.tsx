"use client";
import React, { useState } from "react";
import * as yup from "yup";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { handleError, parseErrors } from "@/lib/helpers";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Admin } from "@prisma/client";
import { updateAdminProfile } from "@/actions";

const updateAProfileSchema = yup.object().shape({
  full_name: yup.string().required("This field is required."),
  email: yup.string().email().required("This field is required."),
  password: yup.string().optional(),
  new_password: yup
    .string()
    .optional()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  phone_no: yup.string().required("This field is required."),
  profile_image: yup.mixed().required("This field is required"),
});

interface updateAValues extends yup.InferType<typeof updateAProfileSchema> {
  profile_image: any;
}

const FormComp = ({ profile }: { profile: Admin }) => {
  const { full_name, profile_image, phone_no, email } = profile;

  const [url, setUrl] = useState(profile_image);
  const initialValues: updateAValues = {
    profile_image,
    full_name,
    password: "",
    new_password: "",
    phone_no,
    email,
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

    setFieldValue(e.target.name, file);
  };

  return (
    <div className="px-10 py-8 space-y-6">
      <Formik
        initialValues={initialValues}
        validationSchema={updateAProfileSchema}
        onSubmit={(data, { resetForm, setSubmitting }) => {
          (async () => {
            try {
              let image = null;
              if (data.profile_image !== profile_image) {
                image = await uploadToCloudinary(data.profile_image);
              }
              await updateAdminProfile({
                ...data,
                profile_image: image ? image : profile_image,
              });
              resetForm();
              setSubmitting(false);
              toast.success("Profile Updated Successful");
              router.push("/admin");
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
            <div className="grid grid-cols-2 w-full gap-x-10">
              <div className="space-y-8">
                <Input
                  label="Full Name"
                  name="full_name"
                  type="text"
                  value={values.full_name}
                  handleChange={handleChange}
                  placeholder="Full Name"
                  handleBlur={handleBlur}
                  errors={errors.full_name}
                  touched={touched.full_name}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                />
                <Input
                  label="Email Address"
                  name="email"
                  type="email"
                  value={values.email}
                  handleChange={handleChange}
                  placeholder="Email Address"
                  handleBlur={handleBlur}
                  errors={errors.email}
                  touched={touched.email}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                />
                <Input
                  label="Phone Number"
                  name="phone_no"
                  type="text"
                  value={values.phone_no}
                  handleChange={handleChange}
                  placeholder="Phone Number"
                  handleBlur={handleBlur}
                  errors={errors.phone_no}
                  touched={touched.phone_no}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                />
                <Input
                  label="Old Password"
                  name="password"
                  type="password"
                  value={values.password || ""}
                  handleChange={handleChange}
                  placeholder="Old Password"
                  handleBlur={handleBlur}
                  errors={errors.password}
                  touched={touched.password}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                />
                <Input
                  label="New Password"
                  name="new_password"
                  type="password"
                  value={values.new_password || ""}
                  handleChange={handleChange}
                  placeholder="New Password"
                  handleBlur={handleBlur}
                  errors={errors.new_password}
                  touched={touched.new_password}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                />
              </div>
              <div className="w-full flex flex-col justify-center gap-y-12 items-center">
                <div className="w-full h-[350px] bg-grayTwo relative">
                  {url && (
                    <Image
                      src={url}
                      fill
                      className="w-full h-full object-cover"
                      alt="Image"
                    />
                  )}
                </div>
                <label
                  htmlFor="profile_image"
                  onClick={(e) => e.stopPropagation()}
                  className=" w-fit cursor-pointer"
                >
                  <input
                    type="file"
                    id="profile_image"
                    name="profile_image"
                    onBlur={handleBlur}
                    multiple={false}
                    onChange={(e) => processMedia(e, setFieldValue)}
                    className="hidden"
                    accept=".png, .jpg, .jpeg, .gif"
                  />

                  <div className="py-4 rounded-full border border-black bg-white text-[15px] flex justify-center items-center text-black w-[196px]">
                    <h1>Change Picture</h1>
                  </div>
                </label>
              </div>
            </div>
            <div className="w-full flex gap-x-10">
              <Button
                text="Save Changes"
                action={handleSubmit}
                loading={isSubmitting}
                className="py-4 rounded-full border border-black bg-black text-white w-full"
              />
              <Button
                text="Go Back"
                action={() => router.back()}
                className="py-4 rounded-full border border-black bg-white text-black w-full"
              />
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormComp;
