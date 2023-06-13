import Head from "next/head";
import { Figtree } from "next/font/google";

const font = Figtree({ subsets: ["latin"] });

export default function Conversation() {
  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Messenger</title>

        <link rel="icon" href="/assets/messenger.png" />
      </Head>

      <div className="">Conversation</div>
    </div>
  );
}
