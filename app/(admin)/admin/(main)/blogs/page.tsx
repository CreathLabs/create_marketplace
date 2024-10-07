import React from "react";
import { getAdminBlogs, getAdminCollectibles } from "@/actions";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import moment from "moment";
import Header from "../header";
import { truncate } from "lodash";
import Button from "@/components/Button";
import { redirect } from "next/navigation";

const BlogsPage = async () => {
  const blogs = await getAdminBlogs();

  if (!blogs) {
    return null;
  }

  return (
    <div className="w-full  h-full">
      <Header title="Blogs" />
      <div className="px-10 py-8 space-y-6">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-lg leading-[44px] text-black font-bold ">
              Blogs
            </h1>
            <div>
              <Button
                text="Add New"
                action={async () => {
                  "use server";
                  redirect("/admin/blogs/create");
                }}
                textStyles="text-[13px]"
                className="py-2 w-[106px]  rounded-full border-none bg-black text-white"
              />
            </div>
          </div>

          <div className=" overflow-hidden rounded-t-[6px] border border-[#E2E8F0]/50 ">
            <div className="grid grid-cols-3 w-full bg-grayTwo py-4 px-6   ">
              {[
                {
                  title: "Collectibles Name",
                  icon: "material-symbols:person",
                },
                {
                  title: "Publisher",
                  icon: "ph:bank-fill",
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
              {blogs?.data?.map((blog, index) => (
                <div
                  key={index}
                  className="grid grid-cols-3 w-full h-auto  py-4 px-6   "
                >
                  <div className="flex items-center gap-x-3">
                    <Image
                      src={
                        blog.cover_image ||
                        `https://api.dicebear.com/9.x/initials/png?seed=${blog?.title}`
                      }
                      width={32}
                      height={32}
                      className="rounded-full w-8 h-8"
                      alt=""
                    />
                    <h1 className="text-sm text-[#2D3748] font-medium ">
                      {truncate(blog.title, { length: 30 })}
                    </h1>
                  </div>
                  <h1 className="text-sm text-[#2D3748] font-medium ">
                    Creath Admin
                  </h1>
                  <h1 className="text-sm text-[#2D3748] font-medium ">
                    {moment(blog.created_at).format("ll")}
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

export default BlogsPage;
