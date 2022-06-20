import express, { Request, Response } from 'express';
import preview from '../../utilities/preview';

const image = express.Router();

image.get('/', preview, function (_req: Request, res: Response): void {
  res.end();
});

export default image;
