import { useState } from "react";
import Link from "next/link";
import Head from "next/head";
import Box from "@/components/Box";
import { useRouter } from "next/router";
import { Figtree } from "next/font/google";
import Post from "@/components/post/Post";
import useAccountById from "@/hooks/useAccountById";
import useCurrentUser from "@/hooks/useCurrentUser";
import SelectBtn from "@/components/Input/SelectBtn";
import CoverImage from "@/components/images/CoverImage";
import ProfileImages from "@/components/images/ProfileImages";
import usePostsByUserId from "@/hooks/usePostsByUserId";

const font = Figtree({ subsets: ["latin"] });

enum ACTIONS {
  POSTS = 0,
  FRIENDS = 1,
}

export default function Profile() {
  const router = useRouter();

  const { id } = router.query;

  const currentUser = useCurrentUser();

  const account = useAccountById(id as string);

  const posts = usePostsByUserId(id as string);

  const [action, setAction] = useState(ACTIONS.POSTS);

  let content = (
    <div className="mx-auto w-full max-w-xl px-3 sm:px-0">
      {currentUser?.id === account?.id && <Box />}

      <div className="mb-10 mt-5 space-y-5">
        {posts.map((post, i) => (
          <Post key={i} post={post} />
        ))}
      </div>
    </div>
  );

  if (action === ACTIONS.FRIENDS) {
    content = (
      <div className="w-full p-4">
        <div className="w-full rounded-lg bg-white p-4">
          <div className="flex items-center justify-between space-x-2">
            <h2 className="text-lg font-bold">Friends</h2>

            {currentUser?.id === account?.id && (
              <Link href="/requests">
                <div className="cursor-pointer whitespace-nowrap rounded-lg px-3 py-1 text-blue-500 hover:bg-gray-100">
                  Friend Requests
                </div>
              </Link>
            )}
          </div>

          <div className="scrollbar-hide h-60 overflow-x-hidden overflow-y-scroll"></div>
        </div>
      </div>
    );
  }

  return (
    <div className={`${font.className}`}>
      <Head>
        <title>{`${account?.firstname} ${account?.surname}`}</title>

        <link rel="icon" href="/assets/facebook-icon.webp" />
      </Head>

      <div className="w-full">
        <CoverImage accountId={id as string} />

        <ProfileImages accountId={id as string} />

        <div className="flex items-center bg-white px-4 pt-1">
          <SelectBtn
            label="Posts"
            active={action === ACTIONS.POSTS}
            onClick={() => setAction(ACTIONS.POSTS)}
          />

          <SelectBtn
            label="Friends"
            active={action === ACTIONS.FRIENDS}
            onClick={() => setAction(ACTIONS.FRIENDS)}
          />
        </div>
      </div>

      <div className="py-7">{content}</div>
    </div>
  );
}
