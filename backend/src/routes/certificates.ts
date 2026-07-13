import { Router } from 'express';
import { Certificate } from '../models/Certificate';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all certificates
router.get('/', async (req, res) => {
  try {
    const certificates = await Certificate.find().sort({ issueDate: -1 });
    res.json(certificates);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create certificate (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newCertificate = new Certificate(req.body);
    const savedCertificate = await newCertificate.save();
    res.status(201).json(savedCertificate);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update certificate (protected)
router.put('/:id', authMiddleware, async (req, res): Promise<any> => {
  try {
    const updatedCertificate = await Certificate.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedCertificate) return res.status(404).json({ message: 'Certificate not found' });
    res.json(updatedCertificate);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete certificate (protected)
router.delete('/:id', authMiddleware, async (req, res): Promise<any> => {
  try {
    const deletedCertificate = await Certificate.findByIdAndDelete(req.params.id);
    if (!deletedCertificate) return res.status(404).json({ message: 'Certificate not found' });
    res.json({ message: 'Certificate deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
