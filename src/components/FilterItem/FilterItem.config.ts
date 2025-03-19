import { Continent, PopulationRange, Region, Subregion } from "@/types/country";

export type FilterType = "region" | "subregion" | "population" | "continents";

export type FilterTypeValues = Region | Subregion | PopulationRange | Continent;

export interface FilterOptions<T> {
  displayName: string;
  queryValue: T;
  selected: boolean;
  type: FilterType;
}

export type FilterItemProps<T> = {
  name: string;
  filterOptions: FilterOptions<T>[];
  selectedFilters: FilterOptions<T>[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterOptions<T>[]>>;
};
