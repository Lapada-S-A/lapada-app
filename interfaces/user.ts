import type { UserTypes } from "~/stores/enum";

export interface User {
  id?: number;
  username: string;
  email: string;
  password: string;
  cpf: string;
  phone_number: string;
  type_user: UserTypes;
  birthdate: string;
<<<<<<< Updated upstream
  categories?: number[]
=======
  created_at?: string;
>>>>>>> Stashed changes
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
