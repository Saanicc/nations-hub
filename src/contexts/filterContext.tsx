import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { FilterOptions } from "@/components/FilterItem/FilterItem.config";
import { FilterTypeValues } from "@/components/FilterItem/FilterItem.config";
import React from "react";

interface FilterContextValue {
  filters: FilterOptions<FilterTypeValues>[];
  updateFilters: (newFilters: FilterOptions<FilterTypeValues>[]) => void;
  clearFilters: () => void;
  removeFilter: (filter: FilterOptions<FilterTypeValues>) => void;
  isFilterSelected: (filter: FilterOptions<FilterTypeValues>) => boolean;
  searchQuery: string;
  setSearchQuery: (newSearch: string) => void;
}

const FilterContext = createContext<FilterContextValue>({
  filters: [],
  updateFilters: () => {},
  clearFilters: () => {},
  removeFilter: () => {},
  isFilterSelected: () => false,
  searchQuery: "",
  setSearchQuery: () => {},
});

export const FilterProvider = ({ children }: { children: React.ReactNode }) => {
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [filters, setFilters] = useState<FilterOptions<FilterTypeValues>[]>([]);

  const updateFilters = useCallback(
    (newFilters: FilterOptions<FilterTypeValues>[]) => {
      setFilters(newFilters);
    },
    [setFilters]
  );

  const removeFilter = useCallback(
    (filter: FilterOptions<FilterTypeValues>) => {
      setFilters((prev) =>
        prev.filter(
          (f) => f.queryValue !== filter.queryValue || f.type !== filter.type
        )
      );
    },
    [setFilters]
  );

  const clearFilters = useCallback(() => {
    setFilters([]);
  }, [setFilters]);

  const isFilterSelected = useCallback(
    (filter: FilterOptions<FilterTypeValues>): boolean =>
      filters.some(
        (f) => f.queryValue === filter.queryValue && f.type === filter.type
      ),
    [filters]
  );

  const values = useMemo(
    () => ({
      filters,
      updateFilters,
      clearFilters,
      removeFilter,
      isFilterSelected,
      searchQuery,
      setSearchQuery,
    }),
    [
      filters,
      updateFilters,
      clearFilters,
      removeFilter,
      isFilterSelected,
      searchQuery,
      setSearchQuery,
    ]
  );

  return (
    <FilterContext.Provider value={values}>{children}</FilterContext.Provider>
  );
};

export const useFilterContext = () => {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }

  return context;
};
