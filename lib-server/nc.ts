import { NextApiRequest, NextApiResponse } from 'next';
import ApiError, { handleApiError } from './error';
import nc, { Options } from 'next-connect';

export const ncOptions: Options<NextApiRequest, NextApiResponse<any>> = {
    onError(error: Error, req: NextApiRequest, res: NextApiResponse) {
        handleApiError(error, req, res);
    },
    onNoMatch(req: NextApiRequest, res: NextApiResponse) {
        // console.log({ req, res })
        const error = new ApiError(`Method '${req.method}' not allowed`, 405);
        //not in api, handle it manually
        handleApiError(error, req, res);
    },
};

/**
 * single instance must be default exported from file
 */
const nextConnectHandler = () => {
    return nc<NextApiRequest, NextApiResponse>(ncOptions);
};

// ---------- getServerSideProps error handler

export type NextApiRequestWithResult<T> = NextApiRequest & { result: T };

export default nextConnectHandler;