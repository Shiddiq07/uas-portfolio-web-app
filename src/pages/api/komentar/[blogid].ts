import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);
    const idParam:string = req?.query?.blogid as string || ''

    switch (req.method) {  
        case "GET":
            try{
                const komentar = await db.collection("komentar")
                    .find({ blogId: idParam }).toArray();
                res.json({ data: komentar });
            }catch(err){
                res.status(422).json({ message: err.message});
            }
        break;
    }
}