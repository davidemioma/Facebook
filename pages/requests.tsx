import Head from "next/head";
import Image from "next/image";
import { Figtree } from "next/font/google";
import Request from "@/components/Request";
import useFriendRequests from "@/hooks/useFriendRequests";

const font = Figtree({ subsets: ["latin"] });

export default function Requests() {
  const { requests } = useFriendRequests();

  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Friend requests</title>

        <link rel="icon" href="/assets/facebook-icon.webp" />
      </Head>

      <div className="h-full w-full p-5">
        <div className="mx-auto h-full w-full max-w-4xl overflow-y-auto">
          <h1 className="text-xl font-bold">Friend Requests</h1>

          {requests.length > 0 ? (
            <div className=" mt-4 grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {requests.map((request) => (
                <Request key={request.id} request={request} />
              ))}
            </div>
          ) : (
            <div className="flex h-[70vh] items-center justify-center">
              <div className="flex flex-col items-center">
                <Image
                  className="object-cover"
                  src="/assets/empty.svg"
                  width={150}
                  height={150}
                  alt=""
                />

                <p className="text-lg font-bold">You have no friend request</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
