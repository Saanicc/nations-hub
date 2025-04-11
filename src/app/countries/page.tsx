"use client";

import Countries from "@/components/Countries/Countries";
import Header from "@/components/Header/Header";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Slash } from "lucide-react";
import { Country } from "@/types/country";
import { useQuery } from "@tanstack/react-query";
import CountryFilter from "@/utils/country-filter";
import { useFilterContext } from "@/contexts/filterContext";
import Search from "@/components/Countries/Search/Search";

export default function Home() {
  const { filters, searchQuery } = useFilterContext();

  const { data, isLoading } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,ccn3,continents"
      );
      return res.json();
    },
    staleTime: 60 * 60 * 1000,
  });

  const countryFilter = new CountryFilter(filters);
  const selectedFilteredCountries = countryFilter.findCountries(
    data,
    searchQuery
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex flex-col flex-grow container mx-auto px-4 pt-2 overflow-hidden">
        <Breadcrumb className="mt-14">
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
          </BreadcrumbList>
        </Breadcrumb>
        <Search numberOfCountries={selectedFilteredCountries.length} />
        <div className="flex-grow overflow-hidden">
          <Countries
            countries={selectedFilteredCountries}
            isLoading={isLoading}
          />
        </div>
      </main>
    </div>
  );
}
