import { FilterOptions } from "@/components/FilterItem/FilterItem.config";
import { FilterTypeValues } from "@/components/FilterItem/FilterItem.config";
import { Country } from "@/types/country";
import { useQuery } from "@tanstack/react-query";
import React, { useContext, useMemo, useState } from "react";

interface CountryContextProps {
  countries: Country[];
  filteredCountries: Country[];
  searchTerm: string;
  setSearchTerm: React.Dispatch<React.SetStateAction<string>>;
  selectedFilters: FilterOptions<FilterTypeValues>[];
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<FilterOptions<FilterTypeValues>[]>
  >;
  isLoading: boolean;
}

const CountryContext = React.createContext<CountryContextProps>(
  {} as CountryContextProps
);

export const CountryContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<
    FilterOptions<FilterTypeValues>[]
  >([]);

  const { data: countries, isLoading } = useQuery<Country[]>({
    queryKey: ["countries"],
    queryFn: async () => {
      const res = await fetch(
        "https://restcountries.com/v3.1/all?fields=name,flags,capital,population,region,subregion,ccn3,continents"
      );
      return res.json();
    },
  });

  const filteredCountries = useMemo(() => {
    if (!countries) return [];

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

    return filtered;
  }, [searchTerm, countries, selectedFilters]);

  const values = useMemo(
    () => ({
      countries: countries ?? [],
      filteredCountries,
      searchTerm,
      setSearchTerm,
      selectedFilters,
      setSelectedFilters,
      isLoading,
    }),
    [
      countries,
      filteredCountries,
      searchTerm,
      selectedFilters,
      setSearchTerm,
      setSelectedFilters,
      isLoading,
    ]
  );

  return (
    <CountryContext.Provider value={values}>{children}</CountryContext.Provider>
  );
};

export const useCountryContext = () => {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error("useCountryContext must be used within a CountryContext");
  }
  return context;
};

export default CountryContextProvider;
