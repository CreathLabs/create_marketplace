import Button from "@/components/Button";
import EventCard from "@/components/EventCard";
import React from "react";

const Exhibitions = () => {
  return (
    <div className="py-14 contain space-y-[72px]">
      <div className="flex justify-between items-center ">
        <h1 className="text-[40px] font-Playfair font-bold leading-[60px] ">
          Creath Exhibitons
        </h1>
        <div className="w-full max-w-[50%] flex space-x-8 ">
          <input
            placeholder="Search Art or Artists"
            className="py-[14px] w-full px-4 placeholder:text-black outline-none placeholder:font-light bg-grayTwo "
          />
          <Button text="Search" className="w-[145px] h-full" />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-[60px] ">
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
        <EventCard />
      </div>
    </div>
  );
};

export default Exhibitions;
