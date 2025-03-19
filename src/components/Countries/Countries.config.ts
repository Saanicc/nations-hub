import { FilterOptions } from "../FilterItem/FilterItem.config";
import { Region, Subregion, PopulationRange, Continent } from "@/types/country";

export const regionFilterOptions: FilterOptions<Region>[] = [
  {
    displayName: "Africa",
    queryValue: "Africa",
    type: "region",
    selected: false,
  },
  {
    displayName: "Americas",
    queryValue: "Americas",
    type: "region",
    selected: false,
  },
  { displayName: "Asia", queryValue: "Asia", type: "region", selected: false },
  {
    displayName: "Europe",
    queryValue: "Europe",
    type: "region",
    selected: false,
  },
  {
    displayName: "Oceania",
    queryValue: "Oceania",
    type: "region",
    selected: false,
  },
  {
    displayName: "Antarctic",
    queryValue: "Antarctic",
    type: "region",
    selected: false,
  },
];

export const subregionFilterOptions: FilterOptions<Subregion>[] = [
  { displayName: "None", queryValue: "", type: "subregion", selected: false },
  {
    displayName: "Caribbean",
    queryValue: "Caribbean",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Western Asia",
    queryValue: "Western Asia",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Western Africa",
    queryValue: "Western Africa",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Eastern Africa",
    queryValue: "Eastern Africa",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Northern Europe",
    queryValue: "Northern Europe",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Southern Europe",
    queryValue: "Southern Europe",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "South America",
    queryValue: "South America",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Western Europe",
    queryValue: "Western Europe",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "South-Eastern Asia",
    queryValue: "South-Eastern Asia",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Southern Asia",
    queryValue: "Southern Asia",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Northern Africa",
    queryValue: "Northern Africa",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Southeast Europe",
    queryValue: "Southeast Europe",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Middle Africa",
    queryValue: "Middle Africa",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Eastern Asia",
    queryValue: "Eastern Asia",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Central Europe",
    queryValue: "Central Europe",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Polynesia",
    queryValue: "Polynesia",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Central America",
    queryValue: "Central America",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Micronesia",
    queryValue: "Micronesia",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "North America",
    queryValue: "North America",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Southern Africa",
    queryValue: "Southern Africa",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Australia and New Zealand",
    queryValue: "Australia and New Zealand",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Melanesia",
    queryValue: "Melanesia",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Central Asia",
    queryValue: "Central Asia",
    type: "subregion",
    selected: false,
  },
  {
    displayName: "Eastern Europe",
    queryValue: "Eastern Europe",
    type: "subregion",
    selected: false,
  },
];

export const continentFilterOptions: FilterOptions<Continent>[] = [
  {
    displayName: "Africa",
    queryValue: "Africa",
    type: "continents",
    selected: false,
  },
  {
    displayName: "Asia",
    queryValue: "Asia",
    type: "continents",
    selected: false,
  },
  {
    displayName: "Oceania",
    queryValue: "Oceania",
    type: "continents",
    selected: false,
  },
  {
    displayName: "Europe",
    queryValue: "Europe",
    type: "continents",
    selected: false,
  },
  {
    displayName: "North America",
    queryValue: "North America",
    type: "continents",
    selected: false,
  },
  {
    displayName: "South America",
    queryValue: "South America",
    type: "continents",
    selected: false,
  },
  {
    displayName: "Antarctica",
    queryValue: "Antarctica",
    type: "continents",
    selected: false,
  },
];

export const populationFilterOptions: FilterOptions<PopulationRange>[] = [
  {
    displayName: "Less than 100.000",
    queryValue: { min: 0, max: 100000 },
    type: "population",
    selected: false,
  },
  {
    displayName: "100.000 - 250.000",
    queryValue: { min: 100000, max: 250000 },
    type: "population",
    selected: false,
  },
  {
    displayName: "250.000 - 500.000",
    queryValue: { min: 250000, max: 500000 },
    type: "population",
    selected: false,
  },
  {
    displayName: "500.000 - 1.000.000",
    queryValue: { min: 500000, max: 1000000 },
    type: "population",
    selected: false,
  },
  {
    displayName: "1.000.000 - 5.000.000",
    queryValue: { min: 1000000, max: 5000000 },
    type: "population",
    selected: false,
  },
  {
    displayName: "5.000.000 - 10.000.000",
    queryValue: { min: 5000000, max: 10000000 },
    type: "population",
    selected: false,
  },
  {
    displayName: "10.000.000 - 50.000.000",
    queryValue: { min: 10000000, max: 50000000 },
    type: "population",
    selected: false,
  },
  {
    displayName: "50.000.000 - 100.000.000",
    queryValue: { min: 50000000, max: 100000000 },
    type: "population",
    selected: false,
  },
  {
    displayName: "Greater than 100.000.000",
    queryValue: { min: 100000000 },
    type: "population",
    selected: false,
  },
];
