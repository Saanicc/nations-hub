"use client";

import React from "react";
import Image from "next/image";
import { Country } from "@/types/country";
import { useQuery } from "@tanstack/react-query";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Header from "../Header/Header";
import BasicInfo from "./basic-info/BasicInfo";
import CodesAndStatus from "./codes-status/CodesAndStatus";
import InfoTabs from "./info-tabs";
import { Spinner } from "@/components/ui/loading-spinner";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";

const CountryPage = ({ id }: { id: string }) => {
  const { data: country, isLoading } = useQuery<Country>({
    queryKey: ["country", id],
    queryFn: async () => {
      const res = await fetch(`https://restcountries.com/v3.1/alpha/${id}`);
      const data = await res.json();
      return data[0];
    },
  });

  if (!country) return null;

  return (
    <>
      <Header />
      <BreadCrumbs
        links={[
          { href: "/", label: "" },
          { href: "/countries", label: "countries" },
          { label: country.ccn3 },
        ]}
      />
      <Card className="h-full overflow-y-auto mt-4">
        {isLoading ? (
          <div className="flex items-center justify-center h-full">
            <Spinner className="">Loading...</Spinner>
          </div>
        ) : (
          <>
            <CardHeader className="">
              <div className="flex justify-between items-start">
                <div>
                  <CardTitle className="text-2xl">
                    {country.name.common}
                  </CardTitle>
                  <CardDescription className="">
                    {country.name.official}
                  </CardDescription>
                </div>
                <Image
                  src={country.flags.png}
                  alt={country.flags.alt || `${country.name.common} flag`}
                  width={200}
                  height={200}
                  className="w-auto max-h-16 sm:max-h-20 md:max-h-32 lg:max-h-40 object-contain"
                  priority
                />
              </div>
            </CardHeader>
            <CardContent className="pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                <BasicInfo country={country} />
                <CodesAndStatus country={country} />
              </div>

              <InfoTabs country={country} />
            </CardContent>
          </>
        )}
      </Card>
    </>
  );
};

export default CountryPage;
