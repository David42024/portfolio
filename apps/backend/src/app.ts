import express from 'express';
import cors from 'cors';
import {env} from './config/env';
import helmet from 'helmet';
import morgan from 'morgan';
import {Request, Response} from 'express';
import routes from './routes';
import { errorHandler } from "./middlewares/errorHandler";
import { notFoundHandler } from "./middlewares/notFoundHandler";

const app = express();

app.use(helmet());

// Middleware
app.use(cors(
    {
        origin: env.CORS_ORIGIN,
        credentials: true,
    }
));

// Logging
if (env.NODE_ENV !== "test") {
  app.use(morgan(env.NODE_ENV === "development" ? "dev" : "combined"));
}

// Body parsing
app.use(express.json({limit: '10kb'}));
app.use(express.urlencoded({extended: true, limit: '10kb'}));



app.use('/api/v1', routes);

// Routes

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Portfolio Backend API' });
});



app.get('/api/v1', (req: Request, res: Response) => {
  res.json({ message: 'Welcome to Portfolio Backend API/V1' });
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


app.use(notFoundHandler);
app.use(errorHandler);

export default app;

