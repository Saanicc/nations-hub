"use client";

import React, { useEffect, useState } from "react";
import { Country } from "@/types/country";
import { useQuery } from "@tanstack/react-query";
import { Input } from "@/components/ui/input";
import CountryCard from "../CountryCard";
import { Button } from "../ui/button";
import { FilterIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FilterItem from "../FilterItem/FilterItem";
import { FilterOptions } from "../FilterItem/FilterItem.config";
import {
  populationFilterOptions,
  regionFilterOptions,
} from "./Countries.config";

const Countries = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [filteredCountries, setFilteredCountries] = useState<Country[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<FilterOptions[]>([]);

  const { data: countries } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region"
      );
      return res.json();
    },
  });

  useEffect(() => {
    if (!countries) return;

    const results = countries.filter((country) =>
      country.name.common.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const filtered = results.filter((country) => {
      const regionFilters = selectedFilters
        .filter((f) => typeof f.filter === "string")
        .map((f) => f.filter);
      const populationFilters = selectedFilters.filter(
        (f) => typeof f.filter === "object"
      );

      const matchesRegion =
        regionFilters.length === 0 || regionFilters.includes(country.region);

      const matchesPopulation =
        populationFilters.length === 0 ||
        populationFilters.some((f) => {
          if (typeof f.filter !== "object") return;
          const { min = 0, max } = f.filter;
          return (
            country.population >= min &&
            (max === undefined || country.population <= max)
          );
        });

      return matchesRegion && matchesPopulation;
    });

    setFilteredCountries(filtered);
  }, [searchTerm, countries, selectedFilters]);

  return (
    <>
      <h1 className="text-3xl font-bold mb-6">Countries</h1>
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
          <div className="mb-2 flex gap-4">
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
            <div className="flex items-center gap-2">
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
              <Button
                className="cursor-pointer px-2 py-1 border rounded-lg h-[30px]"
                onClick={() => setSelectedFilters([])}
                variant="outline"
              >
                <p className="text-sm">Clear filters</p>
              </Button>
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
