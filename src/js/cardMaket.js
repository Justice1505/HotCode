import axios from 'axios';
const BASEimgURL ='https://image.tmdb.org/t/p/'
const SIZE = 'w500'
const URL = 'https://api.themoviedb.org/3';
const KEY = '15f17b74af157d4eeef693405d33f902';
const layout__list = document.querySelector('.layout__list');
console.log(layout__list);
async function fetchGenres() {
    try {
      const res = await axios.get(`${URL}/genre/movie/list?api_key=${KEY}`);
      const genres = res.data.genres;
      console.log(genres);
      return genres;
    } catch (error) {
      console.error(error);
    }
  }
export default function renderGallery(movies) {
    console.log(movies);
      const markup = movies.map((movie => {
          return `<li class="layout__item">
                      <a class="layout__link" href="${BASEimgURL}${SIZE}${movie.backdrop_path}">
                      <img class="layout__image" src="${BASEimgURL}${SIZE}${movie.poster_path}" alt="${movie.title}" width="" loading="lazy" />
                      </a>
                      <ul class="attribut__list">
                          <li class="attribut__item">${movie.original_title}</li>
                          <li class="attribut__item">${genres.map((genre =>{return ${name}}))}</li>
                          <li class="attribut__item">${movie.release_date.slice(0,4)}</li>
                      </ul>
                  </li>`
      })).join('');
          layout__list.insertAdjacentHTML('beforeend', markup);
          return layout__list;
      }
