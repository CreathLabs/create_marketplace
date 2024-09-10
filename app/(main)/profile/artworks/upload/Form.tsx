"use client";
import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import Input from "@/components/Input";
import Button from "@/components/Button";
import TextArea from "@/components/TextArea";
import MediaPicker from "@/components/MediaPicker";
import { uploadArtWork } from "@/actions";
import { useRouter } from "next/navigation";
import { handleError, parseErrors } from "@/lib/helpers";
import { uploadToCloudinary } from "@/lib/cloudinary";
import { toast } from "react-toastify";
import { Category } from "@prisma/client";
import SelectComp from "@/components/Select";

const uploadArtworkSchema = yup.object().shape({
  name: yup.string().required("This field is required."),
  floor_price: yup.number().required("This field is required."),
  description: yup.string().required("This field is required."),
  dimensions: yup.string().required("This field is required."),
  category_id: yup.string().required("This field is required."),
  location: yup.string().required("This field is required"),
  contract: yup.string().optional(),
  art_image: yup.mixed().required("This field is required"),
});

interface uploadArtworkValues
  extends yup.InferType<typeof uploadArtworkSchema> {
  art_image: any;
  floor_price: any;
}

const UploadArtworkForm: React.FC<{ categories: Category[] }> = ({
  categories,
}) => {
  const initialValues: uploadArtworkValues = {
    art_image: "",
    category_id: "",
    contract: "",
    description: "",
    dimensions: "",
    floor_price: "",
    location: "",
    name: "",
  };

  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={uploadArtworkSchema}
      onSubmit={(data, { resetForm, setSubmitting }) => {
        (async () => {
          try {
            const art_image = await uploadToCloudinary(data.art_image);
            await uploadArtWork({ ...data, art_image });
            toast.success("Artwork Uploaded Successfully");
            resetForm();
            setSubmitting(false);
            setTimeout(() => {
              router.push("/profile");
            }, 2000);
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
        <Form className=" w-full space-y-24 ">
          <div className="grid grid-cols-2 gap-14">
            <MediaPicker
              label="Upload Artwork ( JPG, PNG, GIF)"
              name="art_image"
              accept=".png, .jpg, .jpeg, .gif"
              values={values.art_image ? [values.art_image] : []}
              errors={errors.art_image}
              touched={touched.art_image}
              handleChange={setFieldValue}
              handleBlur={handleBlur}
            />
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
              options={categories.map((c) => ({ value: c.id, label: c.name }))}
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
            />
            <Input
              label="Location"
              name="location"
              type="text"
              value={values.location}
              handleChange={handleChange}
              placeholder="Enter Location"
              handleBlur={handleBlur}
              errors={errors.location}
              touched={touched.location}
            />

            <TextArea
              label="Description ( 300 Characters)"
              name="description"
              value={values.description}
              handleChange={handleChange}
              placeholder="Description"
              handleBlur={handleBlur}
              errors={errors.description}
              touched={touched.description}
            />
            <Input
              label="Contract (Optional)"
              name="contract"
              type="text"
              value={values.contract || ""}
              handleChange={handleChange}
              placeholder="Enter Contract"
              handleBlur={handleBlur}
              errors={errors.contract}
              touched={touched.contract}
            />
          </div>
          <div className="grid grid-cols-2 gap-x-14">
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

export default UploadArtworkForm;
