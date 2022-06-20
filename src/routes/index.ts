import { Router, Request, Response } from 'express';
import images_routes from './api/images';

const routes = Router();

routes.get('/', (_req: Request, res: Response) => {
  res.send(
    'Welcome to the SIZEFY: write URL as follows to get results: http://localhost:{port}/image?name={image-name.jpg}&width={new-width}&height={new-height}'
  );
});

routes.use('/image', images_routes);

export default routes;
