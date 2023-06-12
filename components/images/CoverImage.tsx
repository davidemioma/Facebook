import React, { useRef, useState } from "react";
import Image from "next/image";
import { toast } from "react-hot-toast";
import { RiEarthLine } from "react-icons/ri";
import { BsFillCameraFill } from "react-icons/bs";
import useAccountById from "@/hooks/useAccountById";
import useCurrentUser from "@/hooks/useCurrentUser";
import { updateCoverUrl, uploadImage } from "../../utils/functions";

interface Props {
  accountId: string;
}

const CoverImage = ({ accountId }: Props) => {
  const currentUser = useCurrentUser();

  const account = useAccountById(accountId);

  const [loading, setLoading] = useState(false);

  const filePickerRef = useRef<HTMLInputElement>(null);

  const [seletedFile, setSelectedFile] = useState<any>(null);

  const uploadImageHandler = (e: React.FormEvent) => {
    uploadImage(e, setSelectedFile);
  };

  const updateCoverImage = () => {
    setLoading(true);

    updateCoverUrl(currentUser?.id!, seletedFile)
      .then(() => {
        setSelectedFile(null);

        toast.success("cover image updated");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="relative h-40 w-full overflow-hidden rounded-b-lg bg-white bg-gradient-to-b from-gray-50 to-gray-300 sm:h-56 md:h-64 lg:h-96 lg:rounded-b-xl">
      {account?.coverUrl && (
        <Image className="object-cover" fill src={account?.coverUrl} alt="" />
      )}

      {seletedFile && (
        <Image className="object-cover" fill src={seletedFile} alt="" />
      )}

      {seletedFile && (
        <div className="absolute top-0 z-30 flex w-full flex-col items-center space-y-2 bg-black/50 px-4 py-2 text-white sm:flex-row sm:justify-between sm:space-y-0">
          <div className="flex items-center space-x-1.5">
            <RiEarthLine />

            <p className="text-sm">Your cover photo is public.</p>
          </div>

          <div className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => setSelectedFile(null)}
              className="rounded-lg bg-black/30 px-6 py-1.5"
            >
              Cancel
            </button>

            <button
              className="rounded-lg bg-blue-500 px-6 py-1.5"
              onClick={updateCoverImage}
              disabled={loading}
            >
              {loading ? "Saving..." : "Save changes"}
            </button>
          </div>
        </div>
      )}

      <input
        ref={filePickerRef}
        type="file"
        accept="image/*"
        hidden
        onChange={uploadImageHandler}
      />

      {account?.id === currentUser?.id && (
        <button
          className="absolute bottom-4 right-4 z-20 flex items-center space-x-2 rounded bg-white px-3 py-1 transition-transform duration-300 hover:scale-105"
          onClick={() => !seletedFile && filePickerRef?.current?.click()}
        >
          <BsFillCameraFill size={20} />

          <p className="hidden sm:inline">Add cover photo</p>
        </button>
      )}
    </div>
  );
};

export default CoverImage;
