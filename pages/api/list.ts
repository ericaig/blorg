import type { NextApiRequest, NextApiResponse } from 'next'
import { User, Prisma } from '@prisma/client';
import prisma from '../../lib-server/prisma'
import { compare } from 'bcryptjs';
import { excludePasswordFromUser } from '../../lib-server/utils';

async function create(_req: NextApiRequest, res: NextApiResponse) {
    let u = { message: "Did not find user", user: {} }

    const user = await prisma.user.findFirst({
        where: {
            email: "osas@example.com"
        },
    })

    if (user) {
        const same = await compare("123456", user.password)

        if (same) {
            u = { message: "ok", user: excludePasswordFromUser(user) }
        }
    }


    res.status(200).json({
        users: u
    })
}

export default create