import React from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";
import Image from "next/image";
import { Country } from "@/types/country";
import { Badge } from "./ui/badge";

const CountryCard = ({ country }: { country: Country }) => {
  return (
    <Card
      key={country.name.common}
      className="rounded-lg shadow-md bg-card p-4"
    >
      <CardContent className="p-0 flex items-center justify-between mb-4">
        <div className="">
          <Badge className="py-0 px-[2px] rounded-sm bg-chart-2 text-primary-foreground">
            {country.region}
          </Badge>
          <p className="text-xl font-semibold mb-2">{country.name.common}</p>
          <p className="">Capital: {country.capital?.[0] || "N/A"}</p>
          <p className="">Population: {country.population.toLocaleString()}</p>
        </div>
        <Image
          src={country.flags.svg}
          width={100}
          height={100}
          alt={country.flags.alt || `${country.name.common} flag`}
          className="w-24 h-16 object-contain mb-4"
        />
      </CardContent>
      <CardFooter className="p-0">
        <Button className="bg-popover-foreground cursor-pointer">
          View more
        </Button>
      </CardFooter>
    </Card>
  );
};

export default CountryCard;
