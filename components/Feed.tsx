import React from "react";
import Box from "./Box";
import Post from "./post/Post";
import EmptyPosts from "./EmptyPosts";
import usePosts from "@/hooks/usePosts";

const Feed = () => {
  const posts = usePosts();

  return (
    <div className="flex flex-1 justify-center overflow-hidden">
      <div className="w-full max-w-xl">
        <Box />

        {posts.length > 0 ? (
          <div className="mt-5 space-y-5">
            {posts?.map((post) => (
              <Post key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <EmptyPosts />
        )}
      </div>
    </div>
  );
};

export default Feed;
