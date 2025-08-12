"use client";
import { useState } from "react";
import ExhibitionNftCard from "@/components/ExhibitionNftCard";
import { Art } from "@prisma/client";
import EmptyComponent from "@/components/EmptyComponent";
import Button from "./Button";

interface Props {
  artworks: Art[];
}

const STEP = 12;

const ExhibitionPageContent: React.FC<Props> = ({ artworks }) => {
  const [visibleCount, setVisibleCount] = useState(STEP);

  const visibleArtworks = artworks.slice(0, visibleCount);
  const hasMore = visibleCount < artworks.length;

  const handleToggle = () => {
    if (hasMore) {
      setVisibleCount((prev) => Math.min(prev + STEP, artworks.length));
    } else {
      setVisibleCount(STEP); // Reset
    }
  };

  return (
    <>
      {artworks?.length > 0 ? (
        <div className="space-y-6">
          <div className="w-full grid lg:grid-cols-3 gap-6 lg:gap-8 transition-all duration-700">
            {visibleArtworks.map((n) => (
              <ExhibitionNftCard key={n.id} {...n} />
            ))}
          </div>

          {artworks.length > STEP && (
            <div className="text-center pt-4">
              <Button
                text={hasMore ? "See More" : "See Less"}
                action={handleToggle}
                className="center mx-auto w-fit text-black font-semibold px-3 py-[14px] text-sm lg:text-base leading-[23.22px] flex justify-center items-center gap-x-4 border-b-2 border-black"
              />
            </div>
          )}
        </div>
      ) : (
        <div className="py-16">
          <EmptyComponent
            text="Oops! There are no featured artworks at the moment"
            className="max-w-[630px]"
          />
        </div>
      )}
    </>
  );
};

export default ExhibitionPageContent;