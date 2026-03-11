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
      createdAt: string;
      email: string;
      emailVerified: boolean;
      id: string;
      image: string | null;
      name: string;
      role: USER_ROLE;
      address?: string;
      phoneNumber?: string;
      status: userStatus;
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
