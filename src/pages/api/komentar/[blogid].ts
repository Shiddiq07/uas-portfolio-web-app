import type { NextApiRequest, NextApiResponse } from 'next'
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from 'mongodb';

export default async function handler(req:NextApiRequest, res:NextApiResponse) {
    const client = await clientPromise;
    const db = client.db(process.env.MONGODB_NAME);
    const idParam:string = req?.query?.blogid as string || ''

    switch (req.method) {  

        case "PUT":
            try{
                const filter = {_id: idParam }
                const body = JSON.parse(req.body)
                // const body = req.body
                const updateDoc = {
                    $set: {
                        nama: body.nama,
                        content: body.content,
                        created_at:body.created_at,
                        email: body.email,
                        idBlog: body.idBlog,
                        updated_at:new Date()
                    },
                  };
                console.log('filter',filter)
                const komentar = await db.collection("message")
                        .updateOne(filter, updateDoc, { upsert: true })

                res.status(200).json({data:[komentar], message: 'data berhasil di perbaharui'});
            }catch(err){
                res.status(422).json({ message: err.message});
            }
        break;
        case "DELETE":
            try{
                const resDelete = await db.collection("kategori").deleteOne({
                    _id: idParam
                })

                if(resDelete.deletedCount < 1){
                    throw new Error('data tidak ditemukan')
                }

                res.json({ data: [resDelete], message:"data berhasil dihapus" });
            }catch(err){
                res.status(422).json({ message: err.message});
            }
        break;
        default:
            
            const komentar = await db.collection("message")
                    .find({ idBlog: idParam }).toArray();
                res.json({ data: komentar });
        break;
    }
}
      