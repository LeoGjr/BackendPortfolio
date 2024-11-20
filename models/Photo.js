const { Schema, models, model } = require("mongoose");

const ProjectSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Photo = models.Photo || model('Photo', ProjectSchema, 'photos');
