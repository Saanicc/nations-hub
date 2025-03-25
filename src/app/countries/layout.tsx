"use client";

import React, { PropsWithChildren } from "react";
import { QueryClientProvider, QueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

const CountriesLayout = ({ children }: Readonly<PropsWithChildren>) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default CountriesLayout;
