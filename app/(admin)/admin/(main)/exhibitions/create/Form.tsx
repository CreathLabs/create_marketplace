"use client";
import React, { useState } from "react";
import * as yup from "yup";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { convertTimeToDateTime, handleError, parseErrors } from "@/lib/helpers";
import { uploadToCloudinary } from "@/lib/cloudinary";
import TextArea from "@/components/TextArea";
import { addExhibition } from "@/actions";
import ContractAbi from "@/app/providers/ABI/contractABI.json";
import CollectionContractABI from '@/app/providers/ABI/CollectionContractABI.json';
import { ethers } from "ethers";
import SelectComp from "@/components/Select";
import { User } from "@prisma/client";

const exhibitionSchema = yup.object().shape({
  name: yup.string().required("This field is required."),
  description: yup.string().required("This field is required."),
  country: yup.string().required("This field is required."),
  location: yup.string().required("This field is required."),
  address: yup.string().required("This field is required."),
  nft_address: yup.string(),
  date: yup.string().required("This field is required."),
  time: yup.string().required("This field is required."),
  artist_name: yup.string().required("This field is required."),
  curator_name: yup.string().required("This field is required."),
  cover_image: yup.mixed().required("This field is required"),
  user_id: yup.string().required("This field is required."),
  images: yup.array(yup.mixed().required()).optional()
});


// for listing items on the marketplace and also contains the buy function.
// const PROVIDER = window.ethereum

interface exhibitionValues extends yup.InferType<typeof exhibitionSchema> {
  images: any[];
  cover_image: any;
}

const FormComp: React.FC<{
  galleries: User[];
}> = ({ galleries }) => {
  const [url, setUrl] = useState("");
  const initialValues: exhibitionValues = {
    address: "",
    artist_name: "",
    country: "",
    cover_image: "",
    curator_name: "",
    date: "",
    description: "",
    images: [],
    location: "",
    name: "",
    time: "",
    nft_address: "",
    user_id: "",
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

  function getRandomLettersFromName(name: string) {
    const cleanName = name.replace(/[^a-zA-Z]/g, "").toUpperCase();
    if (cleanName.length < 3) {
      return cleanName.padEnd(3, "X");
    }
    let randomLetters = "";
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * cleanName.length);
      randomLetters += cleanName[randomIndex];
    }

    return randomLetters;
  }

  return (
    <div className="px-10 py-8 space-y-6">
      <Formik
        initialValues={initialValues}
        validationSchema={exhibitionSchema}
        onSubmit={(data, { resetForm, setSubmitting }) => {
          (async () => {
            console.log("Clicked!!!!")
            try {
              const cover_image = await uploadToCloudinary(data.cover_image);
              const res = await fetch("/api/createExhibition", {
                method: "POST",
                body: JSON.stringify({
                  name: `${data.name}`,
                  random: getRandomLettersFromName(data.name)
                }),
                headers: { "Content-Type": "application/json" }
              });
              const response = await res.json();
              console.log(response)
              if (!response.data.address?.address) {
                throw new Error("Failed to create exhibition: No exhibition contract address");
              }
              await addExhibition({
                ...data,
                cover_image,
                date: new Date(data.date).toISOString(),
                time: convertTimeToDateTime(data.time),
                nft_address: response.data.address.address,
              })
              resetForm();
              setSubmitting(false);
              toast.success("Exhibition added Successful");
              router.push("/admin/exhibitions");
            } catch (error) {
              console.log(error)
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
            <div className="grid grid-cols-2 w-full gap-y-6 gap-x-10">
              <Input
                label="Exhibition Name"
                name="name"
                type="text"
                value={values.name}
                handleChange={handleChange}
                placeholder="Exhibition Name"
                handleBlur={handleBlur}
                errors={errors.name}
                touched={touched.name}
                className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
              />
              <div className="w-full flex flex-col row-span-4 gap-y-12 items-center">
                <div className="w-full h-[400px] bg-grayTwo relative">
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
                  htmlFor="cover_image"
                  onClick={(e) => e.stopPropagation()}
                  className=" w-fit cursor-pointer"
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
                    <h1>Cover Picture</h1>
                  </div>
                </label>
              </div>
              <TextArea
                label="Exhibition Description (300 Characters)"
                name="description"
                value={values.description}
                handleChange={handleChange}
                placeholder="Exhibition Description"
                handleBlur={handleBlur}
                errors={errors.description}
                touched={touched.description}
                className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
              />
              <Input
                label="Country"
                name="country"
                type="text"
                value={values.country}
                handleChange={handleChange}
                placeholder="Country"
                handleBlur={handleBlur}
                errors={errors.country}
                touched={touched.country}
                className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
              />
              <Input
                label="Location"
                name="location"
                type="text"
                value={values.location}
                handleChange={handleChange}
                placeholder="Location"
                handleBlur={handleBlur}
                errors={errors.location}
                touched={touched.location}
                className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
              />
              <Input
                label="Address Line"
                name="address"
                type="text"
                value={values.address}
                handleChange={handleChange}
                placeholder="Address Line"
                handleBlur={handleBlur}
                errors={errors.address}
                touched={touched.address}
                className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
              />

              <Input
                label="Date"
                name="date"
                type="date"
                value={values.date}
                handleChange={handleChange}
                placeholder="Date"
                handleBlur={handleBlur}
                errors={errors.date}
                touched={touched.date}
                className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
              />
              <Input
                label="Time"
                name="time"
                type="time"
                value={values.time}
                handleChange={handleChange}
                placeholder="Time"
                handleBlur={handleBlur}
                errors={errors.time}
                touched={touched.time}
                className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
              />
              <SelectComp
                label="Creator"
                name="user_id"
                value={values.user_id}
                handleChange={setFieldValue}
                placeholder="Select User"
                handleBlur={handleBlur}
                error={errors.user_id}
                touched={touched.user_id}
                options={galleries.map((c) => ({
                  value: c.id,
                  label: c.username,
                }))}
                className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
              />
              <Input
                label="Artist Name"
                name="artist_name"
                type="text"
                value={values.artist_name}
                handleChange={handleChange}
                placeholder="Artist Name"
                handleBlur={handleBlur}
                errors={errors.artist_name}
                touched={touched.artist_name}
                className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
              />
              <Input
                label="Curator Name"
                name="curator_name"
                type="text"
                value={values.curator_name}
                handleChange={handleChange}
                placeholder="Curator Name"
                handleBlur={handleBlur}
                errors={errors.curator_name}
                touched={touched.curator_name}
                className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
              />
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
