"use client";

import CountryCard from "../CountryCard";
import { Spinner } from "../ui/loading-spinner";
import { Country } from "@/types/country";

const Countries = ({
  countries,
  isLoading,
}: {
  countries: Country[];
  isLoading: boolean;
}) => {
  return (
    <div className="h-full overflow-y-auto">
      {isLoading ? (
        <div className="flex flex-col items-center justify-center py-12">
          <Spinner size="large" />
          <p>Loading...</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 pb-4">
          {countries.map((country) => (
            <CountryCard key={country.name.common} country={country} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Countries;
