import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import { User } from './models/User';
import { Project } from './models/Project';
import { Skill } from './models/Skill';
import { Certificate } from './models/Certificate';
import { Blog } from './models/Blog';

dotenv.config();

const seedData = async () => {
  try {
    const connUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/anidev';
    await mongoose.connect(connUri);
    console.log('Connected to MongoDB for seeding...');

    // Clear existing data
    await User.deleteMany({});
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Certificate.deleteMany({});
    await Blog.deleteMany({});
    console.log('Cleared existing collections.');

    // Seed Admin User
    const hashedPassword = await bcrypt.hash('admin123', 10);
    const admin = new User({
      username: 'admin',
      password: hashedPassword,
    });
    await admin.save();
    console.log('Created admin account (username: admin, password: admin123).');

    // Seed Projects
    const projects = [
      {
        title: 'Portfolio Website',
        description: 'The premium, responsive personal brand portfolio platform styled like Apple & Linear, running with integrated developer terminal mode.',
        stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'Framer Motion', 'GSAP', 'Node.js', 'MongoDB'],
        challenges: 'Creating fluid, high-performance transitions and managing persistent layouts for interactive administrative and terminal sections.',
        outcomes: 'Achieved 98+ Lighthouse scores across SEO, Performance, and Accessibility with responsive web design paradigms.',
        githubUrl: 'https://github.com/abhay1250i/portfolio',
        liveUrl: 'https://abhay-portfolio-tk2o.vercel.app',
        featured: true,
      },
      {
        title: 'Abee Bucket List Extension',
        description: 'A Chrome productivity extension styled like Red Bull F1 garage to organize shortcuts, bookmarks, AI routes, and birthdays in a glassmorphic board.',
        stack: ['Chrome API', 'React', 'TypeScript', 'Tailwind CSS', 'Webpack'],
        challenges: 'Managing cross-origin messaging and persistent local state variables across background service workers.',
        outcomes: 'Deployed as a zip bundle, organizing bookmarks into responsive grids with 3D tilt effects.',
        githubUrl: 'https://github.com/abhay1250i/abee-bucket-list',
        liveUrl: 'https://abee-bucket-list.vercel.app',
        featured: true,
      },
      {
        title: 'Notes App',
        description: 'A markdown-enabled personal note-taking dashboard with tags and auto-save capabilities.',
        stack: ['React', 'TypeScript', 'Tailwind CSS', 'IndexedDB'],
        challenges: 'Managing document syncing and schema version changes inside client-side IndexedDB.',
        outcomes: 'Created an offline-first notes system that lets users write code blocks and save records with markdown support.',
        githubUrl: 'https://github.com/abhay1250i/notes',
        liveUrl: 'https://ink-well-notes-web-usjo.vercel.app',
        featured: true,
      },
      {
        title: 'Food Logger',
        description: 'A responsive visual web platform to log daily meals, track nutritional values, and monitor dietary habits.',
        stack: ['React', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Node.js'],
        challenges: 'Designing a highly responsive interface for mobile logging and parsing food database API inputs.',
        outcomes: 'Built a lightweight tracker with instant search and dynamic progress updates.',
        githubUrl: 'https://github.com/abhay1250i/food-looger',
        liveUrl: 'https://food-looger.vercel.app',
        featured: true,
      },
      {
        title: 'Truth Lense',
        description: 'A cutting-edge media verification platform that aggregates visual forensics algorithms to authenticate digital image and video content.',
        stack: ['Next.js', 'React', 'TypeScript', 'Tailwind CSS', 'FastAPI', 'Python', 'Docker'],
        challenges: 'Integrating resource-heavy Python forensic models and maintaining low latency for web clients during visual processing uploads.',
        outcomes: 'Built a modular microservices API queue, reducing front-end waiting time by 45% using SSE (Server-Sent Events) notifications.',
        githubUrl: 'https://github.com/abhay1250i/truth-lense',
        liveUrl: 'https://truthlense.ani.dev',
        featured: true,
      },
      {
        title: 'Budget Tracker',
        description: 'A financial dashboard helping users log expenses, visual charts, and set limits on specific item budgets.',
        stack: ['React', 'JavaScript', 'Chart.js', 'Tailwind CSS', 'LocalStore API'],
        challenges: 'Building dynamic, responsive charts that render smoothly across viewport sizes and keeping layout highly interactive.',
        outcomes: 'Delivered an intuitive visual interface running purely client-side without complex setup or tracking.',
        githubUrl: 'https://github.com/abhay1250i/budget-tracker',
        liveUrl: 'https://budget.ani.dev',
        featured: false,
      }
    ];
    await Project.insertMany(projects);
    console.log('Seeded projects.');

    // Seed Skills
    const skills = [
      // Frontend
      { name: 'React', category: 'frontend', proficiency: 92, icon: 'react' },
      { name: 'Next.js', category: 'frontend', proficiency: 90, icon: 'nextjs' },
      { name: 'TypeScript', category: 'frontend', proficiency: 88, icon: 'typescript' },
      { name: 'Tailwind CSS', category: 'frontend', proficiency: 95, icon: 'tailwind' },
      { name: 'Framer Motion', category: 'frontend', proficiency: 85, icon: 'framer' },
      { name: 'GSAP', category: 'frontend', proficiency: 80, icon: 'gsap' },
      // Backend
      { name: 'Node.js', category: 'backend', proficiency: 87, icon: 'node' },
      { name: 'Express.js', category: 'backend', proficiency: 89, icon: 'express' },
      { name: 'MongoDB', category: 'backend', proficiency: 85, icon: 'mongodb' },
      // Tools
      { name: 'Docker', category: 'tools', proficiency: 82, icon: 'docker' },
      { name: 'Git & GitHub', category: 'tools', proficiency: 90, icon: 'git' },
      { name: 'Linux Terminal', category: 'tools', proficiency: 85, icon: 'terminal' }
    ];
    await Skill.insertMany(skills);
    console.log('Seeded skills.');

    // Seed Certificates & Achievements
    const certs = [
      {
        title: 'B.Tech Computer Science Engineering',
        issuer: 'Roorkee Institute of Technology, Roorkee',
        issueDate: '2025 - 2029',
        type: 'achievement'
      },
      {
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        issueDate: 'Nov 2025',
        credentialUrl: 'https://aws.amazon.com',
        type: 'certificate'
      },
      {
        title: 'Smart India Hackathon Finalist',
        issuer: 'Government of India',
        issueDate: 'Dec 2025',
        type: 'hackathon'
      }
    ];
    await Certificate.insertMany(certs);
    console.log('Seeded certificates and achievements.');

    // Seed Blogs
    const blogs = [
      {
        title: 'Mastering Framer Motion in Next.js',
        slug: 'mastering-framer-motion-nextjs',
        content: 'Framer Motion is a powerful library for React that makes creating animations easy. In this post, we discuss how to build premium glassmorphism layouts, page transitions, and element scroll behaviors in Next.js App Router projects.\n\n### Why Framer Motion?\nAnimations make a website feel responsive and alive. When done subtly, they draw focus to key features without distracting users.',
        tags: ['Next.js', 'React', 'Framer Motion', 'Web Design'],
        published: true,
        readTime: '4 min read',
        coverImage: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe'
      },
      {
        title: 'Building a Developer Terminal in React',
        slug: 'developer-terminal-react',
        content: 'Unlocking a secret developer dashboard using the classic Konami code creates a memorable experience for developer recruiters. Here is a step-by-step breakdown of how to build an interactive terminal UI in React.\n\n```typescript\nconst konamiCode = ["ArrowUp", "ArrowUp", "ArrowDown", "ArrowDown"];\n```',
        tags: ['React', 'TypeScript', 'Terminal', 'Easter Eggs'],
        published: true,
        readTime: '6 min read',
        coverImage: 'https://images.unsplash.com/photo-1542831371-29b0f74f9713'
      }
    ];
    await Blog.insertMany(blogs);
    console.log('Seeded blogs.');

    console.log('Database successfully seeded!');
    process.exit(0);
  } catch (error) {
    console.error('Seeding failed:', error);
    process.exit(1);
  }
};

seedData();
