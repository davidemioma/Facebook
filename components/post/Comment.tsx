import React from "react";
import Avatar from "../Avatar";
import Moment from "react-moment";
import { CommentProps } from "@/types";
import useAccountById from "@/hooks/useAccountById";

interface Props {
  comment: CommentProps;
}

const Comment = ({ comment }: Props) => {
  const account = useAccountById(comment.userId);

  return (
    <div className="flex items-center gap-x-2">
      <Avatar user={account!} small />

      <div className="flex-1 text-sm">
        <p className="font-semibold capitalize">{account?.displayName}</p>

        <p>{comment.comment}</p>
      </div>

      <p className="text-xs">
        <Moment
          fromNow
          date={new Date(comment.timestamp.seconds * 1000).toUTCString()}
        />
      </p>
    </div>
  );
};

export default Comment;
