import React, { useRef, useState } from "react";
import Image from "next/image";
import { Fileprops } from "@/types";
import { toast } from "react-hot-toast";
import { MdAddToPhotos } from "react-icons/md";
import usePostModal from "@/hooks/usePostModal";
import useCurrentUser from "@/hooks/useCurrentUser";
import { readAllFiles, uploadPost } from "../../utils/functions";
import { XIcon, EmojiHappyIcon } from "@heroicons/react/outline";

const PostModal = () => {
  const postModal = usePostModal();

  const currentUser = useCurrentUser();

  const [caption, setCaption] = useState("");

  const [useImage, setUseImage] = useState(true);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const [loading, setIsLoading] = useState(false);

  const [seletedFiles, setSeletedFiles] = useState<Fileprops[] | any>([]);

  const closePostModal = () => {
    postModal.onClose();

    setUseImage(true);
  };

  const uploadFiles = (e: any) => {
    let AllFiles: any = [];

    [...e.target?.files].map((file) => AllFiles.push(file));

    readAllFiles(AllFiles)
      .then((result) => {
        setSeletedFiles(result);
      })
      .catch((err) => {
        alert(err);
      });
  };

  const uploadPostHandler = async () => {
    setIsLoading(false);

    try {
      await uploadPost(
        {
          userId: currentUser?.id!,
          caption,
        },
        seletedFiles
      );

      toast.success("Post created");

      closePostModal();

      setSeletedFiles([]);

      setCaption("");
    } catch (err) {
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (!postModal.isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 z-40 bg-black/70"
        onClick={closePostModal}
      />

      <div className="absolute left-1/2 top-1/2 z-50 mx-auto w-11/12 max-w-lg -translate-x-1/2 -translate-y-1/2 rounded-xl bg-white shadow-xl">
        <div className="relative flex h-14 items-center border-b">
          <h1 className="absolute left-1/2 -translate-x-1/2 text-center text-lg font-semibold">
            Create post
          </h1>

          <button
            className="absolute right-4 flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200"
            onClick={closePostModal}
          >
            <XIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex items-center space-x-2 px-4 py-2">
          <div className="relative h-8 w-8 overflow-hidden rounded-full">
            <Image
              className="object-cover"
              src={currentUser?.photoUrl || "/assets/no-profile.jpeg"}
              fill
              alt=""
            />
          </div>

          <p className="text-sm font-medium capitalize sm:text-base">
            {currentUser?.displayName}
          </p>
        </div>

        <div className="flex w-full items-center space-x-3 px-4 pb-5">
          <input
            className="flex-1 text-sm focus:outline-none md:text-base"
            value={caption}
            type="text"
            placeholder={`What's on your mind, ${currentUser?.firstname}?`}
            onChange={(e) => setCaption(e.target.value)}
          />

          <EmojiHappyIcon className="h-5 text-gray-400 md:h-6" />
        </div>

        {useImage && (
          <div className="mx-4 h-48 rounded-lg border border-gray-300 p-2">
            {seletedFiles?.length > 0 ? (
              <div className="h-full w-full overflow-hidden rounded-lg">
                {seletedFiles?.[0]?.type.includes("video") ? (
                  <video
                    className="h-full w-full object-cover"
                    src={seletedFiles?.[0]?.dataUrl}
                    loop
                    controls
                  />
                ) : (
                  <img
                    className="h-full w-full object-cover"
                    src={seletedFiles?.[0]?.dataUrl}
                    alt=""
                  />
                )}
              </div>
            ) : (
              <div className="relative h-full w-full rounded-lg bg-gray-100 hover:bg-gray-200">
                <button
                  className="absolute right-2 top-2 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-white hover:bg-gray-200"
                  onClick={() => setUseImage(false)}
                >
                  <XIcon className="h-5" />
                </button>

                <div
                  onClick={() => filePickerRef?.current?.click()}
                  className="absolute left-0 top-0 z-10 h-full w-full cursor-pointer"
                />

                <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center text-center">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
                    <MdAddToPhotos size={20} />
                  </div>

                  <h1 className="whitespace-nowrap text-lg font-medium">
                    Add photos/videos
                  </h1>

                  <p className="text-xs font-light">or drag and drop</p>
                </div>

                <input
                  ref={filePickerRef}
                  type="file"
                  accept="image/*, video/*"
                  multiple
                  hidden
                  onChange={uploadFiles}
                />
              </div>
            )}
          </div>
        )}

        <button
          className="mx-4 my-5 w-[calc(100%-32px)] rounded-lg bg-blue-500 py-1.5 text-white transition disabled:cursor-not-allowed disabled:opacity-75"
          disabled={loading || !caption.trim()}
          onClick={uploadPostHandler}
        >
          post
        </button>
      </div>
    </>
  );
};

export default PostModal;
