import express from 'express';
import checkExisting from './checkExisting';
const checkRequest = async (
  imageName: string,
  width: number,
  height: number
): Promise<string> => {
  if (!imageName) {
    return 'no image name';
  } else if (!width || !height) {
    return 'no width or height';
  } else if (width <= 0 || height <= 0) {
    return 'width or height < 0';
  } else if (!(await checkExisting(imageName))) {
    return 'image not found';
  }
  return 'ok';
};

export default checkRequest;
