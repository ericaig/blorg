import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next';
import NextAuth, { Session } from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import ApiError from '../../../lib-server/error';
import { UserModel } from '../../../types';
import { Routes } from '../../../lib-client';
import prisma from '../../../lib-server/prisma';
import { loginUser } from '../../../lib-server/services/auth';

const nextAuth = (req: NextApiRequest, res: NextApiResponse) => NextAuth(req, res, {
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                email: {
                    label: 'Email',
                    type: 'email',
                },
                password: {
                    label: 'Password',
                    type: 'password',
                },
            },
            // redirect to same page and parse query params, unable to return api res
            async authorize(credentials) {
                if (!credentials) throw new ApiError('Invalid credentials', 400);

                const { user, error } = await loginUser(credentials);
                if (error) throw error;
                return user;
            },
        }),
    ],
    session: {
        strategy: 'jwt',
        maxAge: 60 * 60, // 1h
    },
    callbacks: {
        // both jwt and session are used to attach user to session
        async jwt({ token, user }) {
            user && (token.user = user);
            return token;
        },
        async session({ session, token }) {
            let _session: Session | undefined = undefined;
            const user = token.user as UserModel;

            if (user) {
                _session = { ...session, user };
            }

            return _session as Session;
        },
    },
    secret: process.env.NEXTAUTH_SECRET,
    pages: {
        signIn: Routes.SITE.LOGIN,
    },
    adapter: PrismaAdapter(prisma),
    debug: false,
})

const authHandler: NextApiHandler = (req, res) => nextAuth(req, res)


export default authHandler;