import React, { useState } from "react";
import Avatar from "../Avatar";
import Moment from "react-moment";
import Carousel from "./Carousel";
import Comments from "./Comments";
import { PostProps } from "@/types";
import useLike from "@/hooks/useLike";
import { numberFormatter } from "@/utils/functions";
import useAccountById from "@/hooks/useAccountById";
import useFilesByPostId from "@/hooks/useFilesByPostId";
import {
  ThumbUpIcon as ThumbsUpSolid,
  HeartIcon,
} from "@heroicons/react/solid";
import useCommentByPostId from "@/hooks/useCommentByPostId";
import { ThumbUpIcon, ChatAlt2Icon } from "@heroicons/react/outline";

interface Props {
  post: PostProps;
}

const Post = ({ post }: Props) => {
  const account = useAccountById(post.userId);

  const files = useFilesByPostId(post.id);

  const { comments } = useCommentByPostId(post.id);

  const { likes, hasLiked, likePost } = useLike(post.id);

  const [showCommentForm, setShowCommentForm] = useState(true);

  return (
    <div className="flex flex-col gap-3 rounded-lg bg-white py-2">
      <div className="flex items-center gap-3 px-4">
        <Avatar user={account!} />

        <div>
          <p className="text-sm font-medium capitalize sm:text-base">
            {account?.displayName}
          </p>

          <p className="text-xs tracking-wide text-gray-500">
            <Moment
              fromNow
              date={new Date(post.timestamp.seconds * 1000).toUTCString()}
            />
          </p>
        </div>
      </div>

      <p className="line-clamp-2 px-4 text-sm font-light leading-6">
        {post.caption}
      </p>

      {files.length > 0 && <Carousel files={files} />}

      <div className="flex items-center justify-between font-light">
        {likes.length > 0 && (
          <div className="flex items-center space-x-1.5 py-2 pl-4">
            <div className="flex items-center">
              <span className="icon bg-blue-500 ">
                <ThumbsUpSolid className="h-3" />
              </span>

              <span className="icon -ml-1 bg-red-500">
                <HeartIcon className="h-3" />
              </span>
            </div>

            <p>{numberFormatter(likes.length)}</p>
          </div>
        )}

        {comments.length > 0 && (
          <p className="py-2 pr-4">
            {numberFormatter(comments.length)} comment
            {comments.length > 1 && "s"}
          </p>
        )}
      </div>

      <div className="mx-4 grid grid-cols-2 gap-2 border-b border-t border-gray-300 py-2">
        <button
          className="flex items-center justify-center space-x-2 rounded hover:bg-gray-100"
          onClick={likePost}
        >
          {hasLiked ? (
            <ThumbsUpSolid className="h-6 text-blue-500" />
          ) : (
            <ThumbUpIcon className="h-6" />
          )}

          <p className="text-sm sm:text-base">Like</p>
        </button>

        <button
          onClick={() => setShowCommentForm((prev) => !prev)}
          className="flex items-center justify-center space-x-2 rounded hover:bg-gray-100"
        >
          <ChatAlt2Icon className="h-6" />

          <p className="text-sm sm:text-base">Comment</p>
        </button>
      </div>

      <Comments
        postId={post.id}
        showCommentForm={showCommentForm}
        comments={comments}
      />
    </div>
  );
};

export default Post;
