"use client";
import {
  deleteExhibitionArtWork,
  flagCollectible,
  flagNft,
  likeCollectible,
  likeNft,
} from "@/actions";
import { MenuContext } from "@/contexts/menuContext";
import { Icon } from "@iconify/react/dist/iconify.js";
import { Heart, InfoCircle, Trash, LoginCurve } from "iconsax-react";
import { useRouter } from "next/navigation";
import React, { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";

export const LikeButton: React.FC<{
  isLiked: boolean;
  likesCount: number;
  id: string;
  type?: "art" | "collectible";
}> = ({ isLiked, id, likesCount, type = "art" }) => {
  const [liked, setLiked] = useState(isLiked);
  const [likes, setLikes] = useState(likesCount);

  const { isLoggedIn, setShowModal } = useContext(MenuContext);

  useEffect(() => {
    setLiked(isLiked);
    setLikes(likesCount);
  }, [id]);

  const handleLikeResource = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

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
        // color={"#000"}
        variant={liked ? "Bold" : "Outline"}
        className="hidden md:block cursor-pointer"
        onClick={handleLikeResource}
      />
      <Heart
        size={20}
        // color={"#000"}
        variant={liked ? "Bold" : "Outline"}
        className="md:hidden cursor-pointer"
        onClick={handleLikeResource}
      />
      <h1 className="font-bold text-base md:text-xl">{likes}</h1>
    </div>
  );
};

export const FlagButton: React.FC<{
  isFlagged: boolean;
  id: string;
  type?: "art" | "collectible";
}> = ({ isFlagged, id, type = "art" }) => {
  const [flagged, setFlagged] = useState(isFlagged);

  const { isLoggedIn, setShowModal } = useContext(MenuContext);

  useEffect(() => {
    setFlagged(isFlagged);
  }, [id]);

  const handleFlagResource = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();

    if (!isLoggedIn) {
      setShowModal(true);
      return;
    }

    if (type === "art") {
      await flagNft(id);
    } else {
      await flagCollectible(id);
    }
    if (flagged) {
      setFlagged(false);
      toast("This resource has been unflagged successfully");
    } else {
      setFlagged(true);
      toast("This resource has been flagged successfully");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div
        className={`w-12 h-12  ${
          flagged ? "bg-red-600" : "bg-white"
        } 0 flex items-center justify-center `}
      >
        <InfoCircle
          size={24}
          color={flagged ? "#fff" : "#000"}
          variant="Outline"
          className="hidden md:block cursor-pointer"
          onClick={handleFlagResource}
        />
        <InfoCircle
          size={20}
          color={flagged ? "#fff" : "#000"}
          variant={"Outline"}
          className="md:hidden cursor-pointer"
          onClick={handleFlagResource}
        />
      </div>
      <h3 className="text-sm font-semibold text-white text-center ">Flag</h3>
    </div>
  );
};

export const ShareButton: React.FC<{
  title: string;
  type?: "artwork" | "collectible";
}> = ({ title, type = "artwork" }) => {
  const handleShare = () => {
    if (navigator.share) {
      navigator
        .share({
          title,
          text: `Check out this ${type}: ${title}`,
          url: window.location.href, // or a specific artwork URL
        })
        .then(() => console.log("Shared successfully!"))
        .catch((error) => console.error("Error sharing:", error));
    } else {
      alert("Sharing is not supported in this browser.");
    }
  };

  return (
    <div className="flex flex-col items-center space-y-3">
      <div className=" w-12 h-12 bg-white text-black flex items-center justify-center ">
        <LoginCurve
          variant="Outline"
          className="hidden md:block cursor-pointer"
          onClick={handleShare}
        />
        <LoginCurve
          variant="Outline"
          className="md:hidden cursor-pointer"
          onClick={handleShare}
        />
      </div>
      <h3 className="text-sm font-semibold text-white text-center ">Share</h3>
    </div>
  );
};

export const FilterButton = () => {
  const router = useRouter();

  const handleOpenFilter = () => {
    const currentParams = new URLSearchParams(window.location.search);

    currentParams.set("openModal", "1");

    const newUrl = `${window.location.pathname}?${currentParams.toString()}`;

    router.push(newUrl);
  };

  return (
    <div
      onClick={handleOpenFilter}
      className="flex cursor-pointer lg:hidden space-x-2 items-center "
    >
      <Icon icon="bx:filter" className="!text-xl text-black" />
      <h3 className="text-[14px] font-bold ">Filters</h3>
    </div>
  );
};

export const DeleteButton: React.FC<{
  id: string;
}> = ({ id }) => {
  const router = useRouter();

  const handleLikeResource = async (
    e: React.MouseEvent<SVGElement, MouseEvent>
  ) => {
    e.stopPropagation();
    e.preventDefault();
    await deleteExhibitionArtWork(id);
    toast.success("Artwork Deleted Successfully");
    router.refresh();
  };

  return (
    <div className="flex text-red-500">
      <Trash
        size={24}
        variant={"Bold"}
        className="hidden md:block cursor-pointer"
        onClick={handleLikeResource}
      />
      <Trash
        size={20}
        variant={"Bold"}
        className="md:hidden cursor-pointer"
        onClick={handleLikeResource}
      />
    </div>
  );
};
