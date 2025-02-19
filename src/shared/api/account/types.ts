import type { ProfileType } from './consts';

export type Profile = {
  account_id: string;
  user_id: string;
  name: string;
  type?: ProfileType;
  description?: string;
  email: string;
  cover?: string;
  phone_number?: string;
  wallpaper?: string;
  location?: AccountLocation;
  published_number?: number;
  created_at?: string;
  rating?: number;
  rating_points?: number;
  alias?: string;
  business_hours?: Partial<BusinessHours>;
};

export type AccountGetResponse = {
  account: Profile;
};

export type AccountListResponse = {
  accounts: Profile[];
};

export type AccountLocation = {
  city: string;
  country: string;
  state: string;
  zipcode: string;
};

export type User = {
  birthday: string;
  email: string;
  first_name: string;
  gender: string;
  last_name: string;
  phone_number: string;
  user_id: string;
};

export type BusinessHours = {
  sun: string;
  mon: string;
  tue: string;
  wed: string;
  thu: string;
  fri: string;
  sat: string;
};
