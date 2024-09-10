"use client";
import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { handleError, parseErrors } from "@/lib/helpers";
import { useRouter } from "next/navigation";
import { adminSignin, saveSession } from "@/actions";
import { toast } from "react-toastify";

const signinSchema = yup.object().shape({
  email: yup
    .string()
    .email("Email address is incorrect")
    .required("This field is required."),
  password: yup.string().required("This field is required."),
});

interface signinValues {
  email: string;
  password: string;
}

const Signin = () => {
  const initialValues: signinValues = {
    email: "",
    password: "",
  };

  const router = useRouter();

  return (
    <div className="w-[686px] bg-[#FAFAFA]  py-10 px-20 space-y-10 ">
      <div className="w-full flex flex-col items-center space-y-4 ">
        <h1 className="text-black text-2xl font-semibold  ">Welcome Back!</h1>
        <h1>Fill in details below to get acess to your account</h1>
      </div>
      <Formik
        initialValues={initialValues}
        validationSchema={signinSchema}
        onSubmit={(data, { resetForm, setSubmitting }) => {
          (async () => {
            try {
              const res = await adminSignin(data);
              resetForm();
              setSubmitting(false);
              await saveSession("admin_token", res?.data?.token || "");
              toast.success("Sign In Successful");
              router.push("/admin");
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
          <Form autoComplete="off" className=" w-full space-y-16 ">
            <div className="space-y-8">
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
                className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
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
                className="rounded-full bg-white border border-[#E2E8F0] placeholder:text-[#0000005C] "
              />
            </div>
            <Button
              text="Log In"
              action={handleSubmit}
              loading={isSubmitting}
              className="py-4 rounded-full border-none bg-black text-white w-full"
            />
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default Signin;
