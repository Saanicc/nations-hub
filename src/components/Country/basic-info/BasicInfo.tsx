import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Table } from "@/components/ui/table";
import React, { Fragment } from "react";
import { Country } from "@/types/country";
import Link from "next/link";
import { useFilterContext } from "@/contexts/filterContext";
import {
  FilterOptions,
  FilterType,
  FilterTypeValues,
} from "@/components/FilterItem/FilterItem.config";
import { Region, Subregion, Continent } from "@/types/country";

const BasicInfo = ({ country }: { country: Country }) => {
  const { updateFilters } = useFilterContext();

  const handleFilterClick = (
    filterType: FilterType,
    value: Region | Subregion | Continent
  ): void => {
    const newFilters: FilterOptions<FilterTypeValues>[] = [];

    newFilters.push({
      displayName: value,
      queryValue: value,
      type: filterType,
      selected: true,
    });
    updateFilters(newFilters);
  };

  return (
    <div>
      <h3 className="font-semibold mb-2">Basic Information</h3>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">Region</TableCell>
            <TableCell>
              <Link
                className="text-blue-500 hover:cursor-pointer"
                href={`/countries`}
                onClick={() => handleFilterClick("region", country.region)}
              >
                {country.region}
              </Link>
            </TableCell>
          </TableRow>
          {country.subregion && (
            <TableRow>
              <TableCell className="font-medium">Subregion</TableCell>
              <TableCell>
                <Link
                  className="text-blue-500 hover:cursor-pointer"
                  href={`/countries`}
                  onClick={() =>
                    handleFilterClick(
                      "subregion",
                      country.subregion as Subregion
                    )
                  }
                >
                  {country.subregion}
                </Link>
              </TableCell>
            </TableRow>
          )}
          {country.continents && (
            <TableRow>
              <TableCell className="font-medium">Continents</TableCell>
              <TableCell>
                {country.continents?.map((continent, index) => (
                  <Fragment key={continent}>
                    <Link
                      key={continent}
                      className="text-blue-500 hover:cursor-pointer"
                      href={`/countries`}
                      onClick={() =>
                        handleFilterClick("continents", continent as Continent)
                      }
                    >
                      {continent}
                    </Link>
                    {index < (country.continents?.length ?? 0) - 1 && ", "}
                  </Fragment>
                ))}
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell className="font-medium">Capital</TableCell>
            <TableCell>{country.capital?.join(", ") || "Unknown"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Population</TableCell>
            <TableCell>{country.population.toLocaleString()}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Area</TableCell>
            <TableCell>{country.area.toLocaleString()} km²</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default BasicInfo;
