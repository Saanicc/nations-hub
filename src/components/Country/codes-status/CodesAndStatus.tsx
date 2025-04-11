import { TableBody, TableRow, TableCell } from "@/components/ui/table";
import { Table } from "@/components/ui/table";
import React from "react";
import { Country } from "@/types/country";

const BasicInfo = ({ country }: { country: Country }) => {
  return (
    <div>
      <h3 className="font-semibold mb-2">Codes & Status</h3>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className="font-medium">CCA2</TableCell>
            <TableCell>{country.cca2}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">CCA3</TableCell>
            <TableCell>{country.cca3}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">CCN3</TableCell>
            <TableCell>{country.ccn3}</TableCell>
          </TableRow>
          {country.cioc && (
            <TableRow>
              <TableCell className="font-medium">CIOC</TableCell>
              <TableCell>{country.cioc}</TableCell>
            </TableRow>
          )}
          {country.fifa && (
            <TableRow>
              <TableCell className="font-medium">FIFA</TableCell>
              <TableCell>{country.fifa}</TableCell>
            </TableRow>
          )}
          <TableRow>
            <TableCell className="font-medium">Independent</TableCell>
            <TableCell>{country.independent ? "Yes" : "No"}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell className="font-medium">UN Member</TableCell>
            <TableCell>{country.unMember ? "Yes" : "No"}</TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
};

export default BasicInfo;
