import React from "react";
import Avatar from "./Avatar";
import { TiVideo } from "react-icons/ti";
import { BiHappy } from "react-icons/bi";
import { IoMdPhotos } from "react-icons/io";
import usePostModal from "@/hooks/usePostModal";
import useCurrentUser from "@/hooks/useCurrentUser";

const Box = () => {
  const postModal = usePostModal();

  const currentUser = useCurrentUser();

  const openPostModal = () => {
    postModal.onOpen();
  };

  return (
    <div className="rounded-xl bg-white px-3 py-2">
      <div className="flex items-center gap-3 border-b pb-2">
        <Avatar user={currentUser!} />

        <button
          className="flex-1 rounded-full bg-gray-100 px-4 py-1.5 text-left text-xs text-gray-900/80 sm:text-sm"
          onClick={openPostModal}
        >
          What&apos;s on your mind
          <span className="hidden capitalize sm:inline">
            , {currentUser?.firstname}
          </span>
          ?
        </button>
      </div>

      <div className="grid grid-cols-2 pt-2 sm:grid-cols-3 sm:justify-items-center">
        <button
          className="flex w-full items-center space-x-2 rounded-lg px-6 py-2 hover:bg-gray-100"
          onClick={openPostModal}
        >
          <TiVideo size={20} className="flex-shrink-0 text-red-500" />

          <p className="whitespace-nowrap text-xs sm:text-sm">Live video</p>
        </button>

        <button
          className="flex w-full items-center space-x-2 rounded-lg px-6 py-2 hover:bg-gray-100"
          onClick={openPostModal}
        >
          <IoMdPhotos size={20} className="flex-shrink-0 text-green-500" />

          <p className="whitespace-nowrap text-xs sm:text-sm">Photo/video</p>
        </button>

        <button
          className="hidden w-full items-center space-x-2 rounded-lg px-6 py-2 hover:bg-gray-100 sm:inline-flex"
          onClick={openPostModal}
        >
          <BiHappy size={20} className="flex-shrink-0 text-yellow-500" />

          <p className="whitespace-nowrap text-xs sm:text-sm">
            Feeling/activity
          </p>
        </button>
      </div>
    </div>
  );
};

export default Box;
