import type { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../lib-server/prisma'


async function allUsers(_req: NextApiRequest, res: NextApiResponse) {
    await prisma.user.deleteMany()
    res.status(200).json({ status: "ok" })
}

export default allUsers