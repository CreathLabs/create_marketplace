"use client";
import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { forgotPassword } from "@/actions";
import { handleError, parseErrors } from "@/lib/helpers";
import { useRouter } from "next/navigation";

const verifyOTPSchema = yup.object().shape({
  otp: yup.string().required("This field is required."),
});

interface verifyOTPValues {
  otp: string;
}

const VerifyOTP: React.FC<{ email: string }> = ({ email }) => {
  const initialValues: verifyOTPValues = {
    otp: "",
  };

  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={verifyOTPSchema}
      onSubmit={(data, { resetForm, setSubmitting }) => {
        (async () => {
          try {
            const res = await forgotPassword(email, data.otp);
            resetForm();
            setSubmitting(false);
            router.push(`/auth/forgot_password/reset?token=${res.data}`);
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
      }) => (
        <Form autoComplete="off" className=" w-full space-y-12 ">
          <div className="space-y-6">
            <Input
              label="Enter Authentication Code"
              name="otp"
              type="otp"
              value={values.otp}
              handleChange={handleChange}
              placeholder="Enter Code"
              handleBlur={handleBlur}
              errors={errors.otp}
              touched={touched.otp}
            />
          </div>
          <Button
            text="Next"
            action={handleSubmit}
            loading={isSubmitting}
            className="py-4 w-full"
          />
        </Form>
      )}
    </Formik>
  );
};

export { VerifyOTP };
