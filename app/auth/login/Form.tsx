"use client";
import React from "react";
import * as yup from "yup";
import { Formik, Form } from "formik";
import Button from "@/components/Button";
import Input from "@/components/Input";
import { userSignin, saveSession } from "@/actions";
import { handleError, parseErrors } from "@/lib/helpers";
import { useRouter } from "next/navigation";

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

const SigninForm: React.FC<{}> = () => {
  const initialValues: signinValues = {
    email: "",
    password: "",
  };

  const router = useRouter();

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={signinSchema}
      onSubmit={(data, { resetForm, setSubmitting }) => {
        (async () => {
          try {
            const res = await userSignin(data);
            resetForm();
            setSubmitting(false);
            await saveSession("token", res?.data?.token || "");
            router.push("/");
          } catch (error) {
            const err = parseErrors(error);
            if (err.errors.find((e) => e.message === "Account not verified")) {
              resetForm();
              router.replace(`/auth/register/verify?email=${data.email}`);
            }
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
            <div className="space-y-3">
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
              <div className="flex text-[15px] lg:text-base justify-end w-full">
                <h1>Forgot Password?</h1>
              </div>
            </div>
          </div>
          <Button
            text="Log In"
            action={handleSubmit}
            loading={isSubmitting}
            className="py-4 w-full"
          />
        </Form>
      )}
    </Formik>
  );
};

export { SigninForm };
