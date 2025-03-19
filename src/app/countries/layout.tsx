"use client";

import React, { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { CountryContextProvider } from "@/contexts/CountryContext";

const queryClient = new QueryClient();

const CountriesLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <CountryContextProvider>{children}</CountryContextProvider>
    </QueryClientProvider>
  );
};

export default CountriesLayout;
