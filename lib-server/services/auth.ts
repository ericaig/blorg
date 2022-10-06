import { User } from '@prisma/client';
import { compare } from 'bcryptjs';
import { UserLoginFormData, UserModel } from '../../types';
import ApiError from '../error';
import prisma from '../prisma';
import { excludePasswordFromUser } from '../utils';
import { userLoginSchema } from '../validations';

// for rest api? https://next-auth.js.org/getting-started/rest-api
// must return error
export const loginUser = async ({
    email,
    password,
}: UserLoginFormData): Promise<{
    user: UserModel | null;
    error: ApiError | null;
}> => {

    const result = userLoginSchema.safeParse({ email, password });

    if (result.success === false) {
        return {
            user: null,
            error: ApiError.fromZodError(result.error),
        };
    }

    const user = await prisma.user.findUnique({
        where: { email },
    });

    if (!user) {
        return {
            user: null,
            error: new ApiError(`User with email: ${email} does not exist.`, 404),
        };
    }

    const isValid = password && user.password && (await compare(password, user.password));

    if (!isValid) {
        return {
            user,
            error: new ApiError('Email or password is incorrect..', 401),
        };
    }

    return { user: excludePasswordFromUser(user), error: null };
};