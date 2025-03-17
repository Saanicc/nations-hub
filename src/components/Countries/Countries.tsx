"use client";

import React, { useEffect, useState } from "react";
import { Country } from "@/types/country";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import CountryCard from "../CountryCard";
import { Button } from "../ui/button";
import { FilterIcon, Slash, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FilterItem from "../FilterItem/FilterItem";
import { FilterOptions } from "../FilterItem/FilterItem.config";
import {
  populationFilterOptions,
  regionFilterOptions,
} from "./Countries.config";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from "../ui/breadcrumb";

const Countries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions[]>([]);

  const { data: countries } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,ccn3"
      );
      return res.json();
    },
  });

  useEffect(() => {
    if (!countries) return;

    const lowercaseSearchTerm = searchTerm.toLowerCase();
    const regionFilters = selectedFilters
      .filter((f) => typeof f.filter === "string")
      .map((f) => f.filter);
    const populationFilters = selectedFilters.filter(
      (f) => typeof f.filter === "object"
    );

    const filtered = countries.filter((country) => {
      if (!country.name.common.toLowerCase().includes(lowercaseSearchTerm))
        return false;

      if (regionFilters.length && !regionFilters.includes(country.region))
        return false;

      if (populationFilters.length) {
        return populationFilters.some((f) => {
          if (typeof f.filter !== "object") return false;
          const { min = 0, max } = f.filter;
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
                  {filter.name}
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedFilters((prev) =>
                        prev.filter((f) => f.name !== filter.name)
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
