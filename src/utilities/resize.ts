import sharp from 'sharp';
import express from 'express';
import { promises as fsPromises } from 'fs';

const resizeImage = async (
  imageName: string,
  width: number,
  height: number
): Promise<unknown> => {
  const images = await fsPromises.readdir(`assets`);
  const image = images.find((file) => file === `${imageName}`);
  try {
    if (image) {
      const resizedImage: sharp.OutputInfo = await sharp(`assets/${imageName}`)
        .resize(width, height, { fit: 'cover' })
        .toFormat('jpeg', { mozjpeg: true })
        .toFile(`assets/assets-resized/${width}-${height}-${imageName}`);
      return resizedImage;
    }
  } catch (err) {
    console.error(err);
  }
};

export default resizeImage;
