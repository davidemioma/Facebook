import Head from "next/head";
import { Figtree } from "next/font/google";
import Feed from "@/components/Feed";
import Widgets from "@/components/Widgets";

const font = Figtree({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Facebook-Clone</title>

        <link rel="icon" href="/assets/facebook-icon.webp" />
      </Head>

      <div className="flex gap-5 p-5">
        <Feed />

        <Widgets />
      </div>
    </div>
  );
}
