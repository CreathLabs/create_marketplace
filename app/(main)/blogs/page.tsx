import React from "react";
import BlogPageCard from "@/components/BlogPageCard";
import { getBlogs } from "@/actions";

const Blogs = async () => {
  const data = await getBlogs();
  return (
    <div className="py-14 w-full contain space-y-8 lg:space-y-[30px] min-h-[calc(100vh-70px)]">
      <div className="flex flex-col lg:flex-row gap-y-6 lg:gap-0 justify-between lg:items-center ">
        <h1 className=" heading leading-[60px] ">Creath Conversations</h1>
      </div>
      <div className="lg:mt-1 flex flex-col items-start">
        <p className=" text-xl leading-loose ">
          Advice and Answers from the Creath Marketplace Team
        </p>
      </div>
      <div className="w-full flex flex-col items-center gap-y-10">
        <div className="w-full grid lg:grid-cols-2 gap-[60px] ">
          {data.map((a) => (
            <BlogPageCard key={a.id} {...a} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Blogs;
