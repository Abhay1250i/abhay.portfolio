import { Router } from 'express';
import { Message } from '../models/Message';
import { authMiddleware } from '../middleware/auth';
import nodemailer from 'nodemailer';

const router = Router();

// Nodemailer transport creation helper
const createTransporter = () => {
  return nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });
};

// Create a message (Public contact form)
router.post('/', async (req, res) => {
  const { name, email, subject, message } = req.body;

  try {
    const newMessage = new Message({ name, email, subject, message });
    const savedMessage = await newMessage.save();

    // Optionally send email notification to admin
    if (process.env.EMAIL_USER && process.env.EMAIL_PASS) {
      try {
        const transporter = createTransporter();
        const mailOptions = {
          from: email,
          to: process.env.EMAIL_USER,
          subject: `Portfolio Contact: ${subject || 'No Subject'} - ${name}`,
          text: `You have received a new message from ${name} (${email}):\n\n${message}`,
        };
        await transporter.sendMail(mailOptions);
        console.log('Notification email sent successfully');
      } catch (err) {
        console.error('Failed to send notification email:', err);
      }
    }

    res.status(201).json(savedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Get all messages (protected)
router.get('/', authMiddleware, async (req, res) => {
  try {
    const messages = await Message.find().sort({ createdAt: -1 });
    res.json(messages);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Update read status (protected)
router.put('/:id', authMiddleware, async (req, res): Promise<any> => {
  try {
    const updatedMessage = await Message.findByIdAndUpdate(
      req.params.id,
      { read: req.body.read },
      { new: true }
    );
    if (!updatedMessage) return res.status(404).json({ message: 'Message not found' });
    res.json(updatedMessage);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

// Delete message (protected)
router.delete('/:id', authMiddleware, async (req, res): Promise<any> => {
  try {
    const deletedMessage = await Message.findByIdAndDelete(req.params.id);
    if (!deletedMessage) return res.status(404).json({ message: 'Message not found' });
    res.json({ message: 'Message deleted' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});

export default router;
