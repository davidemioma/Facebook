import Head from "next/head";
import { Figtree } from "next/font/google";

const font = Figtree({ subsets: ["latin"] });

export default function Home() {
  return (
    <div className={`${font.className}`}>
      <Head>
        <title>Facebook-Clone</title>

        <link rel="icon" href="/assets/facebook-icon.webp" />
      </Head>
      Home
    </div>
  );
}
