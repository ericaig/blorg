import { hash } from 'bcryptjs';
import { UserCreateFormData, UserModel } from '../../types';
import ApiError from '../error';
import prisma from "../prisma"
import { excludePasswordFromUser } from '../utils';

export const createUser = async (data: UserCreateFormData): Promise<UserModel> => {
    const { name, surnames, email, password: pwd } = data;

    // let's check if the email already exist or not
    const emailExists = await prisma.user.findFirst({
        where: { email },
    });

    if (emailExists) throw new ApiError(`User with email: ${email} already exists.`, 409);

    // https://auth0.com/blog/hashing-in-action-understanding-bcrypt/
    const password = await hash(pwd, 10);

    const user = await prisma.user.create({
        data: {
            name,
            surnames,
            email,
            password,
        }
    })

    if (!user) throw new ApiError('User cerate failed.', 400);

    return excludePasswordFromUser(user)
}