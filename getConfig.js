import fs from 'fs'
import { dirname } from 'path';
import { fileURLToPath } from 'url';

export const path = dirname(fileURLToPath(import.meta.url));

export const getConfigFile = () => {
  const filePath = `${path}/omni-gc-config.json`
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    const parsedData = JSON.parse(data);
  
    return parsedData;
  } catch (error) {
    if (error.code === 'ENOENT') {
      return {};
    } else {
      throw error;
    }
  }
}
