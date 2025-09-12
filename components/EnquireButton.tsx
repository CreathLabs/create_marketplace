"use client"
import React, { useState } from "react";
import Button from "@/components/Button";
import Input from "@/components/Input";
import TextArea from "@/components/TextArea";
import { Formik, Form } from "formik";
import * as yup from "yup";
import { sendEnquiry } from "@/actions";
import { toast } from "react-toastify";

const enquirySchema = yup.object().shape({
    name: yup.string().required("Name is required"),
    email: yup.string().email("Invalid email").required("Email is required"),
    description: yup.string().required("Description is required"),
});

interface EnquiryFormValues {
    name: string;
    email: string;
    description: string;
}

const EnquireButton = () => {
    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(true);
    }

    const closeModal = () => {
        setShowModal(false);
    }

    const initialValues: EnquiryFormValues = {
        name: "",
        email: "",
        description: "",
    };

    // const handleSubmit = async (values: EnquiryFormValues, { setSubmitting, resetForm }: any) => {
    //     try {
    //         setSubmitting(true);
    //         await sendEnquiry(values.name, values.email, values.description);
    //         resetForm();
    //         setSubmitting(false);
    //         closeModal();
    //     } catch (error) {
    //         console.error("Error submitting enquiry:", error);
    //         setSubmitting(false);
    //     }
    // };

    return (
        <>
            <Button
                text="Inquire"
                textStyles=" w-[144px] lg:w-[183px]"
                className="text-white border-white"
                action={openModal}
            />

            {/* Enquiry Form Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-8 max-w-md w-full mx-4 max-h-[90vh] overflow-y-auto">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-bold">Send Enquiry</h2>
                            <button
                                onClick={closeModal}
                                className="text-gray-500 hover:text-gray-700 text-2xl"
                            >
                                ×
                            </button>
                        </div>

                        <Formik
                            initialValues={initialValues}
                            validationSchema={enquirySchema}
                            onSubmit={
                                (data, {resetForm, setSubmitting}) =>{
                                    (async () => {
                                        try {
                                            setSubmitting(true);
                                            await sendEnquiry(data.name, data.email, data.description);
                                            resetForm();
                                            setSubmitting(false);
                                            toast.success("Enquiry submitted successfully!");
                                            closeModal();
                                        } catch (error) {
                                            console.error("Error submitting enquiry:", error);
                                            setSubmitting(false);
                                        }
                                    })()
                                }
                            }
                        >
                            {({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <Form className="space-y-4">
                                    <Input
                                        label="Name"
                                        name="name"
                                        type="text"
                                        value={values.name}
                                        handleChange={handleChange}
                                        placeholder="Your full name"
                                        handleBlur={handleBlur}
                                        errors={errors.name}
                                        touched={touched.name}
                                        className="rounded-lg bg-gray-50 border border-gray-300 placeholder:text-gray-500"
                                    />

                                    <Input
                                        label="Email"
                                        name="email"
                                        type="email"
                                        value={values.email}
                                        handleChange={handleChange}
                                        placeholder="your.email@example.com"
                                        handleBlur={handleBlur}
                                        errors={errors.email}
                                        touched={touched.email}
                                        className="rounded-lg bg-gray-50 border border-gray-300 placeholder:text-gray-500"
                                    />

                                    <TextArea
                                        label="Description"
                                        name="description"
                                        value={values.description}
                                        handleChange={handleChange}
                                        placeholder="Please describe your enquiry..."
                                        handleBlur={handleBlur}
                                        errors={errors.description}
                                        touched={touched.description}
                                        className="rounded-lg bg-gray-50 border border-gray-300 placeholder:text-gray-500 min-h-[100px]"
                                    />

                                    <div className="flex gap-4 pt-4">
                                        <Button
                                            text="Submit"
                                            loading={isSubmitting}
                                            action={handleSubmit}
                                            className="flex-1 py-3  bg-black text-white hover:bg-gray-800"
                                        />
                                        <Button
                                            text="Cancel"
                                            action={closeModal}
                                            className="flex-1 py-3  bg-gray-200 text-gray-800 hover:bg-gray-300"
                                        />
                                    </div>
                                </Form>
                            )}
                        </Formik>
                    </div>
                </div>
            )}
        </>
    );
};

export default EnquireButton;