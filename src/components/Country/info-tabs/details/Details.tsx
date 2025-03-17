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

const Details = ({ country }: { country: Country }) => {
  return (
    <>
      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="name">
          <AccordionTrigger>Native Names</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Language</TableHead>
                  <TableHead>Official</TableHead>
                  <TableHead>Common</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(country.name.nativeName).map(
                  ([lang, names]) => (
                    <TableRow key={lang}>
                      <TableCell>{lang}</TableCell>
                      <TableCell>{names.official}</TableCell>
                      <TableCell>{names.common}</TableCell>
                    </TableRow>
                  )
                )}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="currencies">
          <AccordionTrigger>Currencies</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Code</TableHead>
                  <TableHead>Name</TableHead>
                  <TableHead>Symbol</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(country.currencies).map(([code, currency]) => (
                  <TableRow key={code}>
                    <TableCell>{code}</TableCell>
                    <TableCell>{currency.name}</TableCell>
                    <TableCell>{currency.symbol}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="idd">
          <AccordionTrigger>
            International Direct Dialing (IDD)
          </AccordionTrigger>
          <AccordionContent>
            <p className="mb-2">Root: {country.idd.root}</p>
            <p>Suffixes: {country.idd.suffixes.join(", ")}</p>
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
            <p className="mb-2">
              International code: {country.car.signs.join(", ")}
            </p>
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

        <AccordionItem value="demonyms">
          <AccordionTrigger>Demonyms</AccordionTrigger>
          <AccordionContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Lang</TableHead>
                  <TableHead>Female</TableHead>
                  <TableHead>Male</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(country.demonyms).map(([code, currency]) => (
                  <TableRow key={code}>
                    <TableCell>{code}</TableCell>
                    <TableCell>{currency.f}</TableCell>
                    <TableCell>{currency.m}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
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
