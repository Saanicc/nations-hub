import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableCell,
  TableBody,
} from "@/components/ui/table";
import { capitalizeFirstLetter } from "@/lib/utils";
import { Country } from "@/types/country";
import React from "react";
import BorderingCountry from "./bordering-country/BorderingCountry";

const Details = ({ country }: { country: Country }) => {
  const hasIdd =
    country.idd?.root &&
    country.idd.suffixes &&
    country.idd?.suffixes?.length > 0;

  const hasCurrencies: boolean =
    !!country.currencies && Object.keys(country.currencies).length > 0;

  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="borders">
          <AccordionTrigger>Bordering Countries</AccordionTrigger>
          <AccordionContent>
            {country.borders ? (
              country.borders.map((countryCode) => (
                <BorderingCountry key={countryCode} countryCode={countryCode} />
              ))
            ) : (
              <p className="text-muted-foreground">No bordering countries</p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="currencies">
          <AccordionTrigger>Currencies</AccordionTrigger>
          <AccordionContent>
            {hasCurrencies ? (
              <Table>
                <TableHeader>
                  <TableRow className="hover:bg-black/10">
                    <TableHead>Code</TableHead>
                    <TableHead>Name</TableHead>
                    <TableHead>Symbol</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {country.currencies && (
                    <>
                      {Object.entries(country.currencies).map(
                        ([code, currency]) => (
                          <TableRow key={code} className="hover:bg-black/10">
                            <TableCell>{code}</TableCell>
                            <TableCell>{currency.name}</TableCell>
                            <TableCell>{currency.symbol}</TableCell>
                          </TableRow>
                        )
                      )}
                    </>
                  )}
                </TableBody>
              </Table>
            ) : (
              <p className="text-muted-foreground">
                No currency information available
              </p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="idd">
          <AccordionTrigger>
            International Direct Dialing (IDD)
          </AccordionTrigger>
          <AccordionContent>
            {hasIdd ? (
              <>
                <p className="mb-2">Root: {country.idd?.root}</p>
                <p>Suffixes: {country.idd?.suffixes?.join(", ")}</p>
              </>
            ) : (
              <p className="text-muted-foreground">
                No IDD information available
              </p>
            )}
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="domains">
          <AccordionTrigger>Top-level Domains</AccordionTrigger>
          <AccordionContent>
            <p>{country.tld.join(", ")}</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="car">
          <AccordionTrigger>Car</AccordionTrigger>
          <AccordionContent>
            {country.car?.signs[0] !== "" && (
              <p className="mb-2">
                International code: {country.car?.signs.join(", ")}
              </p>
            )}
            <p>{capitalizeFirstLetter(country.car.side)}-hand traffic</p>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="time">
          <AccordionTrigger>Time</AccordionTrigger>
          <AccordionContent>
            <p className="mb-1">Start of Week: {country.startOfWeek}</p>
            <div>
              <p className="mb-0.5">Observed timezones:</p>
              <ol>
                {country.timezones.map((timezone) => (
                  <li key={timezone} className="font-light text-[13px]">
                    {timezone}
                  </li>
                ))}
              </ol>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="altSpellings">
          <AccordionTrigger>Alternative Spellings</AccordionTrigger>
          <AccordionContent>
            <p>{country.altSpellings.join(", ")}</p>
          </AccordionContent>
        </AccordionItem>
        {country.postalCode && (
          <AccordionItem value="postalCode">
            <AccordionTrigger>Postal Code</AccordionTrigger>
            <AccordionContent>
              <p className="mb-2">Format: {country.postalCode.format}</p>
              <p>Regex: {country.postalCode.regex}</p>
            </AccordionContent>
          </AccordionItem>
        )}
      </Accordion>
    </>
  );
};

export default Details;
