import React, { useState } from "react";
import Avatar from "../Avatar";
import { CommentProps } from "@/types";
import useCurrentUser from "@/hooks/useCurrentUser";
import { EmojiHappyIcon } from "@heroicons/react/outline";
import { toast } from "react-hot-toast";
import useCommentByPostId from "@/hooks/useCommentByPostId";
import Comment from "./Comment";

interface Props {
  postId: string;
  showCommentForm: boolean;
  comments: CommentProps[];
}

const Comments = ({ postId, showCommentForm, comments }: Props) => {
  const currentUser = useCurrentUser();

  const [text, setText] = useState("");

  const [loading, setLoading] = useState(false);

  const { addComment } = useCommentByPostId(postId);

  const addCommentHandler = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!text.trim()) return;

    setLoading(true);

    addComment(text)
      .then(() => {
        toast.success("Comment added");

        setText("");
      })
      .catch((err) => {
        toast.error("Something went wrong");
      })
      .finally(() => {
        setLoading(false);

        setText("");
      });
  };

  return (
    <>
      {comments.length > 0 && (
        <div className="scrollbar-hide max-h-60 space-y-2 overflow-x-hidden overflow-y-scroll px-4 py-2">
          {comments.map((comment) => (
            <Comment key={comment.id} comment={comment} />
          ))}
        </div>
      )}

      {showCommentForm && (
        <div className="flex items-center gap-2 px-4">
          <Avatar user={currentUser!} />

          <form
            className="flex flex-1 items-center space-x-3 rounded-full bg-gray-100 px-4 py-1.5"
            onSubmit={addCommentHandler}
          >
            <input
              className="flex-1 bg-transparent text-sm outline-none"
              value={text}
              type="text"
              disabled={loading}
              placeholder="Write a comment..."
              onChange={(e) => setText(e.target.value)}
            />

            <EmojiHappyIcon className="h-5" />
          </form>
        </div>
      )}
    </>
  );
};

export default Comments;
