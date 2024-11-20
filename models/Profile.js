// models/Product.js
const { Schema, models, model } = require("mongoose");

const ProfileSchema = new Schema({
    email: { type: String },
    password: { type: String },
}, {
    timestamps: true // This option will automatically manage createdAt and updatedAt fields
});

export const Profile = models.Profile || model('Profile', ProfileSchema, 'admin');
