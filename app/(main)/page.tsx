import Button from "@/components/Button";
import Hero from "./hero";
import TopNFTs from "./topnfts";
import Artist from "@/components/Artist";
import Collectible from "@/components/Collectible";
import EventCard from "@/components/EventCard";
import Accordion from "@/components/Accordion";
import { accordionItems } from "@/lib/data";
import BlogCard from "@/components/BlogCard";
import {
  getTopArtists,
  getTopNfts,
  getTopExhibitions,
  getTopBlogs,
  getTopCollectibless,
  getAllUserLikes,
} from "@/actions";
import Link from "next/link";

export default async function Home() {
  const topNfts = await getTopNfts();
  const artists = await getTopArtists();
  const exhibitions = await getTopExhibitions();
  const collectibles = await getTopCollectibless();
  const blogs = await getTopBlogs();
  const allLikes = await getAllUserLikes();

  return (
    <main className="w-full h-full">
      <Hero topNfts={topNfts} allLikes={allLikes} />
      <TopNFTs topNfts={topNfts} />
      {/* artists */}
      <div className="bg-black  pt-8 md:pt-10 md:pb-14 pb-6">
        <div className="contain space-y-10 md:space-y-14">
          <div className=" flex justify-between items-center">
            <h1 className="heading text-white ">Performing Artists</h1>
            <Link href={"/artists"}>
              <Button
                text="View All Artists"
                textStyles="w-[183px]"
                className="text-white border-white hidden lg:flex"
              />
            </Link>
          </div>
          <div className="grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-20 hidden md:grid">
            {artists.map((a) => (
              <Artist artist={a} key={a.id} />
            ))}
          </div>
          <div className="grid gap-20 md:hidden">
            {artists.slice(0, 3).map((a) => (
              <Artist artist={a} key={a.id} />
            ))}
          </div>
          <div className="w-full flex justify-center lg:hidden">
            <Link href={"/artists"}>
              <Button
                text="Explore Marketplace"
                className="text-white border-white"
                textStyles="w-[144px]"
              />
            </Link>
          </div>
        </div>
      </div>
      {/* collectibles */}
      <div className=" pt-8 md:pt-10 md:pb-14 pb-6 ">
        <div className="contain space-y-10 md:space-y-14">
          <div className=" flex justify-between items-center">
            <h1 className="heading">Collectibles</h1>
            <Link href={"/collectibles"}>
              <Button
                text="View All Collectibles"
                textStyles="w-[183px]"
                className="hidden lg:flex"
              />
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-16">
            {collectibles.map((item) => (
              <Collectible key={item.id} {...item} />
            ))}
          </div>
          <div className="w-full flex justify-center lg:hidden">
            <Link href={"/collectibles"}>
              <Button text="View More" textStyles="w-[144px]" />
            </Link>
          </div>
        </div>
      </div>
      {/* exhibitions */}
      <div className="bg-grayTwo pt-8 md:pt-10 md:pb-14 pb-6 ">
        <div className="contain space-y-10 lg:space-y-14">
          <div className=" flex justify-between items-center">
            <h1 className="heading">Creath Exhibitions</h1>
            <Link href={"/exhibitions"}>
              <Button
                text="View More Exhibitions"
                textStyles="w-[183px]"
                className="hidden lg:flex"
              />
            </Link>
          </div>
          <div className="grid lg:grid-cols-2 gap-6 md:gap-12 lg:gap-16">
            {exhibitions.map((ex) => (
              <EventCard key={ex.id} {...ex} />
            ))}
          </div>
          <div className="w-full flex justify-center lg:hidden">
            <Link href={"/exhibitions"}>
              <Button text="View More" textStyles="w-[144px]" />
            </Link>
          </div>
        </div>
      </div>
      {/* faq */}
      <div className="bg-grayTwo py-8 lg:py-[104px]">
        <div className="contain grid lg:grid-cols-2 gap-6 lg:gap-16 items-center ">
          <div className="space-y-6">
            <h1 className=" text-[28px] text-center lg:text-left lg:text-[40px] font-bold leading-[45px] lg:leading-[60px] font-Playfair  ">
              Frequently Asked <br className="lg:hidden" /> Questions
            </h1>
            <h2 className=" text-[17px] text-center lg:text-left lg:text-xl text-mainGray leading-[45px]">
              Everything you need to know about Creath marketplace
            </h2>
          </div>
          <Accordion items={accordionItems} />
        </div>
      </div>
      {/* news letter */}
      <div className="py-4 md:py-10">
        <div className="contain   text-white">
          <div className="grid lg:grid-cols-5 px-4 py-6 lg:py-14 bg-black gap-y-8 lg:px-20">
            <div className="lg:col-span-3  space-y-4">
              <h1 className="heading leading-[60px] ">
                Join our newsletter <br /> to stay updated
              </h1>
              <h2 className=" text-[17px] lg:text-xl leading-[45px]  ">
                Get the lastest information in your{" "}
                <br className="hidden md:block" /> inbox, we dont spam.
              </h2>
            </div>
            <div className="lg:col-span-2 w-full h-full flex flex-col justify-end">
              <form className="space-y-10">
                <input
                  placeholder="Enter Email"
                  className="px-3 py-[14px] text-[18px] text-black outline-none w-full"
                />
                <Button
                  text="Submit"
                  textStyles="w-[144px] lg:w-[183px]"
                  className="text-white border-white"
                />
              </form>
            </div>
          </div>
        </div>
      </div>
      {/* blogs */}
      <div className=" pt-8 pb-[72px] ">
        <div className="contain space-y-14">
          <div className=" flex justify-between items-center">
            <h1 className="heading">Blog</h1>
            <Link href={"/blogs"}>
              <Button
                text="View All Blogs"
                textStyles="w-[183px]"
                className="hidden lg:flex"
              />
            </Link>
          </div>
          <div className="grid lg:grid-cols-3 gap-[34px]">
            {blogs?.map((blog) => (
              <BlogCard key={blog.id} {...blog} />
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
