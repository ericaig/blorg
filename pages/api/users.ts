import { NextApiRequest, NextApiResponse } from 'next';
import { withValidation } from 'next-validations';
import { userSignupSchema } from '../../lib-server/validations'
import { UserCreateFormData, UserModel } from '../../types';
import { createUser } from '../../lib-server/services';
import nextConnectHandler from '../../lib-server/nc';

const handler = nextConnectHandler();

const validate = withValidation({
    schema: userSignupSchema,
    type: 'Zod',
    mode: 'body',
});

handler.put(validate(), async (req: NextApiRequest, res: NextApiResponse<UserModel>) => {
    res.status(201).json(await createUser(req.body as UserCreateFormData))
})

export default handler