"use client";

import { Icon } from "@iconify/react";

interface Props {
  instagram?: string | null;
}

const SocialShare = ({ instagram }: Props) => {
  const openSocial = (network: string) => {
    const currentUrl = window.location.href;

    if (network === "instagram") {
        if (!instagram){
            window.open(`https://www.instagram.com`, "_blank");
        }
        else{
            window.open(`https://www.instagram.com/${instagram}`, "_blank");
        }
    } else if (network === "twitter") {
      window.open(`https://x.com/intent/tweet?url=${currentUrl}`, "_blank");
    } else if (network === "linkedin") {
      window.open(`https://www.linkedin.com/shareArticle?mini=true&url=${currentUrl}`, "_blank");
    }
  };

  return (
    <div className="flex flex-row w-[100%] mt-8 items-start justify-between">
      <Icon
        icon="ant-design:instagram-filled"
        className="text-black text-2xl lg:text-[26px] cursor-pointer"
        onClick={() => openSocial("instagram")}
      />
      <Icon
        icon="ant-design:twitter-outlined"
        className="text-black text-2xl lg:text-[26px] cursor-pointer"
        onClick={() => openSocial("twitter")}
      />
      <Icon
        icon="dashicons:linkedin"
        className="text-black text-2xl lg:text-[26px] cursor-pointer"
        onClick={() => openSocial("linkedin")}
      />
    </div>
  );
};

export default SocialShare;
