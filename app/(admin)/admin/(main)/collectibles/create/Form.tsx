"use client";
import React, { useState } from "react";
import * as yup from "yup";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { addCollectible } from "@/actions";
import { toast } from "react-toastify";
import { handleError, parseErrors } from "@/lib/helpers";
import { uploadToCloudinary } from "@/lib/cloudinary";

const collectibleSchema = yup.object().shape({
  name: yup.string().required("This field is required."),
  mint_price: yup.number().required("This field is required."),
  mint_per_wallet: yup.number().required("This field is required."),
  total_minted: yup.number().required("This field is required."),
  total_unminted: yup.number().required("This field is required."),
  description: yup.string().required("This field is required."),
  published_by: yup.string().required("This field is required."),
  contract: yup.string().optional(),
  image: yup.mixed().required("This field is required"),
});

interface collectibleValues extends yup.InferType<typeof collectibleSchema> {
  image: any;
  mint_price: any;
  total_minted: any;
  total_unminted: any;
  mint_per_wallet: any;
}

const FormComp = () => {
  const [url, setUrl] = useState("");
  const initialValues: collectibleValues = {
    image: "",
    contract: "",
    description: "",
    mint_per_wallet: "",
    mint_price: "",
    total_minted: "",
    total_unminted: "",
    published_by: "",
    name: "",
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

    setFieldValue("image", file);
  };

  return (
    <div className="px-10 py-8 space-y-6">
      <Formik
        initialValues={initialValues}
        validationSchema={collectibleSchema}
        onSubmit={(data, { resetForm, setSubmitting }) => {
          (async () => {
            try {
              const image = await uploadToCloudinary(data.image);
              await addCollectible({ ...data, image });
              resetForm();
              setSubmitting(false);
              toast.success("Collectible added Successful");
              router.push("/admin/collectibles");
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
                  label="Collectible Name"
                  name="name"
                  type="text"
                  value={values.name}
                  handleChange={handleChange}
                  placeholder="Collectible Name"
                  handleBlur={handleBlur}
                  errors={errors.name}
                  touched={touched.name}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                />
                <Input
                  label="Collectible Description (300 Characters)"
                  name="description"
                  type="text"
                  value={values.description}
                  handleChange={handleChange}
                  placeholder="Collectible Description"
                  handleBlur={handleBlur}
                  errors={errors.description}
                  touched={touched.description}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                />
                <Input
                  label="Mint Price"
                  name="mint_price"
                  type="text"
                  value={values.mint_price}
                  handleChange={handleChange}
                  placeholder="Mint Price"
                  handleBlur={handleBlur}
                  errors={errors.mint_price}
                  touched={touched.mint_price}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                />
                <Input
                  label="Mint per Wallet"
                  name="mint_per_wallet"
                  type="text"
                  value={values.mint_per_wallet}
                  handleChange={handleChange}
                  placeholder="Mint per Wallet"
                  handleBlur={handleBlur}
                  errors={errors.mint_per_wallet}
                  touched={touched.mint_per_wallet}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                />
                <div className="grid grid-cols-2 gap-x-[30px]">
                  <Input
                    label="Total Mint Number"
                    name="total_minted"
                    type="text"
                    value={values.total_minted}
                    handleChange={handleChange}
                    placeholder="Total Mint Number"
                    handleBlur={handleBlur}
                    errors={errors.total_minted}
                    touched={touched.total_minted}
                    className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                  />
                  <Input
                    label="Total Unminted Number"
                    name="total_unminted"
                    type="text"
                    value={values.total_unminted}
                    handleChange={handleChange}
                    placeholder="Total Unminted Number"
                    handleBlur={handleBlur}
                    errors={errors.total_unminted}
                    touched={touched.total_unminted}
                    className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                  />
                </div>
                <Input
                  label="Publisher Name"
                  name="published_by"
                  type="text"
                  value={values.published_by}
                  handleChange={handleChange}
                  placeholder="Publisher Name"
                  handleBlur={handleBlur}
                  errors={errors.published_by}
                  touched={touched.published_by}
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
                  htmlFor="image"
                  onClick={(e) => e.stopPropagation()}
                  className=" w-fit cursor-pointer"
                >
                  <input
                    type="file"
                    id="image"
                    name="image"
                    onBlur={handleBlur}
                    multiple={false}
                    onChange={(e) => processMedia(e, setFieldValue)}
                    className="hidden"
                    accept=".png, .jpg, .jpeg, .gif"
                  />

                  <div className="py-4 rounded-full border border-black bg-white text-[15px] flex justify-center items-center text-black w-[196px]">
                    <h1>Upload Collectible</h1>
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
