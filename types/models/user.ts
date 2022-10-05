import { User } from "@prisma/client";

/**
 * User (main)
 */
export type UserModel = Omit<User, 'password'>;


export type UserCreateFormData = Omit<User, 'id' | 'emailVerified'> & {
    confirmPassword: string;
}