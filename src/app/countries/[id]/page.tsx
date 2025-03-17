"use client";

import React from "react";
import { useParams } from "next/navigation";
import Country from "@/components/Country/Country";

const CountryPage = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <main className="container mx-auto px-4 py-8">
      <Country id={id} />
    </main>
  );
};

export default CountryPage;
