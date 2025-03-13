"use client";

import Head from "next/head";
import Countries from "@/components/Countries/Countries";

import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

export default function Home() {
  return (
    <div className="min-h-screen">
      <Head>
        <title>REST Countries API</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 py-8">
        <QueryClientProvider client={queryClient}>
          <Countries />
        </QueryClientProvider>
      </main>
    </div>
  );
}
