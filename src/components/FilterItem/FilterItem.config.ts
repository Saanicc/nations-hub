export type FilterOptions = {
  name: string;
  filter?: string | { min: number; max?: number };
};

export type FilterItemProps = {
  name: string;
  filterOptions: FilterOptions[];
  selectedFilters: FilterOptions[];
  setSelectedFilters: React.Dispatch<React.SetStateAction<FilterOptions[]>>;
};
