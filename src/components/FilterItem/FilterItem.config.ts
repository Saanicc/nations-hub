export type FilterType = "region" | "subregion" | "population";

export type FilterItemProps<T> = {
  name: string;
  filterOptions: FilterOptions<T>[];
  selectedFilters: FilterOptions<T>[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterOptions<T>[]>>;
};

export interface FilterOptions<T> {
  displayName: string;
  queryValue: T;
  selected: boolean;
  type: FilterType;
}
