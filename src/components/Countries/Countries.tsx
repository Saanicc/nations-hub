"use client";

import React, { useEffect, useState } from "react";
import { Country, Region, Subregion, Continent } from "@/types/country";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import CountryCard from "../CountryCard";
import { Button } from "../ui/button";
import { FilterIcon, Slash, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FilterItem from "../FilterItem/FilterItem";
import {
  FilterOptions,
  FilterTypeValues,
} from "../FilterItem/FilterItem.config";
import {
  populationFilterOptions,
  regionFilterOptions,
  subregionFilterOptions,
  continentFilterOptions,
} from "./Countries.config";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";
import { useSearchParams } from "next/navigation";

const Countries = () => {
  const searchParams = useSearchParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<
    FilterOptions<FilterTypeValues>[]
  >([]);

  const region = searchParams.get("region") as Region | undefined;
  const subregion = searchParams.get("subregion") as Subregion | undefined;
  const continent = searchParams.get("continents") as Continent | undefined;

  useEffect(() => {
    if (region || subregion || continent) {
      setShowFilters(true);
      setSelectedFilters(() => {
        const newFilters: FilterOptions<FilterTypeValues>[] = [];
        if (region)
          newFilters.push({
            displayName: region,
            queryValue: region,
            type: "region",
            selected: true,
          });
        if (subregion)
          newFilters.push({
            displayName: subregion,
            queryValue: subregion,
            type: "subregion",
            selected: true,
          });
        if (continent)
          newFilters.push({
            displayName: continent,
            queryValue: continent,
            type: "continents",
            selected: true,
          });
        return newFilters;
      });
    }
  }, [region, subregion, continent]);

  const { data: countries } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,ccn3,continents"
      );
      return res.json();
    },
  });

  useEffect(() => {
    if (!countries) return;

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const regionFilters = selectedFilters
      .filter((f) => f.type === "region")
      .map((f) => f.displayName);

    const subregionFilters = selectedFilters
      .filter((f) => f.type === "subregion")
      .map((f) => f.displayName);

    const continentFilters = selectedFilters
      .filter((f) => f.type === "continents")
      .map((f) => f.displayName);

    const populationFilters = selectedFilters.filter(
      (f) => f.type === "population"
    );

    const filtered = countries.filter((country) => {
      if (!country.name.common.toLowerCase().includes(lowercaseSearchTerm))
        return false;

      if (regionFilters.length && !regionFilters.includes(country.region))
        return false;

      if (
        subregionFilters.length &&
        !subregionFilters.includes(country.subregion ?? "")
      )
        return false;

      if (
        continentFilters.length &&
        !continentFilters.includes(country?.continents?.[0] ?? "")
      )
        return false;

      if (populationFilters.length) {
        return populationFilters.some((f) => {
          if (typeof f.queryValue !== "object") return false;
          const { min = 0, max } = f.queryValue;
          return (
            country.population >= min &&
            (max === undefined || country.population <= max)
          );
        });
      }

      return true;
    });

    setFilteredCountries(filtered);
  }, [searchTerm, countries, selectedFilters]);

  return (
    <>
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
      <h1 className="text-3xl font-bold mb-6 mt-4">Countries</h1>
      <div className="w-full mb-4 flex gap-4">
        <Input
          type="text"
          placeholder="Search for a country..."
          className="w-full p-4 border rounded-lg"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button
          className="bg-popover-foreground cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterIcon />
          {`${showFilters ? "Hide" : "Show"} filters`}
        </Button>
      </div>
      {showFilters && (
        <div className="mb-4">
          <div className="mb-4 flex gap-4">
            <FilterItem
              name="region"
              filterOptions={regionFilterOptions}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
            <FilterItem
              name="subregion"
              filterOptions={subregionFilterOptions}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
            <FilterItem
              name="continent"
              filterOptions={continentFilterOptions}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
            <FilterItem
              name="population"
              filterOptions={populationFilterOptions}
              selectedFilters={selectedFilters}
              setSelectedFilters={setSelectedFilters}
            />
          </div>
          {selectedFilters.length > 0 && (
            <div className="w-full flex-wrap flex items-center gap-2">
              {selectedFilters.map((filter, index) => (
                <Badge key={index} variant="secondary">
                  {filter.displayName}
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedFilters((prev) =>
                        prev.filter((f) => f.displayName !== filter.displayName)
                      )
                    }
                  >
                    <X size={15} className="cursor-pointer" />
                  </button>
                </Badge>
              ))}
              <Badge
                className="cursor-pointer bg-popover-foreground"
                onClick={() => setSelectedFilters([])}
              >
                Clear filters
              </Badge>
            </div>
          )}
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredCountries.map((country) => (
          <CountryCard key={country.name.common} country={country} />
        ))}
      </div>
    </>
  );
};

export default Countries;
