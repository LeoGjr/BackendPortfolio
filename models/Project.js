const { Schema, models, model } = require("mongoose");

const ProjectSchema = new Schema({
    title: { type: String },
    slug: { type: String, required: true },
    images: [{ type: String }],
    description: { type: String },
    client: { type: String },
    projectcategory: [{ type: String }],
    tags: [{ type: String }],
    livepreview: { type: String },
    status: { type: String },
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Project = models.Project || model('Project', ProjectSchema, 'projects');
