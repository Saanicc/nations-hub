import { FilterOptions } from "../FilterItem/FilterItem.config";

export const regionFilterOptions: FilterOptions[] = [
  { name: "Africa", filter: "Africa" },
  { name: "Antarctic", filter: "Antarctic" },
  { name: "Asia", filter: "Asia" },
  { name: "Oceania", filter: "Oceania" },
  { name: "Europe", filter: "Europe" },
  { name: "Americas", filter: "Americas" },
];

export const populationFilterOptions: FilterOptions[] = [
  {
    name: "Less than 100.000",
    filter: { min: 0, max: 100000 },
  },
  {
    name: "100.000 - 250.000",
    filter: { min: 100000, max: 250000 },
  },
  {
    name: "250.000 - 500.000",
    filter: { min: 250000, max: 500000 },
  },
  {
    name: "500.000 - 1.000.000",
    filter: { min: 500000, max: 1000000 },
  },
  {
    name: "1.000.000 - 5.000.000",
    filter: { min: 1000000, max: 5000000 },
  },
  {
    name: "5.000.000 - 10.000.000",
    filter: { min: 5000000, max: 10000000 },
  },
  {
    name: "10.000.000 - 50.000.000",
    filter: { min: 10000000, max: 50000000 },
  },
  {
    name: "50.000.000 - 100.000.000",
    filter: { min: 50000000, max: 100000000 },
  },
  {
    name: "Greater than 100.000.000",
    filter: { min: 100000000 },
  },
];
