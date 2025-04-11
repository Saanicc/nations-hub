"use client";

import React, { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";
import { FilterProvider } from "@/contexts/filterContext";

const queryClient = new QueryClient();

const CountriesLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <QueryClientProvider client={queryClient}>
      <FilterProvider>{children}</FilterProvider>
    </QueryClientProvider>
  );
};

export default CountriesLayout;
