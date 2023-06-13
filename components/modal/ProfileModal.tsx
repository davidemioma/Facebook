import React from "react";
import Link from "next/link";
import Avatar from "../Avatar";
import { auth } from "@/libs/firebase";
import { signOut } from "@firebase/auth";
import { IoMdLogOut } from "react-icons/io";
import useCurrentUser from "@/hooks/useCurrentUser";
import useProfileModal from "@/hooks/useProfileModal";

const ProfileModal = () => {
  const currentUser = useCurrentUser();

  const profileModal = useProfileModal();

  if (!profileModal.isOpen) return null;

  return (
    <div className="fixed right-5 top-12 z-20 hidden h-[35vh] w-[75vw] max-w-sm rounded-lg bg-white shadow-md md:block">
      <div className="relative h-full w-full p-4">
        <div className="p-3 shadow-md">
          <div className="mb-2 flex items-center gap-3">
            <Avatar user={currentUser!} />

            <p className="font-semibold capitalize">
              {currentUser?.displayName}
            </p>
          </div>

          <hr />

          <Link
            onClick={() => profileModal.onClose()}
            href={`/profile/${currentUser?.id}`}
          >
            <p className="mt-2 cursor-pointer text-sm font-semibold text-blue-500">
              View Profile
            </p>
          </Link>
        </div>

        <div className="mx-1 my-5">
          <button
            className="flex w-full items-center gap-3 rounded-lg p-2 hover:bg-gray-100"
            onClick={() => signOut(auth)}
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200">
              <IoMdLogOut className="h-6" />
            </div>

            <p>Log Out</p>
          </button>
        </div>

        <p className="absolute bottom-3 text-sm text-gray-400">
          <span className="link">Privacy</span> .{" "}
          <span className="link">Terms</span> .{" "}
          <span className="link">Advertising</span> .{" "}
          <span className="link">Ad choices</span> .{" "}
          <span className="link">Cookies</span> .{" "}
          <span className="link">More</span> .{" "}
          <span className="link">Meta</span> © 2022
        </p>
      </div>
    </div>
  );
};

export default ProfileModal;
