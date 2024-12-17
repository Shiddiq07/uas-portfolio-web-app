import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);
   
 
    switch (req.method) {
        case "POST":
            try{
                // const body = req.body
                const body = JSON.parse(req.body)
                if(typeof body !== "object"){
                    throw new Error('invalid request')
                }
                
                if( body.namaKategori == ""){
                    throw new Error('title is required')
                }

              
                
                let kategori = await db.collection("kategori").insertOne(body);
                res.status(200).json({ data: kategori, message:'data berhasil di simpan' });

            }catch(err){
                res.status(422).json({ message: err.message});
            }
            break;
            
        default:

        const kategoriData = await db.collection("kategori").find({}).toArray();
        res.json({ data: kategoriData });
        break;
    }
}