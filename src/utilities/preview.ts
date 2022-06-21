import express, { Request } from 'express';
import checkCached from './checkCached';
import resize from './resize';
import { promises as fsPromises } from 'fs';
import checkRequest from './checkRequest';

const preview = async (
  req: express.Request,
  res: express.Response,
  next: Function
): Promise<void> => {
  const query = req.query;
  //convert width and height values to numbers
  const width = parseInt(query.width as unknown as string);
  const height = parseInt(query.height as unknown as string);
  const imageName = query.name as string;

  const requestStatus = await checkRequest(imageName, width, height);
  if (requestStatus === 'no image name') {
    res.write(
      `<div style="width:50%; margin:1rem auto; font-family: Arial, Helvetica, sans-serif; text-align:center; font-size:1.25rem"><p>Please, write the image name!</p><p>Please, write url in this way to get desired results:<p><p>http://localhost:{port}/image?name={imageName.jpg}&width={newWidth}&height={newHeight}</p>`
    );
    return;
  } else if (requestStatus === 'no width and height') {
    res.write(
      `<div style="width:50%; margin:1rem auto; font-family: Arial, Helvetica, sans-serif; text-align:center; font-size:1.25rem"><p>Make sure to add a width and height!</p><p>Please, write url in this way to get desired results:<p><p>http://localhost:{port}/image?name={imageName.jpg}&width={newWidth}&height={newHeight}</p>`
    );
    return;
  } else if (requestStatus === 'no width') {
    res.write(
      `<div style="width:50%; margin:1rem auto; font-family: Arial, Helvetica, sans-serif; text-align:center; font-size:1.25rem"><p>Make sure to add a width</p><p>Please, write url in this way to get desired results:<p><p>http://localhost:{port}/image?name={imageName.jpg}&width={newWidth}&height={newHeight}</p>`
    );
    return;
  } else if (requestStatus === 'no height') {
    res.write(
      `<div style="width:50%; margin:1rem auto; font-family: Arial, Helvetica, sans-serif; text-align:center; font-size:1.25rem"><p>Make sure to add a height!</p><p>Please, write url in this way to get desired results:<p><p>http://localhost:{port}/image?name={imageName.jpg}&width={newWidth}&height={newHeight}</p>`
    );
    return;
  } else if (requestStatus === 'width or height < 0') {
    res.write(
      `<div style="width:50%; margin:1rem auto; font-family: Arial, Helvetica, sans-serif; text-align:center; font-size:1.25rem"><p>width and height should be positive numbers greater than 0</p>`
    );
    return;
  } else if (requestStatus === 'image not found') {
    res.write(
      `<div style="width:50%; margin:1rem auto; font-family: Arial, Helvetica, sans-serif; text-align:center; font-size:1.25rem"><p>Image not found!</p>`
    );
    return;
  }

  if (!(await checkCached(imageName, width, height))) {
    await resize(imageName, width, height);
    const image = await fsPromises.readFile(
      `assets/assets-resized/${width}-${height}-${imageName as string}`
    );
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
      '<div style="width:50%; margin:1rem auto; font-family: Arial, Helvetica, sans-serif; text-align:center; font-size:1.25rem"><p>Image Resized </p><img style="margin-right: auto; margin-left: auto;  display: block;" src="data:image/jpeg;base64,'
    );
    res.write(Buffer.from(image).toString('base64'));
    res.end('"/>');
  } else {
    const image = await fsPromises.readFile(
      `assets/assets-resized/${width}-${height}-${imageName as string}`
    );
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.write(
      '<div style="width:50%; margin:1rem auto; font-family: Arial, Helvetica, sans-serif; text-align:center; font-size:1.25rem"><p>Image Resized </p><img style="margin-right: auto; margin-left: auto;  display: block;" src="data:image/jpeg;base64,'
    );
    res.write(Buffer.from(image).toString('base64'));
    res.end('"/>');
  }
  try {
    return;
  } catch (err) {
    console.error(err);
  }

  next();
};

export default preview;
