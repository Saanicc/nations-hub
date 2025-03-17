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
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import Header from "../Header/Header";
import BasicInfo from "./basic-info/BasicInfo";
import CodesAndStatus from "./codes-status/CodesAndStatus";
import InfoTabs from "./info-tabs";

const CountryPage = ({ id }: { id: string }) => {
  const { data: country } = useQuery<Country>({
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
      <Breadcrumb className="mb-4 mt-14">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="/">Home</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href="/countries">Countries</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
          <BreadcrumbItem>
            <BreadcrumbLink href={`/country/${id}`}>
              {country.name.common}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <Card className="mb-8">
        <CardHeader className="">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{country.name.common}</CardTitle>
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
      </Card>
    </>
  );
};

export default CountryPage;
