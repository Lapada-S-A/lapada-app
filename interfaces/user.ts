import type { UserTypes } from "~/stores/enum";
import type { Auction } from "./auction";
import type { AverageRating } from "./review";
export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  cpf: string;
  phone_number: string;
  type_user: UserTypes;
  birthdate: string;
  categories?: number[];
  created_at?: string;
}

export interface UserPersonalInfo {
  username: string | null;
  email: string | null;
  cpf: string | null;
  birthDate: string | null;
  phone: string | null;
}

export interface CuratorInfo {
  category: number | null;
  certification: File | null;
  photo?: File | null;
}

export interface UserSellerData extends User {
  rating: AverageRating;  
  auctionsCreated: Auction[]; 
}