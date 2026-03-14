export enum USER_ROLE {
  ADMIN = "ADMIN",
  CUSTOMER = "CUSTOMER",
  SELLER = "SELLER",
}

enum userStatus {
  ACTIVE = "ACTIVE",
  BANNED = "BANNED",
}

export type T_user =
  | {
      id: string;
      name: string;
      email: string;
      emailVerified: boolean;
      image: string | null;
      role: USER_ROLE;
      address?: string;
      phoneNumber?: string;
      status: userStatus;
      createdAt: string;
      updatedAt: string;
    }
  | undefined;

export type T_updateUser = {
  name?: string;
  email?: string;
  image?: string;
  address?: string;
  phoneNumber?: string;
};
