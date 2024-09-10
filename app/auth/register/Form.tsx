"use client";
import React, { memo } from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import Input from "@/components/Input";
import Button from "@/components/Button";
import { createUser } from "@/actions";
import { handleError, parseErrors } from "@/lib/helpers";
import { useRouter } from "next/navigation";

const signupSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email address is incorrect")
    .required("This field is required."),
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

interface signinValues {
  email: string;
  password: string;
  confirm_password: string;
}

const SignUpForm = () => {
  const initialValues: signinValues = {
    email: "",
    password: "",
    confirm_password: "",
  };

  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signupSchema}
      onSubmit={(data, { resetForm, setSubmitting }) => {
        createUser({
          email: data.email,
          password: data.password,
        })
          .then((res) => {
            console.log(res);
            resetForm();
            setSubmitting(false);
            router.push(`/auth/register/verify?email=${data.email}`);
          })
          .catch((err) => {
            const error = parseErrors(err);
            handleError(error.errors);
            setSubmitting(false);
          });
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
              placeholder="Enter Email Address"
              handleBlur={handleBlur}
              errors={errors.email}
              touched={touched.email}
            />

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
            text="Create Account"
            action={handleSubmit}
            loading={isSubmitting}
            className="py-4 w-full"
          />
        </Form>
      )}
    </Formik>
  );
};

export default memo(SignUpForm);
