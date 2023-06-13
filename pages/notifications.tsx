import Head from "next/head";
import Image from "next/image";
import { Figtree } from "next/font/google";
import useNotifications from "@/hooks/useNotifications";
import Notification from "@/components/Notification";

const font = Figtree({ subsets: ["latin"] });

export default function Notifications() {
  const { notifications } = useNotifications();

  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Notifications</title>

        <link rel="icon" href="/assets/facebook-icon.webp" />
      </Head>

      <div className="h-[calc(100vh-48px)] w-full overflow-y-auto p-5">
        <div className="mx-auto h-full w-full max-w-xl rounded-lg bg-white px-3 py-4">
          <h1 className="mb-5 text-xl font-bold">Notifications</h1>

          {notifications.length > 0 ? (
            <div className="flex flex-col gap-3">
              {notifications.map((notification) => (
                <Notification
                  key={notification.id}
                  notification={notification}
                />
              ))}
            </div>
          ) : (
            <div className="flex h-full items-center justify-center">
              <div className="flex flex-col items-center">
                <Image
                  className="object-contain"
                  src="/assets/empty.svg"
                  width={150}
                  height={150}
                  alt=""
                />

                <p className="text-lg font-bold">You have no notifications</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
