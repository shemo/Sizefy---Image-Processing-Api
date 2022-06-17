import express, { Application, Request, Response } from 'express';

const PORT = 3000;
//create instance of server
const app: Application = express();

// add routing
app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello' });
});
// start express server
app.listen(PORT, () => {
  console.log(`server is running on ${PORT}`);
});

export default app;
