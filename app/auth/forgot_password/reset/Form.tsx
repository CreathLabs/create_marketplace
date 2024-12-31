"use client";
import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { resetPassword } from "@/actions";
import { handleError, parseErrors } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

const resetPasswordSchema = yup.object().shape({
  password: yup
    .string()
    .required("Password is required")
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number"),
  confirm_password: yup
    .string()
    .required("This field is required")
    .oneOf([yup.ref("password")], "Passwords must match"),
});

interface resetPasswordValues {
  password: string;
  confirm_password: string;
}

const ResetPassword: React.FC<{ token: string }> = ({ token }) => {
  const initialValues: resetPasswordValues = {
    password: "",
    confirm_password: "",
  };

  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={resetPasswordSchema}
      onSubmit={(data, { resetForm, setSubmitting }) => {
        (async () => {
          try {
            const res = await resetPassword({ ...data, reset_token: token });
            resetForm();
            toast.success("Password Reset Successful");
            setSubmitting(false);
            router.push(`/auth/login`);
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
              label="Password"
              name="password"
              type="password"
              value={values.password}
              handleChange={handleChange}
              placeholder="Password"
              handleBlur={handleBlur}
              errors={errors.password}
              touched={touched.password}
            />

            <Input
              label="Confirm Password"
              name="confirm_password"
              type="password"
              value={values.confirm_password}
              handleChange={handleChange}
              placeholder="Confirm Password"
              handleBlur={handleBlur}
              errors={errors.confirm_password}
              touched={touched.confirm_password}
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

export { ResetPassword };
