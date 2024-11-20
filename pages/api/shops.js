import { mongooseConnect } from "@/lib/mongoose";
import { Shop } from "@/models/Shop";



export default async function handle(req, res) {

    // If authenticated, connect to MongoDB
    await mongooseConnect();

    const { method } = req;


    if (method === 'POST') {
        const { title, slug, images, description, tags, price, afilink, status } = req.body;

        const productDoc = await Shop.create({
            title, slug, images, description, tags, price, afilink, status
        })

        res.json(productDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Shop.findById(req.query.id));
        } else {
            res.json((await Shop.find()).reverse())
        }
    }


    if (method === 'PUT') {
        const { _id, title, slug, images, description, tags, price, afilink, status } = req.body;
        await Shop.updateOne({ _id }, {
            title, slug, images, description, tags, price, afilink, status
        });

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Shop.deleteOne({ _id: req.query?.id });
            res.json(true)
        }
    }
}