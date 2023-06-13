import Head from "next/head";
import { Figtree } from "next/font/google";
import UserList from "@/components/messenger/userlist/UserList";
import EmptyState from "@/components/messenger/EmptyState";

const font = Figtree({ subsets: ["latin"] });

export default function Chat() {
  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Messenger</title>

        <link rel="icon" href="/assets/messenger.png" />
      </Head>

      <div className="h-screen w-full overflow-hidden">
        <UserList />

        <div className="ml-80 hidden h-full lg:block">
          <EmptyState />
        </div>
      </div>
    </div>
  );
}
