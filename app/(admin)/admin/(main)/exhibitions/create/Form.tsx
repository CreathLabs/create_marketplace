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

const exhibitionSchema = yup.object().shape({
  name: yup.string().required("This field is required."),
  description: yup.string().required("This field is required."),
  country: yup.string().required("This field is required."),
  location: yup.string().required("This field is required."),
  address: yup.string().required("This field is required."),
  date: yup.string().required("This field is required."),
  time: yup.string().required("This field is required."),
  artist_name: yup.string().required("This field is required."),
  curator_name: yup.string().required("This field is required."),
  cover_image: yup.mixed().required("This field is required"),
  images: yup.array(yup.mixed().required()).optional(),
  nft_address: yup.string(),
});

const collectionContractAddress = '0x0578b23FE97D6Ac801007D259b03334F57276384' // for creating collections
const collectionPrivateKey = "cf4eede6dbc634879e6feb13601d36cf55b2a7cfc3593e646e26ef9c5dd27921"
const creathAddress = '0x013b6f5a3fF3A3259d832b89C6C0adaabe59f8C6'; // for listing items on the marketplace and also contains the buy function.
// const PROVIDER = window.ethereum
const PROVIDER = "https://mainnet.optimism.io"

const provider = new ethers.providers.JsonRpcProvider(PROVIDER);
const CollectionWallet = new ethers.Wallet(collectionPrivateKey, provider);
const CollectionContractInstance =  new ethers.Contract(collectionContractAddress, CollectionContractABI, CollectionWallet );

interface exhibitionValues extends yup.InferType<typeof exhibitionSchema> {
  images: any[];
  cover_image: any;
}

const FormComp = () => {
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
            try {
              const cover_image = await uploadToCloudinary(data.cover_image);
              let Txn = await CollectionContractInstance.createNFTContract(`${data.name}`, getRandomLettersFromName(data.name))
              const receipt = await Txn.wait()
              const collectionInstance = new ethers.Contract(receipt.events[0].address, ContractAbi, CollectionWallet)
              let tests = await collectionInstance.setApprovalForAll(creathAddress, true);
              await addExhibition({
                ...data,
                cover_image,
                date: new Date(data.date).toISOString(),
                time: convertTimeToDateTime(data.time),
                nft_address: receipt.events[0].address,
              });
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
              <div className="w-full flex flex-col row-span-5 gap-y-12 items-center">
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
