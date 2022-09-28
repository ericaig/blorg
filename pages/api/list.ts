import type { NextApiRequest, NextApiResponse } from 'next'
import { User, Prisma } from '@prisma/client';
import prisma from '../../lib-server/prisma'

type Data = {
    users: Prisma.UserCreateInput[],
}

async function create(_req: NextApiRequest, res: NextApiResponse<Data>) {
    // const p = prisma as PrismaClient

    res.status(200).json({
        users: await prisma.user.findMany({
            select: {
                name: true,
                email: true,
            }
        })
    })
}

export default create