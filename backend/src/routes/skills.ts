import { Router } from 'express';
import { Skill } from '../models/Skill';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all skills
router.get('/', async (req, res) => {
  try {
    const skills = await Skill.find().sort({ category: 1, name: 1 });
    res.json(skills);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create skill (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const newSkill = new Skill(req.body);
    const savedSkill = await newSkill.save();
    res.status(201).json(savedSkill);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update skill (protected)
router.put('/:id', authMiddleware, async (req, res): Promise<any> => {
  try {
    const updatedSkill = await Skill.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedSkill) return res.status(404).json({ message: 'Skill not found' });
    res.json(updatedSkill);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete skill (protected)
router.delete('/:id', authMiddleware, async (req, res): Promise<any> => {
  try {
    const deletedSkill = await Skill.findByIdAndDelete(req.params.id);
    if (!deletedSkill) return res.status(404).json({ message: 'Skill not found' });
    res.json({ message: 'Skill deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
