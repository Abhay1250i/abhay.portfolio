import { Schema, model } from 'mongoose';

const BlogSchema = new Schema(
  {
    title: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    content: { type: String, required: true },
    tags: { type: [String], default: [] },
    published: { type: Boolean, default: false },
    readTime: { type: String, default: '5 min read' },
    coverImage: { type: String },
  },
  { timestamps: true }
);

export const Blog = model('Blog', BlogSchema);
