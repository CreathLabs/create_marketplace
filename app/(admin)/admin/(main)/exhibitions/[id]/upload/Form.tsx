"use client";
import React, { useState } from "react";
import * as yup from "yup";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { uploadExhibitionArtWork } from "@/actions";
import { toast } from "react-toastify";
import { handleError, parseErrors } from "@/lib/helpers";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { Category, Collectibles } from "@prisma/client";
import SelectComp from "@/components/Select";
import TextArea from "@/components/TextArea";

const uploadArtworkSchema = yup.object().shape({
  name: yup.string().required("This field is required."),
  floor_price: yup.number().required("This field is required."),
  description: yup.string().required("This field is required."),
  dimensions: yup.string().required("This field is required."),
  category_id: yup.string().required("This field is required."),
  art_image: yup.mixed().required("This field is required"),
});

interface uploadArtworkValues
  extends yup.InferType<typeof uploadArtworkSchema> {
  art_image: any;
  floor_price: any;
}

const UploadExhibitionArt: React.FC<{
  categories: Category[];
  exhibition_id: string;
}> = ({ categories, exhibition_id }) => {
  const [url, setUrl] = useState("");

  const initialValues: uploadArtworkValues = {
    art_image: "",
    category_id: "",
    description: "",
    dimensions: "",
    floor_price: "",
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

    setFieldValue("art_image", file);
  };

  return (
    <div className="px-10 py-8 space-y-6">
      <Formik
        initialValues={initialValues}
        validationSchema={uploadArtworkSchema}
        onSubmit={(data, { resetForm, setSubmitting }) => {
          (async () => {
            try {
              const art_image = await uploadToCloudinary(data.art_image);
              await uploadExhibitionArtWork({
                ...data,
                art_image: art_image,
                exhibition_id,
              });
              resetForm();
              setSubmitting(false);
              toast.success("Exhibition Art uploaded Successfully");
              router.push(`/admin/exhibitions/${exhibition_id}`);
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
                  label="Artwork Name"
                  name="name"
                  type="text"
                  value={values.name}
                  handleChange={handleChange}
                  placeholder="Artwork Name"
                  handleBlur={handleBlur}
                  errors={errors.name}
                  touched={touched.name}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                />
                <Input
                  label="Floor Price"
                  name="floor_price"
                  type="number"
                  value={values.floor_price}
                  handleChange={handleChange}
                  placeholder="Floor Price"
                  handleBlur={handleBlur}
                  errors={errors.floor_price}
                  touched={touched.floor_price}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                />
                <TextArea
                  label="Description (300 Characters)"
                  name="description"
                  value={values.description}
                  handleChange={handleChange}
                  placeholder="Description"
                  handleBlur={handleBlur}
                  errors={errors.description}
                  touched={touched.description}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                />

                <Input
                  label="Dimensions ( Sizing )"
                  name="dimensions"
                  type="text"
                  value={values.dimensions}
                  handleChange={handleChange}
                  placeholder="e.g 56”  X  56”"
                  handleBlur={handleBlur}
                  errors={errors.dimensions}
                  touched={touched.dimensions}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                />
                <SelectComp
                  label="Medium"
                  name="category_id"
                  value={values.category_id}
                  handleChange={setFieldValue}
                  placeholder="Enter Medium"
                  handleBlur={handleBlur}
                  error={errors.category_id}
                  touched={touched.category_id}
                  options={categories.map((c) => ({
                    value: c.id,
                    label: c.name,
                  }))}
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
                  htmlFor="art_image"
                  onClick={(e) => e.stopPropagation()}
                  className=" w-fit cursor-pointer"
                >
                  <input
                    type="file"
                    id="art_image"
                    name="art_image"
                    onBlur={handleBlur}
                    multiple={false}
                    onChange={(e) => processMedia(e, setFieldValue)}
                    className="hidden"
                    accept=".png, .jpg, .jpeg, .gif"
                  />

                  <div className="py-4 rounded-full border border-black bg-white text-[15px] flex justify-center items-center text-black w-[196px]">
                    <h1>Select Art</h1>
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

export default UploadExhibitionArt;
