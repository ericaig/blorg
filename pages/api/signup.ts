import { NextApiRequest, NextApiResponse } from 'next';
import { withValidation } from 'next-validations';
import { userSignupSchema } from '../../lib-server/validations'
import { UserCreateFormData, UserModel } from '../../types';
import { createUser } from '../../lib-server/services';
import { apiHandler } from '../../lib-server/nc';

const nextConnect = apiHandler();

const validate = withValidation({
    schema: userSignupSchema,
    type: 'Zod',
    mode: 'body',
});

const handler = async (req: NextApiRequest, res: NextApiResponse<UserModel>) => {
    res.status(201).json(await createUser(req.body as UserCreateFormData));
}

export default nextConnect.put(
    validate(),
    handler
)
