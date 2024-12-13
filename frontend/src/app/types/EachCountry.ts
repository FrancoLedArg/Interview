export interface Population {
  year: number;
  value: number;
}

export interface EachCountry {
  name: string;
  officialName: string;
  region: string;
  borders: string[];
  population: Population[];
  flag: string;
}
