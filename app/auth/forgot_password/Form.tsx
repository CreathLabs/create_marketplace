"use client";
import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { resendOtp } from "@/actions";
import { handleError, parseErrors } from "@/lib/helpers";
import { useRouter } from "next/navigation";

const forgotPasswordSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email address is incorrect")
    .required("This field is required."),
});

interface forgotPasswordValues {
  email: string;
}

const ForgotPassword: React.FC<{}> = () => {
  const initialValues: forgotPasswordValues = {
    email: "",
  };

  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={forgotPasswordSchema}
      onSubmit={(data, { resetForm, setSubmitting }) => {
        (async () => {
          try {
            await resendOtp(data.email);
            resetForm();
            setSubmitting(false);
            router.push(`/auth/forgot_password/verify?email=${data.email}`);
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
              label="Email Address"
              name="email"
              type="email"
              value={values.email}
              handleChange={handleChange}
              placeholder="Email Address"
              handleBlur={handleBlur}
              errors={errors.email}
              touched={touched.email}
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

export { ForgotPassword };
