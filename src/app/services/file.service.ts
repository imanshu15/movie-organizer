import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class FileService {

  private videoFormats: string[] = [];
  constructor() {
    const movieData = require('../store/movie-data.json');
    this.videoFormats = movieData.formats;
  }

  async findMovies(dir: string): Promise<any>  {
    const fs = require('fs');
    const path = require('path');
    const movies: any = [];

    await fs.readdir(dir, (err, files) => {
      files.forEach(file => {
        const fileName = this.formatFileName(file);
        const ext = path.extname(file);
        if (ext && (this.videoFormats.filter(a => a === ext) && this.videoFormats.filter(a => a === ext).length > 0)) {
          movies.push(file);
        }
      });
    });
    return movies;
  }

  public organizeFolder(dir: string) {
    const fs = require('fs');
    const path = require('path');

    fs.readdir(dir, (err, files) => {
      files.forEach(file => {
        const fileName = this.formatFileName(file);
        const ext = path.extname(file);
        if (ext) {
          const oldPath = dir + '\\' + file;
          const newPath = dir + '\\' + fileName;

            if (!fs.existsSync(newPath)) {
              fs.mkdirSync(newPath);
            }
            this.move(oldPath, newPath + '\\' + file, this.log);
        }
      });
    });
  }

  public formatFileName(file: string): string {
    let fileName = file.replace(/\./g, ' ');
    const yearIndex = fileName.indexOf('20');
    fileName = fileName.substring(0, yearIndex + 4);
    fileName = fileName.slice(0, yearIndex) + '(' + fileName.slice(yearIndex) + ')';
    return fileName;
  }

  public move(oldPath: string, newPath: string, callback: any) {
    console.log(oldPath, newPath);
    const fs = require('fs');
    fs.rename(oldPath, newPath, function (err) {
        if (err) {
            if (err.code === 'EXDEV') {
                this.copy();
            } else {
                callback(err);
            }
            return;
        }
        callback(true);
    });
  }

  private copy(oldPath: string, newPath: string, callback: any): void {
    const fs = require('fs');
    const readStream = fs.createReadStream(oldPath);
    const writeStream = fs.createWriteStream(newPath);

    readStream.on('error', callback);
    writeStream.on('error', callback);

    readStream.on('close', function () {
        fs.unlink(oldPath, callback);
    });

    readStream.pipe(writeStream);
  }

  private log(value: any) {
    console.log('log value', value);
  }
}
