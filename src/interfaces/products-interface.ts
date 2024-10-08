export interface IProductType {
  companies_id: number;
  description: string;
  id: string;
  name: string;
  slug: string;
  uuid: string;
  weight: number;
};

export interface IFile {
  field_name: string;
  id: string;
  name: string;
};

export interface ICountriesAttribute {
  value: number[];
  name: string;
};

export interface ISimCard {
  id: string;
  usedData: string;
  dataPlan: string;
  countryName: string;
  active: boolean;
  flagImageUri: string;
  daysLeft: string;
  planDays: string;
};