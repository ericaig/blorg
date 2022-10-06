import React from "react";
import Head from "next/head";
import { signOut, useSession } from "next-auth/react";
import Link from "next/link";
import { Routes } from "../lib-client";

export default function Home() {
  const { data: session, status } = useSession();

  console.log({ session, status });

  return (
    <>
      <Head>
        <title>Home page</title>
      </Head>
      {status === "authenticated" && (
        <>
          <h4>Hello {session.user.name}</h4>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      )}

      {status !== "authenticated" && (
        <>
          {"Not signed in :("}
          <Link href={Routes.SITE.LOGIN}>Sign in</Link>
        </>
      )}
    </>
  );
}
