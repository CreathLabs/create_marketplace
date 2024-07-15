import Button from "@/components/Button";
import Hero from "./hero";
import TopNFTs from "./topnfts";
import Artist from "@/components/Artist";
import Collectible from "@/components/Collectible";
import EventCard from "@/components/EventCard";
import Accordion from "@/components/Accordion";
import { accordionItems } from "@/lib/data";
import BlogCard from "@/components/BlogCard";

export default function Home() {
  return (
    <main className="w-full h-full">
      <Hero />
      <TopNFTs />
      {/* artists */}
      <div className="bg-black  pt-10 pb-16">
        <div className="contain space-y-14">
          <div className=" flex justify-between items-center">
            <h1 className="font-Playfair text-white font-bold !text-[40px] ">
              Performing Artists
            </h1>
            <Button
              text="View All Artists"
              textStyles="w-[183px]"
              className="text-white border-white"
            />
          </div>
          <div className="grid grid-cols-4 gap-20">
            <Artist />
            <Artist />
            <Artist />
            <Artist />
            <Artist />
            <Artist />
            <Artist />
            <Artist />
          </div>
        </div>
      </div>
      {/* collectibles */}
      <div className=" pt-10 pb-14">
        <div className="contain space-y-14">
          <div className=" flex justify-between items-center">
            <h1 className="font-Playfair  font-bold !text-[40px] ">
              Collectibles
            </h1>
            <Button text="View All Collectibles" textStyles="w-[183px]" />
          </div>
          <div className="grid grid-cols-3 gap-16">
            <Collectible />
            <Collectible />
            <Collectible />
          </div>
        </div>
      </div>
      {/* exhibitions */}
      <div className="bg-grayTwo pt-10 pb-14">
        <div className="contain space-y-14">
          <div className=" flex justify-between items-center">
            <h1 className="font-Playfair  font-bold !text-[40px] ">
              Creath Exhibitions
            </h1>
            <Button text="View More Exhibitions" textStyles="w-[183px]" />
          </div>
          <div className="grid grid-cols-2 gap-16">
            <EventCard />
            <EventCard />
          </div>
        </div>
      </div>
      {/* faq */}
      <div className="bg-grayTwo py-[104px]">
        <div className="contain grid grid-cols-2 gap-16 items-center ">
          <div className="space-y-6">
            <h1 className="text-[40px] font-bold leading-[60px] font-Playfair  ">
              Frequently Asked Questions
            </h1>
            <h2 className="text-xl text-mainGray leading-[45px]">
              Everything you need to know about Creath marketplace
            </h2>
          </div>
          <Accordion items={accordionItems} />
        </div>
      </div>
      {/* news letter */}
      <div className="py-10">
        <div className="contain py-14 bg-black text-white">
          <div className="grid grid-cols-5 px-20">
            <div className="col-span-3  space-y-4">
              <h1 className="text-[40px] font-Playfair font-bold leading-[60px] ">
                Join our newsletter <br /> to stay updated
              </h1>
              <h2 className="text-xl leading-[45px]  ">
                Get the lastest information in your <br /> inbox, we dont spam.
              </h2>
            </div>
            <div className="col-span-2 w-full h-full flex flex-col justify-end">
              <form className="space-y-10">
                <input
                  placeholder="Enter Email"
                  className="px-3 py-[14px] text-[18px] text-black outline-none w-full"
                />
                <Button
                  text="Submit"
                  textStyles="w-[183px]"
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
            <h1 className="font-Playfair  font-bold !text-[40px] ">Blog</h1>
            <Button text="View All Blogs" textStyles="w-[183px]" />
          </div>
          <div className="grid grid-cols-3 gap-[34px]">
            <BlogCard />
            <BlogCard />
            <BlogCard />
          </div>
        </div>
      </div>
    </main>
  );
}
