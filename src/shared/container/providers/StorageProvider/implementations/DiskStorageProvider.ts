import uploadConfig from '@config/upload';
import fs from 'fs';
import path from 'path';
import IStorageProvider from '../models/IStorageProvider';

class DiskStorageProvider implements IStorageProvider {
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(uploadConfig.tempFolder, file),
      path.resolve(uploadConfig.uploadsFolter, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(uploadConfig.uploadsFolter, file);

    try {
      // Procura o arquivo
      await fs.promises.stat(filePath);
    } catch (err) {
      return;
    }

    // Se ele encontrou o arquivo, excluí-lo
    await fs.promises.unlink(filePath);
  }
}

export default DiskStorageProvider;
