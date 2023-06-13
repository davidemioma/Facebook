import React from "react";
import Avatar from "./Avatar";
import Moment from "react-moment";
import { useRouter } from "next/router";
import { NotificationProps } from "@/types";
import useAccountById from "@/hooks/useAccountById";
import useNotifications from "@/hooks/useNotifications";

interface Props {
  notification: NotificationProps;
}

const Notification = ({ notification }: Props) => {
  const router = useRouter();

  const { viewNotification } = useNotifications();

  const account = useAccountById(notification.requestId);

  const onClickHandler = () => {
    if (!account?.id) return;

    viewNotification(notification?.id).then(() => {
      if (notification.task === "friend request") {
        router.push("/requests");
      }
    });
  };

  let content = (
    <div
      className="flex cursor-pointer items-center gap-2 rounded-lg p-2 hover:bg-gray-100"
      onClick={onClickHandler}
    >
      <Avatar user={account!} small />

      <div className="flex flex-1 flex-col">
        <p className="flex-1 text-sm">
          <span className="font-bold capitalize"> {account?.displayName}</span>{" "}
          sent you a friend request
        </p>

        <p className="whitespace-nowrap text-xs text-gray-500">
          <Moment
            fromNow
            date={new Date(notification.timstamp.seconds * 1000).toUTCString()}
          />
        </p>
      </div>

      {!notification.seen && (
        <span className="h-3 w-3 rounded-full bg-blue-500" />
      )}
    </div>
  );

  return <>{content}</>;
};

export default Notification;
