import React from "react";
import usePostModal from "@/hooks/usePostModal";

const EmptyPosts = () => {
  const postModal = usePostModal();

  return (
    <div className="mb-10 mt-5 rounded-lg bg-white p-4 text-center">
      <h2 className="text-xl font-medium">No more posts</h2>

      <p className="mb-2">Add a post on your feed</p>

      <button
        className="w-36 rounded-lg bg-blue-500 py-1 font-medium text-white"
        onClick={() => postModal.onOpen()}
      >
        Add Post
      </button>
    </div>
  );
};

export default EmptyPosts;
