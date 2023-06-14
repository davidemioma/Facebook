import React, { useState } from "react";
import Head from "next/head";
import Image from "next/image";
import Input from "./Input/Input";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useRouter } from "next/router";
import { toast } from "react-hot-toast";
import { auth, db } from "@/libs/firebase";
import { doc, setDoc, updateDoc } from "@firebase/firestore";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";

enum ACTIONS {
  LOGIN = 0,
  SIGNUP = 1,
}

const Login = () => {
  const router = useRouter();

  const [action, setAction] = useState(ACTIONS.LOGIN);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: "",
      password: "",
      firstname: "",
      surname: "",
    },
  });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    setLoading(true);

    if (action === ACTIONS.LOGIN) {
      signInWithEmailAndPassword(auth, data.email, data.password)
        .then((res) => {
          updateDoc(doc(db, "users", res?.user?.uid), {
            isActive: true,
          });

          toast.success("Login successful");

          router.push("/");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        })
        .finally(() => setLoading(false));
    } else {
      createUserWithEmailAndPassword(auth, data.email, data.password)
        .then((res) => {
          setDoc(
            doc(db, "users", res?.user?.uid),
            {
              isActive: true,
              firstname: data.firstname,
              surname: data.surname,
              mail: res?.user?.email,
              photoUrl: res?.user?.photoURL || null,
              displayName: `${data.firstname} ${data.surname}`,
            },
            { merge: true }
          );

          toast.success("Account created");

          router.push("/");
        })
        .catch((err) => {
          toast.error("Something went wrong");
        })
        .finally(() => setLoading(false));
    }
  };

  let content = (
    <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
      <Input
        id="email"
        type="email"
        placeholder="Email"
        disabled={loading}
        required
        register={register}
        errors={errors}
      />

      <Input
        id="password"
        type="password"
        placeholder="Password"
        disabled={loading}
        required
        register={register}
        errors={errors}
      />

      <button
        className="rounded bg-[#4267B2] px-4 py-2.5 text-white transition disabled:cursor-not-allowed disabled:opacity-75"
        type="submit"
        disabled={loading}
      >
        Login
      </button>

      <hr />

      <button
        className="mx-auto w-8/12 rounded bg-[#42b72a] px-4 py-2 font-bold text-white"
        onClick={() => setAction(ACTIONS.SIGNUP)}
        type="button"
      >
        Create New Account
      </button>
    </form>
  );

  if (action === ACTIONS.SIGNUP) {
    content = (
      <div className="w-full">
        <h1 className="text-center text-2xl font-semibold">
          Create a new account
        </h1>

        <p className="mb-3 text-center text-sm text-gray-500">
          It&apos;s quick and easy
        </p>

        <hr />

        <form
          className="mt-4 flex flex-col gap-4"
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className="flex items-center gap-4">
            <Input
              id="firstname"
              type="text"
              placeholder="First name"
              disabled={loading}
              required
              register={register}
              errors={errors}
            />

            <Input
              id="surname"
              type="text"
              placeholder="Surname"
              disabled={loading}
              required
              register={register}
              errors={errors}
            />
          </div>

          <Input
            id="email"
            type="email"
            placeholder="Email"
            disabled={loading}
            required
            register={register}
            errors={errors}
          />

          <Input
            id="password"
            type="password"
            placeholder="Password"
            disabled={loading}
            required
            register={register}
            errors={errors}
          />

          <button
            className="mx-auto w-8/12 rounded bg-[#42b72a] px-4 py-2 font-bold text-white"
            type="submit"
          >
            Sign Up
          </button>

          <button
            className="font-semibold text-blue-500 transition hover:underline"
            onClick={() => setAction(ACTIONS.LOGIN)}
          >
            Already have an account?
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen items-center justify-center overflow-hidden bg-gray-200">
      <Head>
        <title>Facebook - log in or sign up</title>

        <link rel="icon" href="/assets/facebook-icon.webp" />
      </Head>

      <main className="flex w-full flex-col items-center gap-4">
        <div className="relative h-16 w-[200px]">
          <Image
            className="object-cover"
            src="/assets/facebook-logo.svg"
            fill
            alt="Icon"
          />
        </div>

        <div className="w-full max-w-sm rounded-lg bg-white p-4 shadow-md">
          {content}
        </div>
      </main>
    </div>
  );
};

export default Login;
