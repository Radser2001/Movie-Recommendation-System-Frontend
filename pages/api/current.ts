import { NextApiRequest, NextApiResponse } from "next";
import serverAuth from "@/libs/serverAuth";


export default async function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method !== "GET"){
        res.status(405).end()
        return
    }
    try {
        const { currentUser } = await serverAuth(req, res);
        res.status(200).json({ currentUser });
    } catch (error) {
        console.log(error);
        res.status(401).end();
    }
}