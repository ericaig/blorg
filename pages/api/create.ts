import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib-server/prisma'



type Data = {
    status: string,
}

async function create(_req: NextApiRequest, res: NextApiResponse<Data>) {
    await prisma.user.createMany({
        data: [
            {
                name: "Eric",
                email: "eric@example.com",
            },
            {
                name: "Eric",
                email: "eric2@example.com",
            },
            {
                name: "Sabina",
                email: "sabina@example.com",
            },
            {
                name: "Steve",
                email: "steve@hamburg.com",
            }
        ],
    })

    res.status(200).json({ status: "ok" })
}

export default create