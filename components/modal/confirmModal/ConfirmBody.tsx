import React, { useCallback, useState } from "react";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import ConfirmModal from "./ConfirmModal";
import { FiAlertTriangle } from "react-icons/fi";
import useConfirmModal from "@/hooks/useConfirmModal";
import useDeleteConversation from "@/hooks/useDeleteConversation";

const ConfirmBody = () => {
  const router = useRouter();

  const { conversationId } = router.query;

  const confirmModal = useConfirmModal();

  const [loading, setLoading] = useState(false);

  const deleteConversation = useDeleteConversation(conversationId as string);

  const onDelete = useCallback(() => {
    setLoading(true);

    deleteConversation()
      .then(() => {
        toast.success("Conversation deleted");

        confirmModal.onClose();

        router.push("/chats/conversations");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);
      });
  }, [conversationId, router, confirmModal]);

  return (
    <ConfirmModal
      isOpen={confirmModal.isOpen}
      onClose={() => confirmModal.onClose()}
    >
      <div className="flex gap-3">
        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:h-10 sm:w-10">
          <FiAlertTriangle className="h-6 w-6 text-red-600" />
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <h3 className="font-bold leading-6 text-gray-900">
            Delete Conversation
          </h3>

          <p className="text-gray-500">
            Are you sure you want to delete this conversation? This action
            cannot be undone.
          </p>
        </div>
      </div>

      <div className="mt-5 flex flex-row-reverse gap-3 sm:mt-4">
        <button
          className="rounded-md bg-rose-500 px-3 py-1.5 text-sm font-semibold text-white hover:bg-red-600  focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
          onClick={onDelete}
          disabled={loading}
        >
          Delete
        </button>

        <button
          className="rounded-md px-3 py-1.5 text-sm font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 "
          onClick={() => confirmModal.onClose()}
          disabled={loading}
        >
          Cancel
        </button>
      </div>
    </ConfirmModal>
  );
};

export default ConfirmBody;
