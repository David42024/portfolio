import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Portfolio Backend API' });
});

app.get('/api/health', (req: Request, res: Response) => {
  res.json({ status: 'OK', timestamp: new Date().toISOString() });
});

app.get('/api/projects', (req: Request, res: Response) => {
  const projects = [
    {
      id: 1,
      title: 'Project 1',
      description: 'A sample project description',
      technologies: ['Next.js', 'TypeScript', 'Tailwind CSS']
    },
    {
      id: 2,
      title: 'Project 2',
      description: 'Another sample project',
      technologies: ['Express', 'Node.js', 'MongoDB']
    }
  ];
  res.json(projects);
});

app.listen(PORT, () => {
  console.log(`🚀 Backend server running on http://localhost:${PORT}`);
});
