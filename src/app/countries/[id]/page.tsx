"use client";

import React from "react";
import { useParams } from "next/navigation";
import Country from "@/components/Country/Country";

const CountryPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="h-screen flex flex-col overflow-hidden container mx-auto p-4 pt-6">
      <Country id={id} />
    </main>
  );
};

export default CountryPage;
