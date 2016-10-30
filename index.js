const path = require('path');
const glob = require('glob');
const mv = require('mv');

module.exports = addIndexPrefix;

function addIndexPrefix(pattern) {
  'use strict';

  let index = 0;
  return new Promise((resolve) => {

    glob(pattern, (err, matches) => {
      if (err !== null) {
        throw err;
      }

      const promises = matches.map(src => {
        const _dirname = path.dirname(src);
        const _basename = (() => {
          return path.basename(src).replace(/^\d+_/, '');
        })();

        const dest = `${_dirname}/${index++}_${_basename}`;
        return pmv(src, dest);
      });

      Promise.all(promises).then(() => {
        resolve();
      });
    });
  });
};

function pmv(src, dest) {
  return new Promise((resolve, reject) => {
    mv(src, dest, err => {
      if (err !== null) {
        reject(err);
      }
      resolve();
    });
  });
}
