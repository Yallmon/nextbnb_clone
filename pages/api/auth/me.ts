
/* eslint-disable import/no-anonymous-default-export */
import jwt from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";
import Data from "../../../lib/data"
import { StoredUserType } from "../../../types/user";


export default async (req: NextApiRequest, res: NextApiResponse) => {
    if(req.method ==="GET") {
        try {
            const accessToken = req.headers.cookie;
        
            if(!accessToken) {
                res.statusCode = 400;
                return res.send("access token x");
            }
            const userId = jwt.verify(accessToken, process.env.JWT_SECRET!);
            const user = Data.user.find({ id: Number(userId)});
            if(!user) {
                res.statusCode=404;
                return res.send("No such user");
            }

            const userWithoutPassword: Partial<Pick<StoredUserType, "password">> = user;
            delete userWithoutPassword.password;
            res.statusCode = 200;
            return res.send(userWithoutPassword);
        } catch (e) {
            console.log(e);
            // res.statusCode = 500;
            return res.send(e);
            // return res.end();
        }
        
    }
    res.statusCode = 405;
    return res.end();
};