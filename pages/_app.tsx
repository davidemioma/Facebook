import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Toaster } from "react-hot-toast";
import { auth } from "@/libs/firebase";
import Login from "@/components/Login";
import Loading from "@/components/Loading";
import { useAuthState } from "react-firebase-hooks/auth";

export default function App({ Component, pageProps }: AppProps) {
  const [user, loading] = useAuthState(auth);

  if (loading) return <Loading />;

  if (!user)
    return (
      <>
        <Toaster />

        <Login />
      </>
    );

  return (
    <>
      <Toaster />

      <Component {...pageProps} />
    </>
  );
}
