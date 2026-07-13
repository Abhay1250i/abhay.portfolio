import { Schema, model } from 'mongoose';

const ProjectSchema = new Schema(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    stack: { type: [String], required: true },
    challenges: { type: String },
    outcomes: { type: String },
    githubUrl: { type: String },
    liveUrl: { type: String },
    imageUrls: { type: [String], default: [] },
    featured: { type: Boolean, default: false },
  },
  { timestamps: true }
);

export const Project = model('Project', ProjectSchema);
