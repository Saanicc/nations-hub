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
import Search from "@/components/Countries/Search/Search";
import { Country } from "@/types/country";
import { useQuery } from "@tanstack/react-query";
import {
  FilterOptions,
  FilterTypeValues,
} from "@/components/FilterItem/FilterItem.config";
import { useCallback, useState } from "react";
import CountryFilter from "@/utils/country-filter";

export default function Home() {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filterQueries, setFilterQueries] = useState<
    FilterOptions<FilterTypeValues>[]
  >([]);

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

  const countryFilter = new CountryFilter(filterQueries);
  const selectedFilteredCountries = countryFilter.findCountries(
    data,
    searchQuery
  );

  const handleQueryUpdate = useCallback(
    (
      filter: FilterOptions<FilterTypeValues>[],
      textSearch: string | undefined
    ): void => {
      setFilterQueries(filter);
      setSearchQuery(textSearch ?? "");
    },
    []
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Header />
      <main className="flex flex-col flex-grow container mx-auto p-4 pt-6 overflow-hidden">
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
        <Search
          handleQueryUpdate={handleQueryUpdate}
          numberOfCountries={selectedFilteredCountries.length}
        />
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
