const { Schema, models, model } = require("mongoose");

const ProjectSchema = new Schema({
    name: { type: String, required: true },
    lname: { type: String },
    email: { type: String, required: true },
    company: { type: String },
    phone: { type: String, required: true},
    country: { type: String },
    project: [{ type: String }],
    price: { type: String },
    description: { type: String },
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Contact = models.Contact || model('Contact', ProjectSchema, 'contacts');
