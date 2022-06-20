import { promises as fsPromises } from 'fs';

const checkCached = async (
  imageName: string,
  width: number,
  height: number
): Promise<Boolean> => {
  const cachedFiles = await fsPromises.readdir(`assets/assets-resized`);
  const file = cachedFiles.find(
    (file) => file === `${imageName}-${width}-${height}`
  );
  if (file) {
    return true;
  } else {
    return false;
  }
};

export default checkCached;
