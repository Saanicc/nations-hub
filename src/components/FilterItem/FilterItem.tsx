import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { capitalizeFirstLetter } from "@/lib/utils";
import { CheckSquare, ChevronDown, ChevronUp, Square } from "lucide-react";
import { useCallback, useState } from "react";
import { FilterItemProps } from "./FilterItem.config";
import { Region, Subregion, PopulationRange } from "@/types/country";
import { FilterOptions } from "./FilterItem.config";

const FilterItem = ({
  name,
  filterOptions,
  selectedFilters,
  setSelectedFilters,
}: FilterItemProps<Region | Subregion | PopulationRange>) => {
  const [open, setOpen] = useState(false);

  const handleFilterClick = useCallback(
    (filter: FilterOptions<Region | Subregion | PopulationRange>) => {
      setSelectedFilters((prev) => {
        const filterExists = prev.some(
          (f) => f.displayName === filter.displayName
        );

        if (filterExists) {
          return prev.filter((f) => f.displayName !== filter.displayName);
        }
        return [...prev, filter];
      });
    },
    [setSelectedFilters]
  );

  const isFilterSelected = useCallback(
    (option: FilterOptions<Region | Subregion | PopulationRange>): boolean =>
      selectedFilters.some(
        (filter) => filter.displayName === option.displayName
      ),
    [selectedFilters]
  );

  return (
    <DropdownMenu onOpenChange={setOpen}>
      <DropdownMenuTrigger className="px-2 py-1 border rounded-lg cursor-pointer">
        <div className="flex items-center gap-1">
          <p className="text-sm">Filter by {name}</p>
          {open && <ChevronUp size={16} />}
          {!open && <ChevronDown size={16} />}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuLabel>{capitalizeFirstLetter(name)}</DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          {filterOptions.map((option) => (
            <DropdownMenuItem
              key={option.displayName}
              onClick={() => handleFilterClick(option)}
              className={`flex items-center justify-between gap-2 cursor-pointer`}
            >
              {option.displayName}
              {isFilterSelected(option) ? <CheckSquare /> : <Square />}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterItem;
