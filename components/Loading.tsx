import React from "react";
import Head from "next/head";
import Image from "next/image";

const Loading = () => {
  return (
    <div className="relative h-screen w-screen animate-pulse overflow-hidden">
      <Head>
        <title>Facebook</title>

        <link rel="icon" href="/assets/facebook-icon.webp" />
      </Head>

      <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
        <div className="relative h-32 w-32">
          <Image
            className="object-cover"
            src="/assets/facebook-loader.webp"
            fill
            alt=""
          />
        </div>
      </div>

      <p className="absolute bottom-24 left-1/2 -translate-x-1/2 font-semibold">
        From
      </p>

      <div className="absolute bottom-5 left-1/2 -translate-x-1/2">
        <div className="relative h-24 w-24">
          <Image
            className="object-contain"
            src="/assets/meta.png"
            fill
            alt=""
          />
        </div>
      </div>
    </div>
  );
};

export default Loading;
