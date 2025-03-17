import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import Image from "next/image";
import { Country } from "@/types/country";

const Additional = ({ country }: { country: Country }) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {country.gini && Object.keys(country.gini).length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>GINI Index</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Year</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(country.gini).map(([year, value]) => (
                  <TableRow key={year}>
                    <TableCell>{year}</TableCell>
                    <TableCell>{value}%</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}

      <Card className="">
        <CardHeader>
          <CardTitle>Coat of Arms</CardTitle>
        </CardHeader>
        <CardContent>
          {country.coatOfArms && (
            <div>
              {country.coatOfArms.svg && (
                <Image
                  src={country.coatOfArms.svg}
                  alt={`${country.name.common} coat of arms`}
                  width={100}
                  height={100}
                  className="w-auto h-32 object-contain"
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default Additional;
