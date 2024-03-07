const axios = require('axios');
const cheerio = require('cheerio');
const fs = require('fs');

const url = 'https://www.imdb.com/chart/top/';

const moviesData = {};

async function getHTML () {
    const {data: html} = await axios.get(url);
    return html;
};

getHTML().then((res) => {
  const $ = cheerio.load(res);
  $('.ipc-metadata-list ipc-metadata-list--dividers-between sc-71ed9118-0 kxsUNk compact-list-view ipc-metadata-list--base').each((i, movie) => {
    const title = $(movie).find('.ipc-title__text').text();
    const rating = $(movie).find('.ipc-rating-star--rate').text();
    movieData[title] = rating;
  });

  fs.writeFile('movieData.json', JSON.stringify(moviesData), (err) => {
    if (err) throw err;
    console.log('file successfully saved');
  });
});
