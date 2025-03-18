import { PopulationRange, Region, Subregion } from "@/types/country";

export type FilterType = Region | Subregion | PopulationRange;

export type FilterOptions<FilterType> = {
  name: string;
  type: "region" | "subregion" | "population";
  filter?: FilterType;
};

export type FilterItemProps = {
  name: string;
  filterOptions: FilterOptions<FilterType>[];
  selectedFilters: FilterOptions<FilterType>[];
  setSelectedFilters: React.Dispatch<
    React.SetStateAction<FilterOptions<FilterType>[]>
  >;
};
