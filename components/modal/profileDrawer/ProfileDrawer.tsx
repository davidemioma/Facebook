import React, { useMemo } from "react";
import { format } from "date-fns";
import Avatar from "@/components/Avatar";
import { ConversationProps } from "@/types";
import { IoTrash } from "react-icons/io5";
import useOtherUser from "@/hooks/useOtherUser";
import ProfileDrawerModal from "./ProfileDrawerModal";
import useProfileDrawer from "@/hooks/useProfileDrawer";
import useAccountById from "@/hooks/useAccountById";
import useConfirmModal from "@/hooks/useConfirmModal";

interface Props {
  conversation: ConversationProps | null;
}

const ProfileDrawer = ({ conversation }: Props) => {
  const profileDrawer = useProfileDrawer();

  const confirmModal = useConfirmModal();

  const otherUserId = useOtherUser(conversation!);

  const account = useAccountById(`${otherUserId}`);

  const status = useMemo(() => {
    return account?.isActive ? "Active" : "Offline";
  }, [account?.isActive]);

  const joinedDate = useMemo(() => {
    if (!conversation?.timestamp?.seconds) return "";

    return format(new Date(conversation?.timestamp?.seconds * 1000), "PP");
  }, [conversation?.timestamp?.seconds]);

  return (
    <ProfileDrawerModal
      isOpen={profileDrawer.isOpen}
      onClose={() => profileDrawer.onClose()}
    >
      <div className="relative mt-6 flex-1">
        <div className="flex flex-col items-center">
          <div className="mb-2">
            <Avatar user={account!} />
          </div>

          <p>{account?.displayName}</p>

          <p className="text-sm text-gray-500">{status}</p>

          <button
            onClick={() => {
              confirmModal.onOpen();

              profileDrawer.onClose();
            }}
            className="mt-8 flex flex-col items-center gap-3 transition hover:opacity-75"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-100">
              <IoTrash size={20} />
            </div>

            <p className="text-sm font-light text-neutral-600">Delete</p>
          </button>
        </div>

        <div className="w-full py-5 sm:px-0">
          <dl className="space-y-8 px-4 sm:space-y-6 sm:px-6">
            <div className="space-y-1 text-sm">
              <dt className="font-medium text-gray-500 sm:w-40">Email</dt>

              <dd className="text-gray-900 sm:col-span-2">{account?.mail}</dd>
            </div>

            <hr />

            <div className="space-y-1 text-sm">
              <dt className="font-medium text-gray-500 sm:w-40">Joined</dt>

              <dd className="text-gray-900 sm:col-span-2">
                <time dateTime={joinedDate}>{joinedDate}</time>
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </ProfileDrawerModal>
  );
};

export default ProfileDrawer;
