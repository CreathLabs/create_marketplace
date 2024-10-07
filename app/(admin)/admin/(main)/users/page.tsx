import React from "react";
import { getAdminUsers, getUsersStats } from "@/actions";
import { Icon } from "@iconify/react/dist/iconify.js";
import Image from "next/image";
import moment from "moment";
import Toggler from "@/components/toggler";
import Header from "../header";
import { truncate } from "lodash";
import Link from "next/link";

const UsersPage = async ({ searchParams }: { searchParams: any }) => {
  const type = searchParams?.type || ("users" as string);
  let dashStat = null;

  const res = await getUsersStats();
  const users = await getAdminUsers(type === "users" ? "ARTIST" : "GALLERY");
  dashStat = res;

  if (!dashStat || !users) {
    return null;
  }

  const { artistsCount, galleriesCount, collectorsCount } = dashStat;

  const stats = [
    { title: "Artists", value: artistsCount },
    { title: "Galleries", value: galleriesCount },
    { title: "Collectors", value: collectorsCount },
  ];

  return (
    <div className="w-full  h-full">
      <Header title="Users" />
      <div className="px-10 py-8 space-y-6">
        <div className="grid grid-cols-3 gap-x-10">
          {stats.map((item, index) => (
            <div
              key={index}
              className="border border-[#0000000D] rounded  space-y-6 px-6 py-8 "
            >
              <h2 className="text-mainGray text-lg  ">{item.title}</h2>
              <h1 className="text-2xl font-bold ">{item.value}</h1>
            </div>
          ))}
        </div>

        <div className="space-y-8">
          <Toggler type={type} />
          <div className="space-y-3">
            <h1 className="text-lg leading-[44px] text-black font-bold ">
              User Listing
            </h1>
            <div className=" overflow-hidden rounded-t-[6px] border border-[#E2E8F0]/50 ">
              <div className="grid grid-cols-4 w-full bg-grayTwo py-4 px-6   ">
                {[
                  {
                    title: "Email Address",
                    icon: "material-symbols:person",
                  },
                  {
                    title: "Username",
                    icon: "ph:bank-fill",
                  },
                  {
                    title: "Artworks",
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
                {users?.data?.map((user, index) => (
                  <Link key={index} href={`/admin/users/${user.id}`}>
                    <div className="grid grid-cols-4 w-full h-auto  py-4 px-6  cursor-pointer  hover:bg-gray-50/70  ">
                      <div className="flex items-center gap-x-3">
                        <Image
                          src={
                            user.profile_image ||
                            `https://api.dicebear.com/9.x/initials/png?seed=${user?.username}`
                          }
                          width={32}
                          height={32}
                          className="rounded-full w-8 h-8"
                          alt=""
                        />
                        <h1 className="text-sm text-[#2D3748] font-medium ">
                          {truncate(user.email, { length: 20 })}
                        </h1>
                      </div>
                      <h1 className="text-sm text-[#2D3748] font-medium ">
                        {user.username}
                      </h1>
                      <h1 className="text-sm text-[#2D3748] font-medium ">
                        {user?.artworks?.length || 0}
                      </h1>
                      <h1 className="text-sm text-[#2D3748] font-medium ">
                        {moment(user.created_at).format("ll")}
                      </h1>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UsersPage;
