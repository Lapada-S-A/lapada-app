import type { UserTypes } from "~/stores/enum";

export interface User {
  username: string;
  email: string;
  password: string;
  cpf: string;
  phone_number: string;
  type_user: UserTypes;
  birthdate: string;
}

export interface UserPersonalInfo {
  username: string | null;
  email: string | null;
  cpf: string | null;
  birthDate: string | null;
  phone: string | null;
}
