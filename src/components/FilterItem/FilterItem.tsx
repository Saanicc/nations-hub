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
import { FilterOptions } from "./FilterItem.config";
import { FilterTypeValues } from "./FilterItem.config";
import { useFilterContext } from "@/contexts/filterContext";

const FilterItem = ({
  name,
  filterOptions,
  selectedFilters,
  onSelect,
}: FilterItemProps<FilterTypeValues>) => {
  const { isFilterSelected } = useFilterContext();
  const [open, setOpen] = useState(false);

  const handleFilterClick = useCallback(
    (newFilter: FilterOptions<FilterTypeValues>) => {
      const prev = [...selectedFilters];
      const filterIndex = prev.findIndex(
        (f) =>
          f.queryValue === newFilter.queryValue && f.type === newFilter.type
      );

      if (filterIndex !== -1) {
        prev.splice(filterIndex, 1);
      } else {
        prev.push(newFilter);
      }
      onSelect(prev);
    },
    [onSelect, selectedFilters]
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
              {isFilterSelected(option) ? (
                <CheckSquare color="#FFF" />
              ) : (
                <Square />
              )}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterItem;
