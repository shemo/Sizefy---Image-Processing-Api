import { promises as fsPromises } from 'fs';

const checkExisting = async (imageName: string): Promise<Boolean> => {
  const images = await fsPromises.readdir(`assets`);
  const file = images.find((file) => file === imageName);
  if (file) {
    return true;
  } else {
    return false;
  }
};

export default checkExisting;
