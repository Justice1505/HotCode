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
// <<<<<<< modalfix

// function onMovieClick(event) {

//   event.preventDefault();
//   const movie_id = event.target.nodeName === "IMG" ? event.target.parentNode.dataset.id : event.target.dataset.id;
//   // console.log(event.target.parentNode.dataset.id);
//   // console.log(event.target.dataset.id);
//   const movie = fetchById(movie_id).then(data => {
//   const modalBlock = document.querySelector('.modal');
//   modalBlock.classList.remove('is-hidden');
//   const main = document.querySelector("main");
//   main.classList.add("backdrop");

//   modalBlock.innerHTML = renderMovieCard(data);
//   const closeButton = modalBlock.querySelector('.close__modal');
//   closeButton.addEventListener('click', e=> {
//     e.preventDefault();

//     e.target.parentNode.classList.toggle('is-hidden');
//     console.log(e.target);
//     main.classList.remove("backdrop");

//   })
//   document.addEventListener('keydown', function(e) {
//     if (e.key === 'Escape') {
//       closeButton.parentNode.classList.toggle('is-hidden');
//       main.classList.remove("backdrop");
//     }
//     });
//   });
//   // console.log(movie);

//   return movie;
// }
// =======
// >>>>>>> dev
