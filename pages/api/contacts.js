import { mongooseConnect } from "@/lib/mongoose";
import { Contact } from "@/models/contact";


export default async function handle(req, res) {

    // If authenticated, connect to MongoDB
    await mongooseConnect();

    const { method } = req;


    if (method === 'POST') {
        const { name, lname, email, company, phone, country, project, price, description } = req.body;

        const productDoc = await Contact.create({
            name, lname, email, company, phone, country, project, price, description
        })

        res.json(productDoc)
    }

    if (method === 'GET') {
        if (req.query?.id) {
            res.json(await Contact.findById(req.query.id));
        } else {
            res.json((await Contact.find()).reverse())
        }
    }


}