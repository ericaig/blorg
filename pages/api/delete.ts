import type { NextApiRequest, NextApiResponse } from 'next'

type Data = {
    users: any[]
}

async function allUsers(_req: NextApiRequest, res: NextApiResponse<Data>) {
    // await initDb()
    res.status(200).json({ users: [] })
}

export default allUsers