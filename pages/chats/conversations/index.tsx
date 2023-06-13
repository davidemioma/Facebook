import Head from "next/head";
import { Figtree } from "next/font/google";
import EmptyState from "@/components/messenger/EmptyState";
import ConvoList from "@/components/messenger/convolist/ConvoList";

const font = Figtree({ subsets: ["latin"] });

export default function Conversations() {
  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Messenger</title>

        <link rel="icon" href="/assets/messenger.png" />
      </Head>

      <div className="h-screen w-full overflow-hidden">
        <ConvoList />

        <div className="ml-80 hidden h-full lg:block">
          <EmptyState />
        </div>
      </div>
    </div>
  );
}
