import { mongooseConnect } from "@/lib/mongoose";
import { Project } from "@/models/Project";

export default async function handle(req, res) {

    // If authenticated, connect to MongoDB
    await mongooseConnect();

    const { method } = req;


    if (method === 'POST') {
        const { title, slug, images, description, client, livepreview, projectcategory, tags, status } = req.body;

        const productDoc = await Project.create({
            title, slug, images, description, client, livepreview, projectcategory, tags, status
        })

        res.json(productDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Project.findById(req.query.id));
        } else {
            res.json((await Project.find()).reverse())
        }
    }


    if (method === 'PUT') {
        const { _id, title, slug, images, description, client, livepreview, projectcategory, tags, status } = req.body;
        await Project.updateOne({ _id }, {
            title, slug, images, description, client, livepreview, projectcategory, tags, status
        });

        res.json(true);
    }

    if (method === 'DELETE') {
        if (req.query?.id) {
            await Project.deleteOne({ _id: req.query?.id });
            res.json(true)
        }
    }
}