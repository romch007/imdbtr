'use strict';

const chalk = require('chalk');
const figures = require('figures');
const ora = require('ora');
const api = require('./api.js');

const imdbtr = name => {
  const movie = api(name);

  if (!movie) {
    return false;
  }

  const spinner = ora(`Searching for ${chalk.yellow(name)}`).start();
  return movie.then(result => {
    spinner.stop();
    if (!result) {
      return console.log(chalk.yellow.bold('Movie not found on IMDB :('));
    }

    const movieRes = `
  ${chalk.black.bgYellow.bold(result.Title)} (${result.Year}) on IMDb:

  ${chalk.yellow(`${figures.star} ${result.imdbRating}`)}

  Director: ... ${result.Director}
  Writer: ..... ${result.Writer}
  Actors: ..... ${result.Actors}
  Genre: ...... ${chalk.italic(result.Genre)}
  Plot: ....... ${result.Plot}
    `;

    console.log(movieRes);
  });
};

module.exports = imdbtr;
