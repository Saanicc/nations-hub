import { StaticImageData } from "next/image";

export type Region =
  | "Africa"
  | "Americas"
  | "Asia"
  | "Europe"
  | "Oceania"
  | "Antarctic";

export type Subregion =
  | "Caribbean"
  | "Western Asia"
  | "Western Africa"
  | "Eastern Africa"
  | "Northern Europe"
  | "Southern Europe"
  | "South America"
  | "Western Europe"
  | "South-Eastern Asia"
  | "Southern Asia"
  | "Northern Africa"
  | "Southeast Europe"
  | "Middle Africa"
  | "Eastern Asia"
  | "Central Europe"
  | "Polynesia"
  | "Central America"
  | "Micronesia"
  | "North America"
  | "Southern Africa"
  | "Australia and New Zealand"
  | "Melanesia"
  | "Central Asia"
  | "Eastern Europe"
  | "";

export type PopulationRange = { min: number; max?: number };

export interface Country {
  name: {
    common: string;
    official: string;
    nativeName: {
      [key: string]: {
        official: string;
        common: string;
      };
    };
  };
  tld: string[];
  cca2: string;
  ccn3: string;
  cca3: string;
  cioc?: string;
  independent: boolean;
  status: string;
  unMember: boolean;
  currencies: {
    [key: string]: {
      name: string;
      symbol: string;
    };
  };
  idd: {
    root: string;
    suffixes: string[];
  };
  capital: string[];
  altSpellings: string[];
  borders?: string[];
  region: Region;
  subregion?: Subregion;
  languages: {
    [key: string]: string;
  };
  translations: {
    [key: string]: {
      official: string;
      common: string;
    };
  };
  latlng: number[];
  landlocked: boolean;
  area: number;
  demonyms: {
    [key: string]: {
      f: string;
      m: string;
    };
  };
  flag: string;
  maps: {
    googleMaps: string;
    openStreetMaps: string;
  };
  population: number;
  gini?: {
    [key: string]: number;
  };
  fifa?: string;
  car: {
    signs: string[];
    side: string;
  };
  timezones: string[];
  continents: string[];
  flags: {
    png: string;
    svg: StaticImageData;
    alt?: string;
  };
  coatOfArms: {
    png?: string;
    svg?: string;
  };
  startOfWeek: string;
  capitalInfo: {
    latlng: number[];
  };
  postalCode?: {
    format: string;
    regex: string;
  };
}

export interface BorderingCountry {
  name: Country["name"];
  ccn3: Country["ccn3"];
}
