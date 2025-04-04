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
import { Country } from "@/types/country";

const Translations = ({
  translations,
}: {
  translations: Country["translations"];
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Translations</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="max-h-96 overflow-y-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Language</TableHead>
                <TableHead>Official</TableHead>
                <TableHead>Common</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {Object.entries(translations).map(([lang, trans]) => (
                <TableRow key={lang}>
                  <TableCell>{lang}</TableCell>
                  <TableCell>{trans.official}</TableCell>
                  <TableCell>{trans.common}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default Translations;
