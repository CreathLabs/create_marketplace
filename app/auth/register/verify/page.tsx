"use client";
import Button from "@/components/Button";
import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import Input from "@/components/Input";
import { verifyOtp, saveSession } from "@/actions";
import { useRouter, useSearchParams } from "next/navigation";
import { handleError, parseErrors } from "@/lib/helpers";

const verifySchema = yup.object().shape({
  otp: yup.string().required("This field is required."),
});

interface verifyValues {
  otp: string;
}

const VerifyPage = () => {
  const searchParams = useSearchParams();
  const email = searchParams.get("email") || "";

  const initialValues: verifyValues = {
    otp: "",
  };

  const router = useRouter();

  return (
    <div className="w-full py-8 space-y-8">
      <div className="space-y-6 lg:space-y-3">
        <h1 className="font-Playfair font-bold text-[22px] leading-[29px] lg:text-3xl lg:leading-[60px] tracking-[3%] ">
          Enter Authentication Code
        </h1>
        <h3 className="text-mainGray text-[15px] lg:text-lg lg:leading-[45px] ">
          Please check email inbox for authentication code{" "}
        </h3>
      </div>

      <Formik
        initialValues={initialValues}
        validationSchema={verifySchema}
        onSubmit={async (data, { resetForm, setSubmitting }) => {
          try {
            const res = await verifyOtp({
              email,
              otp: data.otp,
            });
            resetForm();
            setSubmitting(false);
            await saveSession("token", res?.data?.token || "");
            router.push("/");
          } catch (err) {
            const error = parseErrors(err);
            handleError(error.errors);
            setSubmitting(false);
          }
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
        }) => (
          <Form autoComplete="off" className=" w-full space-y-12 ">
            <div className="space-y-6">
              <Input
                label="Enter Authentication Code"
                name="otp"
                type="text"
                value={values.otp}
                handleChange={handleChange}
                placeholder="Enter Code"
                handleBlur={handleBlur}
                errors={errors.otp}
                touched={touched.otp}
              />
            </div>
            <Button
              text="Verify"
              action={handleSubmit}
              loading={isSubmitting}
              className="py-4 w-full"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default VerifyPage;
