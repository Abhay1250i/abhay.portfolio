import { Router } from 'express';
import { Blog } from '../models/Blog';
import { authMiddleware } from '../middleware/auth';

const router = Router();

// Get all blogs (only published unless admin)
router.get('/', async (req, res) => {
  try {
    const filter = req.query.all === 'true' ? {} : { published: true };
    const blogs = await Blog.find(filter).sort({ createdAt: -1 });
    res.json(blogs);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get single blog by slug
router.get('/:slug', async (req, res): Promise<any> => {
  try {
    const blog = await Blog.findOne({ slug: req.params.slug });
    if (!blog) return res.status(404).json({ message: 'Blog post not found' });
    res.json(blog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Create blog (protected)
router.post('/', authMiddleware, async (req, res) => {
  try {
    const { title, content, tags, published, readTime, coverImage } = req.body;
    const slug = req.body.slug || title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
    const newBlog = new Blog({ title, slug, content, tags, published, readTime, coverImage });
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update blog (protected)
router.put('/:id', authMiddleware, async (req, res): Promise<any> => {
  try {
    const updatedBlog = await Blog.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedBlog) return res.status(404).json({ message: 'Blog post not found' });
    res.json(updatedBlog);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete blog (protected)
router.delete('/:id', authMiddleware, async (req, res): Promise<any> => {
  try {
    const deletedBlog = await Blog.findByIdAndDelete(req.params.id);
    if (!deletedBlog) return res.status(404).json({ message: 'Blog post not found' });
    res.json({ message: 'Blog post deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
