"use client";

import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FilterItem from "../../FilterItem/FilterItem";
import {
  populationFilterOptions,
  regionFilterOptions,
  subregionFilterOptions,
  continentFilterOptions,
} from "../Countries.config";
import { capitalizeFirstLetter } from "@/lib/utils";
import { useFilterContext } from "@/contexts/filterContext";

const Search = ({ numberOfCountries }: { numberOfCountries: number }) => {
  const {
    filters,
    clearFilters,
    searchQuery,
    setSearchQuery,
    removeFilter,
    updateFilters,
  } = useFilterContext();

  const [showFilters, setShowFilters] = useState(!!filters.length);

  const handleSearchQuery = (value: string): void => {
    setSearchQuery(value);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 mt-4">Countries</h1>
      <div className="w-full mb-0.5 flex gap-4 relative">
        <div className="relative w-full flex">
          <Input
            type="search"
            id="search"
            placeholder="Search for country or capital..."
            className="w-full p-4 border rounded-lg"
            value={searchQuery}
            onChange={(e) => handleSearchQuery(e.target.value)}
          />
          {searchQuery && (
            <Button
              variant="ghost"
              onClick={() => setSearchQuery("")}
              className="absolute right-0 cursor-pointer"
            >
              <X size={16} />
            </Button>
          )}
        </div>
        <Button
          className="bg-popover-foreground cursor-pointer"
          onClick={() => setShowFilters(!showFilters)}
        >
          <FilterIcon />
          {`${showFilters ? "Hide" : "Show"} filters`}
        </Button>
      </div>
      <span className="text-[12px] mt-0.5 mb-2 ml-2">
        {numberOfCountries} countries found
      </span>
      {showFilters && (
        <div className="mb-4">
          <div className="flex flex-row flex-wrap gap-2">
            <FilterItem
              name="region"
              filterOptions={regionFilterOptions}
              selectedFilters={filters}
              onSelect={(filters) => updateFilters(filters)}
            />
            <FilterItem
              name="subregion"
              filterOptions={subregionFilterOptions}
              selectedFilters={filters}
              onSelect={(filters) => updateFilters(filters)}
            />
            <FilterItem
              name="continent"
              filterOptions={continentFilterOptions}
              selectedFilters={filters}
              onSelect={(filters) => updateFilters(filters)}
            />
            <FilterItem
              name="population"
              filterOptions={populationFilterOptions}
              selectedFilters={filters}
              onSelect={(filters) => updateFilters(filters)}
            />
          </div>
          {filters.length > 0 && (
            <div className="w-full flex-wrap flex items-center gap-2 mt-4">
              {filters.map((filter, index) => (
                <Badge key={index} variant="secondary">
                  {capitalizeFirstLetter(filter.type)}:{" "}
                  {filter.displayName.toLowerCase()}
                  <button type="button" onClick={() => removeFilter(filter)}>
                    <X size={15} className="cursor-pointer" />
                  </button>
                </Badge>
              ))}
              <Badge
                className="cursor-pointer bg-popover-foreground"
                onClick={clearFilters}
              >
                Clear filters
              </Badge>
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default Search;
