import type { NextApiRequest, NextApiResponse } from 'next'

export default function (req: NextApiRequest, res: NextApiResponse) {
    try {
        if(req.method === "DELETE") {
            res.setHeader(
                "Set-Cookie",
                "access_token=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT; httponly"
            );

            return res.end();
        }
    } catch(error) {
        console.log(error);
        return res.send(error);
    }

    res.statusCode = 405;
    return res.end();
}