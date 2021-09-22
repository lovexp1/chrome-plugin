import path from 'path';
import fs from 'fs';
const { resolve } = require('path');

export default function watchExternal(publicPath) {
  return {
    name: 'watch-external',
    buildStart() {
      function readDir(path, fileList = []) {
        const files = fs.readdirSync(path);
        files.forEach(item => {
          const itemPath = `${path}/${item}`
          const stat = fs.statSync(itemPath);
          if (stat.isDirectory()) {
            readDir(itemPath, fileList);
          }
          fileList.push(itemPath);
        })

        return fileList;
      }

      const fileList = readDir(publicPath);

      fileList.forEach(path => {
        this.addWatchFile(path);
      })
    }
  }
}
