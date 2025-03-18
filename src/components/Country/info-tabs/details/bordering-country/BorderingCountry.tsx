import React from "react";
import { useQuery } from "@tanstack/react-query";
import { type BorderingCountry } from "@/types/country";
import Link from "next/link";

const BorderingCountry = ({ countryCode }: { countryCode: string }) => {
  const { data: borderCountry } = useQuery<BorderingCountry>({
    queryKey: ["country", countryCode],
    queryFn: async () => {
      const res = await fetch(
        `https://restcountries.com/v3.1/alpha/${countryCode}?fields=name,ccn3`
      );
      const data = await res.json();
      return data;
    },
  });

  return (
    <div key={countryCode}>
      <Link
        href={`/countries/${borderCountry?.ccn3}`}
        replace
        className="text-blue-500"
      >
        {borderCountry?.name.common}
      </Link>
    </div>
  );
};

export default BorderingCountry;
