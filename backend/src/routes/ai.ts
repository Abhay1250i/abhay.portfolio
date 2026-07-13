import { Router } from 'express';
import { Project } from '../models/Project';
import { Skill } from '../models/Skill';
import { Certificate } from '../models/Certificate';

const router = Router();

// Help details for fallback engine
const BIO_DATA = {
  name: "Abhay Kumar Bid",
  tagline: "Frontend Developer | AI Enthusiast",
  headline: "I don't just build websites. I build experiences that people remember.",
  college: "Roorkee Institute of Technology, Roorkee, Uttarakhand",
  degree: "B.Tech Computer Science Engineering",
  cgpa: "8.5/10",
  graduation: "2029",
  email: "abhaykumarbid.cse25@ritroorkee.com",
  phone: "+91 9204380297",
  github: "https://github.com/abhay1250i",
  linkedin: "https://www.linkedin.com/in/abhay-kumar-bid-769101381/",
};

// Lightweight keyword-based responder
const fallbackAIResponse = (query: string, dataStr: string): string => {
  const q = query.toLowerCase();
  
  if (q.includes('hello') || q.includes('hi') || q.includes('hey')) {
    return `Hello! I am Abhay's AI Assistant. How can I help you learn more about his background, projects, or experience?`;
  }
  if (q.includes('contact') || q.includes('email') || q.includes('phone') || q.includes('reach')) {
    return `You can reach Abhay Kumar Bid via email at ${BIO_DATA.email} or call him at ${BIO_DATA.phone}. His LinkedIn is ${BIO_DATA.linkedin}.`;
  }
  if (q.includes('college') || q.includes('school') || q.includes('education') || q.includes('cgpa') || q.includes('rit')) {
    return `Abhay is pursuing his B.Tech in CSE at the Roorkee Institute of Technology (RIT), Roorkee. He holds a CGPA of ${BIO_DATA.cgpa} and is graduating in ${BIO_DATA.graduation}.`;
  }
  if (q.includes('github') || q.includes('git')) {
    return `You can check out Abhay's GitHub profile here: ${BIO_DATA.github}`;
  }
  if (q.includes('project') || q.includes('work')) {
    return `Abhay has built several premium projects:
- **Truth Lense**: A media authenticity validation tool.
- **Portfolio Website**: This Vercel & Apple-inspired platform (ani.dev).
- **Notes App**: A feature-rich note taking utility.
- **Budget Tracker**: Financial management utility.
- **Chrome Extension**: Custom developer utilities.
- **Government Subsidies Portal**: Simplified access to state benefits.
Would you like details on a specific project?`;
  }
  if (q.includes('skill') || q.includes('tech') || q.includes('react') || q.includes('typescript') || q.includes('tailwind')) {
    return `Abhay is highly skilled in:
- Frontend: Next.js, React, TypeScript, Tailwind CSS, Framer Motion, GSAP.
- Backend: Node.js, Express, MongoDB.
- Tools: Docker, Git, CI/CD, Cloudinary, JWT auth.`;
  }

  return `I'm Abhay's portfolio AI assistant. I can answer questions about his skills, education (RIT Roorkee), projects (Truth Lense, Budget Tracker, etc.), or how to contact him. Could you please specify your question?`;
};

router.post('/', async (req, res): Promise<any> => {
  const { message } = req.body;

  if (!message) {
    return res.status(400).json({ message: 'Message query is required' });
  }

  try {
    // Gather portfolio database context to make it fully dynamic
    const projects = await Project.find({ featured: true });
    const skills = await Skill.find();
    const certificates = await Certificate.find();

    const dataContext = {
      bio: BIO_DATA,
      projects: projects.map(p => ({ title: p.title, description: p.description, stack: p.stack })),
      skills: skills.map(s => ({ name: s.name, category: s.category, proficiency: s.proficiency })),
      certificates: certificates.map(c => ({ title: c.title, issuer: c.issuer, type: c.type })),
    };

    const dataContextStr = JSON.stringify(dataContext, null, 2);

    // If an external Gemini/OpenAI API key is provided, we can fetch from there.
    // For now, let's execute the fallback keyword engine which requires no extra billing.
    const response = fallbackAIResponse(message, dataContextStr);
    res.json({ response });
  } catch (error) {
    res.status(500).json({ message: 'Server error parsing AI query' });
  }
});

export default router;
