import Head from "next/head";
import { Figtree } from "next/font/google";

const font = Figtree({ subsets: ["latin"] });

export default function Home() {
  return <div className={`${font.className}`}>Home</div>;
}
