import React from "react";
import EditProfileForm from "./Form";
import { getProfile } from "@/actions";
import { redirect } from "next/navigation";

const EditProfile = async () => {
  let profile = null;
  try {
    const res = await getProfile();
    profile = res;
  } catch (error) {
    console.log(error);
  }

  if (!profile) {
    redirect("/auth/login");
  }
  return (
    <div className="py-10 contain lg:min-h-[calc(100vh-70px)] space-y-24">
      <h1 className="text-[40px] font-bold font-Playfair ">Edit Profile</h1>
      <EditProfileForm profile={profile} />
    </div>
  );
};

export default EditProfile;
