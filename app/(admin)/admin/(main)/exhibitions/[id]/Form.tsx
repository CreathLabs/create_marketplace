"use client";
import React, { useRef, useState } from "react";
import * as yup from "yup";
import Input from "@/components/Input";
import Button from "@/components/Button";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Formik, Form } from "formik";
import { toast } from "react-toastify";
import { convertTimeToDateTime, handleError, parseErrors } from "@/lib/helpers";
import { uploadFiles, uploadToCloudinary } from "@/lib/cloudinary";
import TextArea from "@/components/TextArea";
import { getExhibition, updateExhibition } from "@/actions";
import UserTabs from "@/components/UserTabs";
import ExhibitionNftCard from "@/components/ExhibitionNftCard";

const exhibitionSchema = yup.object().shape({
  name: yup.string().required("This field is required."),
  description: yup.string().required("This field is required."),
  country: yup.string().required("This field is required."),
  location: yup.string().required("This field is required."),
  address: yup.string().required("This field is required."),
  nft_address: yup.string().required("This field is required."),
  date: yup.string().required("This field is required."),
  time: yup.string().required("This field is required."),
  artist_name: yup.string().required("This field is required."),
  curator_name: yup.string().required("This field is required."),
  cover_image: yup.mixed().required("This field is required"),
  images: yup.array(yup.mixed().required()).optional(),
  user_id: yup.string().nullable().optional(),
});

interface exhibitionValues extends yup.InferType<typeof exhibitionSchema> {
  images: any[];
  cover_image: any;
  user_id: string;
}

const FormComp = ({
  data: {
    address,
    artist_name,
    artworks,
    country,
    cover_image,
    images,
    id,
    location,
    time,
    date,
    description,
    curator_name,
    name,
    nft_address,
    user_id
  },
  tab,
}: {
  data: Awaited<ReturnType<typeof getExhibition>>;
  tab?: string;
}) => {
  const [url, setUrl] = useState(cover_image);
  const [urls, setUrls] = useState(images);
  const [hasChanged, setHasChanged] = useState(false);
  const initialValues: exhibitionValues = {
    address,
    artist_name,
    country,
    cover_image,
    curator_name,
    date: date.toISOString().split("T")[0],
    description,
    images,
    location,
    name,
    time: time.toISOString().split("T")[1].slice(0, 5),
    nft_address: nft_address || "",
    user_id : user_id || "",
  };

  const router = useRouter();

  const inputRef = useRef<HTMLInputElement>(null);

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

  const processMultipleMedia = (
    e: React.ChangeEvent<HTMLInputElement>,
    setFieldValue: any
  ) => {
    if (!e.target.files || e.target.files.length === 0) {
      return;
    }

    const fileList = Array.from(e.target.files);

    for (let file of fileList) {
      const reader = new FileReader();

      reader.onload = () => {
        if (reader.readyState === 2) {
          setUrls((prev) => [...prev, reader.result?.toString()!]);
        }
      };

      reader.readAsDataURL(file);
    }

    setFieldValue("images", fileList);
    setHasChanged(true);
  };

  const activeTab = tab || "uploaded";

  const handleUpload = () => {
    if (activeTab === "uploaded") {
      router.push(`/admin/exhibitions/${id}/upload`);
    }
    if (activeTab === "gallery" && inputRef.current) {
      inputRef.current.click();
    }
  };

  return (
    <div className="px-10 py-8 space-y-6">
      <Formik
        initialValues={initialValues}
        validationSchema={exhibitionSchema}
        onSubmit={(data, { resetForm, setSubmitting }) => {
          (async () => {
            try {
              let c_image = null;
              if (data.cover_image !== cover_image) {
                c_image = await uploadToCloudinary(data.cover_image);
              }

              let i = images;

              if (hasChanged) {
                i = await uploadFiles(data.images);
              }

              await updateExhibition(id, {
                ...data,
                cover_image: c_image ? c_image : cover_image,
                images: i,
                date: new Date(data.date).toISOString(),
                time: convertTimeToDateTime(data.time),
              });
              resetForm();
              setSubmitting(false);
              toast.success("Exhibition updated Successful");
              router.push("/admin/exhibitions");
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
          <Form autoComplete="off" className="w-full space-y-16 ">
            <div className="w-full space-y-12 ">
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
                <Input
                  label="Nft Address"
                  name="nft_address"
                  type="text"
                  value={values.nft_address}
                  handleChange={handleChange}
                  placeholder="Nft Address"
                  handleBlur={handleBlur}
                  errors={errors.nft_address}
                  touched={touched.nft_address}
                  className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
                  disabled={true}
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
            </div>
            <div className="space-y-10">
              {/* Tabs */}
              <div className="w-full flex justify-between items-center">
                <UserTabs
                  tabs={[
                    { name: "Uploaded Artworks", value: "uploaded" },
                    { name: "Sold Artworks", value: "sold" },
                    { name: "Photo Gallery", value: "gallery" },
                  ]}
                  tab={activeTab}
                />
                <Button
                  text="Upload"
                  action={handleUpload}
                  loading={isSubmitting}
                  className="py-2 rounded-full border border-black bg-black text-white w-[106px]"
                  textStyles="text-[13px]"
                />
                <input
                  type="file"
                  id="images"
                  name="images"
                  multiple
                  onChange={(e) => processMultipleMedia(e, setFieldValue)}
                  className="hidden"
                  accept=".png, .jpg, .jpeg, .gif"
                  ref={inputRef}
                />
              </div>

              {/* Tab Details */}
              <div className="w-full">
                {activeTab === "uploaded" && (
                  <div className="grid grid-cols-3 gap-10">
                    {artworks.map((artwork) => (
                      <ExhibitionNftCard {...artwork} key={artwork.id} />
                    ))}
                  </div>
                )}
                {activeTab === "gallery" && (
                  <div className="grid grid-cols-3 gap-10">
                    {urls.map((url, index) => (
                      <div
                        key={index}
                        className="w-full h-[360px] bg-gray-300 relative "
                      >
                        {url && (
                          <Image
                            src={url}
                            fill
                            className="w-full h-full object-cover"
                            alt="Image"
                          />
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default FormComp;
