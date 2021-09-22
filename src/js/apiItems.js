import axios from 'axios';
const URL = 'https://api.themoviedb.org/3';
const KEY = '15f17b74af157d4eeef693405d33f902';
export async function fetchTrends(page) {
  const request = await axios.get(`${URL}/trending/movie/week?api_key=${KEY}&page=${page}`);
  const result = request.data;
  return result;
}

export async function fetchGenres() {
  try {
    const res = await axios.get(`${URL}/genre/movie/list?api_key=${KEY}`);
    const genres = await res.data.genres;
    // console.log(genres);
    setTimeout(function () {
      const preloader = document.getElementById('page-preloader');
      if (!preloader.classList.contains('done')) {
        preloader.classList.add('done');
      }
    }, 1000);
    return genres;
  } catch (error) {
    console.error(error);
  }
}

export async function fetchById(movie_id) {
  try {
    const result = await axios.get(`${URL}/movie/${movie_id}?api_key=${KEY}`);
    return result.data;
  } catch (error) {
    console.error(error);
  }
}
fetchById(296777);
