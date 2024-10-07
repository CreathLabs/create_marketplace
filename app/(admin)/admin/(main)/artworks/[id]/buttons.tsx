"use client";
import { approveArtwork, rejectDeleteArtwork } from "@/actions";
import Button from "@/components/Button";
import { handleError, parseErrors } from "@/lib/helpers";
import { Art } from "@prisma/client";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-toastify";

const Buttons = ({ artwork }: { artwork: Art }) => {
  const [approving, setApproving] = useState(false);
  const [rejecting, setRejecting] = useState(false);

  const router = useRouter();

  const approve = async () => {
    setApproving(true);

    try {
      await approveArtwork(artwork.id);
      toast.success("Artwork approved Successful");
      router.push("/admin/artworks");
    } catch (error) {
      const err = parseErrors(error);
      handleError(err.errors);
    } finally {
      setApproving(false);
    }
  };
  const reject = async () => {
    setRejecting(true);
    try {
      await rejectDeleteArtwork(artwork.id);
      toast.success("Artwork rejected Successful");
      router.push("/admin/artworks");
    } catch (error) {
      const err = parseErrors(error);
      handleError(err.errors);
    } finally {
      setRejecting(false);
    }
  };

  return (
    <>
      {artwork.is_approved ? (
        <div className="grid grid-cols-2 items-center gap-x-10 ">
          <Button
            text="Delete Artwork"
            action={reject}
            loading={rejecting}
            className="py-4 rounded-full border border-black bg-black text-white w-full"
          />
        </div>
      ) : (
        <div className="flex justify-between items-center gap-x-10 ">
          <Button
            text="Approve Artwork"
            action={approve}
            loading={approving}
            className="py-4 rounded-full border border-black bg-black text-white w-full"
          />
          <Button
            text="Reject Artwork"
            action={reject}
            loading={rejecting}
            className="py-4 rounded-full border border-black bg-white text-black w-full"
          />
        </div>
      )}
    </>
  );
};

export default Buttons;
