"use client";
import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import { User } from "@prisma/client";
import Input from "@/components/Input";
import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import MediaPicker from "@/components/MediaPicker";
import { updateProfile } from "@/actions";
import { useRouter } from "next/navigation";
import { handleError, parseErrors } from "@/lib/helpers";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { toast } from "react-toastify";

const editProfileSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email address is incorrect")
    .required("This field is required."),
  username: yup.string().required("This field is required."),
  bio: yup.string().max(400).required("This field is required."),
  wallet_address: yup.string().required("This field is required."),
  instagram: yup.string(),
  twitter: yup.string(),
  country: yup.string().optional().nullable().default(null),
  state: yup.string().optional().nullable().default(null),
  address: yup.string().optional().nullable().default(null),
  profile_image: yup.mixed(),
  cover_image: yup.mixed(),
});

interface editProfileValues extends yup.InferType<typeof editProfileSchema> {
  profile_image: any;
  cover_image: any;
}

const EditProfileForm: React.FC<{ profile: User }> = ({ profile }) => {
  const {
    email,
    bio,
    instagram,
    twitter,
    username,
    wallet_address,
    profile_image,
    cover_image,
    country,
    state,
    address,
    type,
  } = profile;

  const existingPI = profile_image
    ? {
        name: profile_image?.split("/")[profile_image?.split("/").length - 1],
      }
    : "";
  const existingCI = cover_image
    ? {
        name: cover_image?.split("/")[cover_image?.split("/").length - 1],
      }
    : "";

  const initialValues: editProfileValues = {
    email,
    bio: bio || "",
    instagram: instagram || "",
    twitter: twitter || "",
    username,
    wallet_address: wallet_address || "",
    profile_image: existingPI,
    cover_image: existingCI,
    country,
    state,
    address,
  };

  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={editProfileSchema}
      onSubmit={(data, { resetForm, setSubmitting }) => {
        (async () => {
          try {
            const piNoChange =
              typeof existingPI === "object" &&
              data?.profile_image?.name === existingPI.name;

            const ciNoChange =
              typeof existingCI === "object" &&
              data?.cover_image?.name === existingCI.name;

            const profile_image = piNoChange
              ? profile.profile_image!
              : await uploadToCloudinary(data.profile_image);

            const cover_image = ciNoChange
              ? profile.cover_image!
              : await uploadToCloudinary(data.cover_image);

            await updateProfile({ ...data, profile_image, cover_image });
            toast.success("Profile Updated Successfully");
            setSubmitting(false);
            router.push("/profile");
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
        <Form className=" w-full  space-y-16 lg:space-y-24 ">
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
            <MediaPicker
              label="Profile Picture"
              name="profile_image"
              accept=".png, .jpg, .jpeg"
              values={values.profile_image ? [values.profile_image] : []}
              errors={errors.profile_image}
              touched={touched.profile_image}
              handleChange={setFieldValue}
              handleBlur={handleBlur}
            />
            <MediaPicker
              label="Cover Picture"
              name="cover_image"
              accept=".png, .jpg, .jpeg"
              values={values.cover_image ? [values.cover_image] : []}
              errors={errors.cover_image}
              touched={touched.cover_image}
              handleChange={setFieldValue}
              handleBlur={handleBlur}
            />
            <Input
              label="Username"
              name="username"
              type="text"
              value={values.username}
              handleChange={handleChange}
              placeholder="User name"
              handleBlur={handleBlur}
              errors={errors.username}
              touched={touched.username}
              // disabled
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
              disabled
            />
            <Input
              label="Wallet Address"
              name="wallet_address"
              type="text"
              value={values.wallet_address}
              handleChange={handleChange}
              placeholder="Enter Wallet Address"
              handleBlur={handleBlur}
              errors={errors.wallet_address}
              touched={touched.wallet_address}
              disabled
            />
            <Input
              label="Instagram Profile"
              name="instagram"
              type="text"
              value={values.instagram ? values.instagram : ""}
              handleChange={handleChange}
              placeholder="Enter Profile URL"
              handleBlur={handleBlur}
              errors={errors.instagram}
              touched={touched.instagram}
            />
            <Input
              label="Twitter Profile"
              name="twitter"
              type="text"
              value={values.twitter ? values.twitter : ""}
              handleChange={handleChange}
              placeholder="Enter Profile URL"
              handleBlur={handleBlur}
              errors={errors.twitter}
              touched={touched.twitter}
            />
            <TextArea
              label="Biography ( 400 Characters )"
              name="bio"
              value={values.bio}
              handleChange={handleChange}
              placeholder="Enter Bio Here"
              handleBlur={handleBlur}
              errors={errors.bio}
              touched={touched.bio}
            />
          </div>
          {type === "GALLERY" && (
            <div className="space-y-10 lg:space-y-14">
              <h1 className="font-bold text-xl lg:text-3xl font-Playfair ">
                Additional Information
              </h1>
              <div className="grid lg:grid-cols-2 gap-8 lg:gap-14">
                <Input
                  label="Country"
                  name="country"
                  type="text"
                  value={values.country || ""}
                  handleChange={handleChange}
                  placeholder="Enter Country"
                  handleBlur={handleBlur}
                  errors={errors.country}
                  touched={touched.country}
                  // disabled
                />

                <Input
                  label="State"
                  name="state"
                  type="text"
                  value={values.state || ""}
                  handleChange={handleChange}
                  placeholder="Enter State"
                  handleBlur={handleBlur}
                  errors={errors.state}
                  touched={touched.state}
                  //disabled
                />
                <Input
                  label="Address"
                  name="address"
                  type="text"
                  value={values.address || ""}
                  handleChange={handleChange}
                  placeholder="Enter Address"
                  handleBlur={handleBlur}
                  errors={errors.address}
                  touched={touched.address}
                />
              </div>
            </div>
          )}

          <div className="grid grid-cols-1 justify-center lg:justify-start lg:grid-cols-2 gap-x-14">
            <Button
              text="Save Changes"
              action={handleSubmit}
              loading={isSubmitting}
              className="w-full"
            />
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default EditProfileForm;
