import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Table } from "@/components/ui/table";
import React from "react";
import { Country } from "@/types/country";
import Link from "next/link";

const BasicInfo = ({ country }: { country: Country }) => {
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
                href={`/countries?region=${country.region}`}
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
                  href={`/countries?subregion=${country.subregion}`}
                >
                  {country.subregion}
                </Link>
              </TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell className="font-medium">Continents</TableCell>
            <TableCell>{country.continents.join(", ")}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">Capital</TableCell>
            <TableCell>{country.capital?.join(", ")}</TableCell>
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
