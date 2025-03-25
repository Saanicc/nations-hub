"use client";

import React, { useEffect, useState } from "react";
// import { Region, Subregion, Continent } from "@/types/country";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FilterIcon, X } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import FilterItem from "../../FilterItem/FilterItem";
import {
  FilterOptions,
  FilterTypeValues,
} from "../../FilterItem/FilterItem.config";
import {
  populationFilterOptions,
  regionFilterOptions,
  subregionFilterOptions,
  continentFilterOptions,
} from "../Countries.config";
import { capitalizeFirstLetter } from "@/lib/utils";

const Search = ({
  handleQueryUpdate,
  numberOfCountries,
}: {
  handleQueryUpdate: (
    filter: FilterOptions<FilterTypeValues>[],
    textSearch: string | undefined
  ) => void;
  numberOfCountries: number;
}) => {
  const [showFilters, setShowFilters] = useState(false);
  const [filterQueries, setFilterQueries] = useState<
    FilterOptions<FilterTypeValues>[]
  >([]);
  const [searchQuery, setSearchQuery] = useState("");

  // const region = searchParams.get("region") as Region | undefined;
  // const subregion = searchParams.get("subregion") as Subregion | undefined;
  // const continent = searchParams.get("continents") as Continent | undefined;

  // useEffect(() => {
  //   if (region || subregion || continent) {
  //     setShowFilters(true);
  //     setFilterQueries(() => {
  //       const newFilters: FilterOptions<FilterTypeValues>[] = [];
  //       if (region)
  //         newFilters.push({
  //           displayName: region,
  //           queryValue: region,
  //           type: "region",
  //           selected: true,
  //         });
  //       if (subregion)
  //         newFilters.push({
  //           displayName: subregion,
  //           queryValue: subregion,
  //           type: "subregion",
  //           selected: true,
  //         });
  //       if (continent)
  //         newFilters.push({
  //           displayName: continent,
  //           queryValue: continent,
  //           type: "continents",
  //           selected: true,
  //         });
  //       return newFilters;
  //     });
  //   }
  // }, [region, subregion, continent, setSelectedFilters]);

  useEffect(() => {
    handleQueryUpdate(filterQueries, searchQuery);
  }, [filterQueries, searchQuery, handleQueryUpdate]);

  const handleFilterQuery = (
    filters: FilterOptions<FilterTypeValues>[]
  ): void => {
    setFilterQueries([...filters]);
  };

  const clearAllFilters = (): void => {
    setFilterQueries([]);
  };

  const removeFilter = (filterItem: FilterOptions<FilterTypeValues>): void => {
    setFilterQueries((prev) =>
      prev.filter((f) => f.queryValue !== filterItem.queryValue)
    );
  };

  const handleSearchQuery = (value: string): void => {
    setSearchQuery(value);
  };

  return (
    <>
      <h1 className="text-3xl font-bold mb-6 mt-4">Countries</h1>
      <div className="w-full mb-0.5 flex gap-4">
        <Input
          type="text"
          placeholder="Search for a country..."
          className="w-full p-4 border rounded-lg"
          value={searchQuery}
          onChange={(e) => handleSearchQuery(e.target.value)}
        />
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
              selectedFilters={filterQueries}
              onSelect={(filters) => handleFilterQuery(filters)}
            />
            <FilterItem
              name="subregion"
              filterOptions={subregionFilterOptions}
              selectedFilters={filterQueries}
              onSelect={(filters) => handleFilterQuery(filters)}
            />
            <FilterItem
              name="continent"
              filterOptions={continentFilterOptions}
              selectedFilters={filterQueries}
              onSelect={(filters) => handleFilterQuery(filters)}
            />
            <FilterItem
              name="population"
              filterOptions={populationFilterOptions}
              selectedFilters={filterQueries}
              onSelect={(filters) => handleFilterQuery(filters)}
            />
          </div>
          {filterQueries.length > 0 && (
            <div className="w-full flex-wrap flex items-center gap-2 mt-4">
              {filterQueries.map((filter, index) => (
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
                onClick={clearAllFilters}
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
