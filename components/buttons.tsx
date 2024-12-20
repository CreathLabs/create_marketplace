"use client";
import { likeCollectible, likeNft } from "@/actions";
import { Heart } from "iconsax-react";
import React, { useEffect, useState } from "react";

export const LikeButton: React.FC<{
  isLiked: boolean;
  likesCount: number;
  id: string;
  type?: "art" | "collectible";
}> = ({ isLiked, id, likesCount, type = "art" }) => {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likesCount);

  useEffect(() => {
    setLiked(isLiked);
    setLikes(likesCount);
  }, [id]);

  const handleLikeResource = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    if (type === "art") {
      await likeNft(id);
    } else {
      await likeCollectible(id);
    }
    if (liked) {
      setLikes((prev) => prev - 1);
      setLiked(false);
    } else {
      setLikes((prev) => prev + 1);
      setLiked(true);
    }
  };

  return (
    <div className="flex items-center space-x-3 ">
      <Heart
        size={24}
        color={"#000"}
        variant={liked ? "Bold" : "Outline"}
        className="hidden md:block"
        onClick={handleLikeResource}
      />
      <Heart
        size={20}
        color={"#000"}
        variant={liked ? "Bold" : "Outline"}
        className="md:hidden"
        onClick={handleLikeResource}
      />
      <h1 className="font-bold text-base md:text-xl">{likes}</h1>
    </div>
  );
};
