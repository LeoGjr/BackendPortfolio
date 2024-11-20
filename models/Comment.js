// models/Comment.js
import mongoose from 'mongoose';

const { Schema } = mongoose;

const CommentSchema = new Schema({
    name: { type: String, required: true },
    email: { type: String },
    title: { type: String },
    contentpera: { type: String },
    createdAt: { type: Date, default: Date.now },
    blog: { type: Schema.Types.ObjectId, ref: 'Blog', required: true }
});

export default mongoose.models.Comment || mongoose.model('Comment', CommentSchema);
