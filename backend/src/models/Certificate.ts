import { Schema, model } from 'mongoose';

const CertificateSchema = new Schema(
  {
    title: { type: String, required: true },
    issuer: { type: String, required: true },
    issueDate: { type: String },
    credentialUrl: { type: String },
    type: { type: String, enum: ['certificate', 'hackathon', 'achievement'], required: true },
  },
  { timestamps: true }
);

export const Certificate = model('Certificate', CertificateSchema);
