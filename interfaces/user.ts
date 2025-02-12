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