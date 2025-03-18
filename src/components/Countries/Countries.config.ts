import { FilterOptions } from "../FilterItem/FilterItem.config";
import { Region, Subregion, PopulationRange } from "@/types/country";

export const regionFilterOptions: FilterOptions<Region>[] = [
  { name: "Africa", filter: "Africa", type: "region" },
  { name: "Americas", filter: "Americas", type: "region" },
  { name: "Asia", filter: "Asia", type: "region" },
  { name: "Europe", filter: "Europe", type: "region" },
  { name: "Oceania", filter: "Oceania", type: "region" },
  { name: "Antarctic", filter: "Antarctic", type: "region" },
];

export const subregionFilterOptions: FilterOptions<Subregion>[] = [
  { name: "None", filter: "", type: "subregion" },
  { name: "Caribbean", filter: "Caribbean", type: "subregion" },
  { name: "Western Asia", filter: "Western Asia", type: "subregion" },
  { name: "Western Africa", filter: "Western Africa", type: "subregion" },
  { name: "Eastern Africa", filter: "Eastern Africa", type: "subregion" },
  { name: "Northern Europe", filter: "Northern Europe", type: "subregion" },
  { name: "Southern Europe", filter: "Southern Europe", type: "subregion" },
  { name: "South America", filter: "South America", type: "subregion" },
  { name: "Western Europe", filter: "Western Europe", type: "subregion" },
  {
    name: "South-Eastern Asia",
    filter: "South-Eastern Asia",
    type: "subregion",
  },
  { name: "Southern Asia", filter: "Southern Asia", type: "subregion" },
  { name: "Northern Africa", filter: "Northern Africa", type: "subregion" },
  { name: "Southeast Europe", filter: "Southeast Europe", type: "subregion" },
  { name: "Middle Africa", filter: "Middle Africa", type: "subregion" },
  { name: "Eastern Asia", filter: "Eastern Asia", type: "subregion" },
  { name: "Central Europe", filter: "Central Europe", type: "subregion" },
  { name: "Polynesia", filter: "Polynesia", type: "subregion" },
  { name: "Central America", filter: "Central America", type: "subregion" },
  { name: "Micronesia", filter: "Micronesia", type: "subregion" },
  { name: "North America", filter: "North America", type: "subregion" },
  { name: "Southern Africa", filter: "Southern Africa", type: "subregion" },
  {
    name: "Australia and New Zealand",
    filter: "Australia and New Zealand",
    type: "subregion",
  },
  { name: "Melanesia", filter: "Melanesia", type: "subregion" },
  { name: "Central Asia", filter: "Central Asia", type: "subregion" },
  { name: "Eastern Europe", filter: "Eastern Europe", type: "subregion" },
];

export const populationFilterOptions: FilterOptions<PopulationRange>[] = [
  {
    name: "Less than 100.000",
    filter: { min: 0, max: 100000 },
    type: "population",
  },
  {
    name: "100.000 - 250.000",
    filter: { min: 100000, max: 250000 },
    type: "population",
  },
  {
    name: "250.000 - 500.000",
    filter: { min: 250000, max: 500000 },
    type: "population",
  },
  {
    name: "500.000 - 1.000.000",
    filter: { min: 500000, max: 1000000 },
    type: "population",
  },
  {
    name: "1.000.000 - 5.000.000",
    filter: { min: 1000000, max: 5000000 },
    type: "population",
  },
  {
    name: "5.000.000 - 10.000.000",
    filter: { min: 5000000, max: 10000000 },
    type: "population",
  },
  {
    name: "10.000.000 - 50.000.000",
    filter: { min: 10000000, max: 50000000 },
    type: "population",
  },
  {
    name: "50.000.000 - 100.000.000",
    filter: { min: 50000000, max: 100000000 },
    type: "population",
  },
  {
    name: "Greater than 100.000.000",
    filter: { min: 100000000 },
    type: "population",
  },
];
