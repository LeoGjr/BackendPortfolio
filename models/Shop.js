const { Schema, models, model } = require("mongoose");

const ProjectSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    tags: [{ type: String }],
    price: { type: String },
    afilink: { type: String },
    status: { type: String },
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Shop = models.Shop || model('Shop', ProjectSchema, 'shops');
