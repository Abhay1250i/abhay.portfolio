import { Schema, model } from 'mongoose';

const SkillSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: String, enum: ['frontend', 'backend', 'tools'], required: true },
    proficiency: { type: Number, required: true, min: 0, max: 100 },
    icon: { type: String }, // CSS icon class or icon name
  },
  { timestamps: true }
);

export const Skill = model('Skill', SkillSchema);
