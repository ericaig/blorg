import { User } from "@prisma/client";
import { UserModel } from "../types";

/**
 * https://www.prisma.io/docs/concepts/components/prisma-client/excluding-fields
 */
export const exclude = <T, Key extends keyof T>(
    model: T,
    ...keys: Key[]
): Omit<T, Key> => {
    if (!model) throw new Error('Model arg is missing.');

    for (const key of keys) {
        delete model[key];
    }
    return model;
}

export const excludePasswordFromUser = (user: User): UserModel => {
    return exclude(user, 'password');
}