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
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { FilterItemProps } from "./FilterItem.config";

const FilterItem = ({
  name,
  filterOptions,
  selectedFilters,
  setSelectedFilters,
}: FilterItemProps) => {
  const [open, setOpen] = useState(false);

  const handleFilterClick = (
    filter: FilterItemProps["filterOptions"][number]
  ) => {
    setSelectedFilters((prev) => {
      const filterExists = prev.some((f) => f.name === filter.name);

      if (filterExists) {
        return prev.filter((f) => f.name !== filter.name);
      }
      return [...prev, filter];
    });
  };

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
              key={option.name}
              onClick={() => handleFilterClick(option)}
              className={`${
                selectedFilters.some((filter) => filter.name === option.name)
                  ? "bg-primary-foreground"
                  : ""
              } cursor-pointer`}
            >
              {option.name}
            </DropdownMenuItem>
          ))}
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default FilterItem;
