import React from "react";
import { getAdmins } from "@/actions";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import moment from "moment";
import Header from "../header";
import { truncate } from "lodash";
import Button from "@/components/Button";
import { redirect } from "next/navigation";

const AdminsPage = async () => {
  const admins = await getAdmins();

  if (!admins) {
    return null;
  }

  return (
    <div className="w-full  h-full">
      <Header title="Admins" />
      <div className="px-10 py-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg leading-[44px] text-black font-bold ">
              Admins
            </h1>
            <div>
              <Button
                text="Create"
                action={async () => {
                  "use server";
                  redirect("/admin/admins/create");
                }}
                textStyles="text-[13px]"
                className="py-2 w-[106px]  rounded-full border-none bg-black text-white"
              />
            </div>
          </div>

          <div className=" overflow-hidden rounded-t-[6px] border border-[#E2E8F0]/50 ">
            <div className="grid grid-cols-4 w-full bg-grayTwo py-4 px-6   ">
              {[
                {
                  title: "Admin Name",
                  icon: "material-symbols:person",
                },
                {
                  title: "Email Address",
                  icon: "ph:bank-fill",
                },
                {
                  title: "Phone Number",
                  icon: "heroicons:identification-20-solid",
                },
                {
                  title: "Creation Date",
                  icon: "clarity:date-solid",
                },
              ].map((item, index) => (
                <div
                  key={index}
                  className="w-full flex items-center space-x-2 "
                >
                  <Icon icon={item.icon} className="!text-base" />
                  <h1 className="font-bold text-sm">{item.title}</h1>
                </div>
              ))}
            </div>
            <div className="">
              {admins?.data?.map((admin, index) => (
                <div
                  key={index}
                  className="grid grid-cols-4 w-full h-auto  py-4 px-6   "
                >
                  <div className="flex items-center gap-x-3">
                    <Image
                      src={
                        admin.profile_image ||
                        `https://api.dicebear.com/9.x/initials/png?seed=${admin?.full_name}`
                      }
                      width={32}
                      height={32}
                      className="rounded-full w-8 h-8"
                      alt=""
                    />
                    <h1 className="text-sm text-[#2D3748] font-medium ">
                      {truncate(admin.full_name, { length: 30 })}
                    </h1>
                  </div>
                  <h1 className="text-sm text-[#2D3748] font-medium ">
                    {truncate(admin.email, { length: 30 })}
                  </h1>
                  <h1 className="text-sm text-[#2D3748] font-medium ">
                    {admin.phone_no}
                  </h1>
                  <h1 className="text-sm text-[#2D3748] font-medium ">
                    {moment(admin.created_at).format("ll")}
                  </h1>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminsPage;
