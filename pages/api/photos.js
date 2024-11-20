import { mongooseConnect } from "@/lib/mongoose";
import { Photo } from "@/models/Photo";




export default async function handle(req, res) {

    // If authenticated, connect to MongoDB
    await mongooseConnect();

    const { method } = req;


    if (method === 'POST') {
        const { title, slug, images } = req.body;

        const productDoc = await Photo.create({
            title, slug, images
        })

        res.json(productDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Photo.findById(req.query.id));
        } else {
            res.json((await Photo.find()).reverse())
        }
    }


    if (method === 'PUT') {
        const { _id, title, slug, images } = req.body;
        await Photo.updateOne({ _id }, {
            title, slug, images
        });

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Photo.deleteOne({ _id: req.query?.id });
            res.json(true)
        }
    }
}