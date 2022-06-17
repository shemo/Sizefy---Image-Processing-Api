import express, { Application, Request, Response } from 'express';
import morgan from 'morgan';
import helmet from 'helmet';
import RateLimit, { rateLimit } from 'express-rate-limit';
const PORT = 3000;
//create instance of server
const app: Application = express();

//middleware to parse incoming requests
app.use(express.json());

//request logger middleware
app.use(morgan('common'));

//http security middleware
app.use(helmet());

app.use(
  rateLimit({
    windowMs: 60 * 1000, // 15 minutes
    max: 2, // Limit each IP to 100 requests per `window` (here, per 15 minutes)
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: 'too many requests',
  })
);
// add routing for / path
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello' });
});

//post request
app.post('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from post', data: req.body });
});
// start express server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

export default app;
