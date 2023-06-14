import Head from "next/head";
import { Figtree } from "next/font/google";
import { useRouter } from "next/router";
import Header from "@/components/messenger/Header";
import Form from "@/components/messenger/Form";
import Body from "@/components/messenger/Body";
import useMessagesByConvoId from "@/hooks/useMessagesByConvoId";
import ConvoList from "@/components/messenger/convolist/ConvoList";
import useConversationById from "@/hooks/useConversationById";

const font = Figtree({ subsets: ["latin"] });

export default function Conversation() {
  const router = useRouter();

  const { conversationId } = router.query;

  const conversation = useConversationById(conversationId as string);

  const { messages } = useMessagesByConvoId(conversationId as string);

  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Messenger</title>

        <link rel="icon" href="/assets/messenger.png" />
      </Head>

      <div className="h-screen w-full overflow-hidden">
        <div className="hidden lg:block">
          <ConvoList />
        </div>

        <div className="h-full lg:pl-80">
          <div className="flex h-full flex-col">
            <Header conversation={conversation} />

            <Body
              conversationId={conversationId as string}
              messages={messages}
            />

            <Form conversationId={conversationId as string} />
          </div>
        </div>
      </div>
    </div>
  );
}
