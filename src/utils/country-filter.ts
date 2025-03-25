import { FilterOptions } from "@/components/FilterItem/FilterItem.config";
import { FilterTypeValues } from "@/components/FilterItem/FilterItem.config";
import { Country } from "@/types/country";

class CountryFilter {
  private filters: FilterOptions<FilterTypeValues>[];

  constructor(filters: FilterOptions<FilterTypeValues>[]) {
    this.filters = filters;
  }

  isFilterMatch(country: Country): boolean {
    const regionFilters = this.filters
      .filter((f) => f.type === "region")
      .map((f) => f.displayName);

    const subregionFilters = this.filters
      .filter((f) => f.type === "subregion")
      .map((f) => f.displayName);

    const continentFilters = this.filters
      .filter((f) => f.type === "continents")
      .map((f) => f.displayName);

    const populationFilters = this.filters.filter(
      (f) => f.type === "population"
    );

    if (regionFilters.length && !regionFilters.includes(country.region))
      return false;

    if (
      subregionFilters.length &&
      !subregionFilters.includes(country.subregion ?? "")
    )
      return false;

    if (
      continentFilters.length &&
      !continentFilters.includes(country?.continents?.[0] ?? "")
    )
      return false;

    if (populationFilters.length) {
      return populationFilters.some((f) => {
        if (typeof f.queryValue !== "object") return false;
        const { min = 0, max } = f.queryValue;
        return (
          country.population >= min &&
          (max === undefined || country.population <= max)
        );
      });
    }

    return true;
  }

  isFreeTextMatch = (country: Country, searchQuery: string): boolean => {
    const countryName = country.name.common ?? "";
    const countryCapital = country.capital?.[0] ?? "";
    return [countryName, countryCapital].some((value) =>
      value.toLowerCase().includes(searchQuery.toLowerCase())
    );
  };

  findCountries = (countries: Country[] | undefined, searchQuery?: string) => {
    if (!countries) return [];
    let result = [...countries].sort((firstItem, secondItem) => {
      if (firstItem.name.common < secondItem.name.common) return -1;
      if (firstItem.name.common > secondItem.name.common) return 1;
      return 0;
    });

    if (searchQuery) {
      result = result.filter((country) =>
        this.isFreeTextMatch(country, searchQuery)
      );
    }

    if (result.length > 0 && this.filters.length > 0) {
      result = result.filter((country) => this.isFilterMatch(country));
    }

    return result;
  };
}

export default CountryFilter;
