import axios from 'axios';
import renderGallery from './cardMaket';
import { fetchGenres } from './apiItems';
import { renderPagination } from './paginator';
import debounce from 'lodash.debounce';
import Notiflix from 'notiflix';
const URL = 'https://api.themoviedb.org/3';
const KEY = '15f17b74af157d4eeef693405d33f902';

const refs = {
  form: document.querySelector('#search-form'),
  layout__list: document.querySelector('.layout__list'),
  error__text: document.querySelector('.error-text'),
};

let query = '';

export async function fetchQuery(query, page = 1) {
  try {
    const request = await axios.get(
      `${URL}/search/movie?api_key=${KEY}&query=${query}&page=${page}`,
    );
    setTimeout(clearErrorMsg, 5000);

    refs.error__text.innerHTML = `Good job, we found ${request.data.total_results} movies on this tag.`;
    if (request.data.results.length === 0) {
      // refs.error__text.innerHTML = `<span style="color:red;">Search result not successful. Enter the correct movie name and try again.</span>`;
      refs.error__text.innerHTML = `<span style="color:red;">Search invalid. Enter the correct movie name.</span>`;

    }

    return request.data;
  } catch (error) {}
}

const clearErrorMsg = () => {
  refs.error__text.innerHTML = '';
};

const searchInput = async e => {
  e.preventDefault();
  query = e.target.elements.searchQuery.value.trim();
  refreshList(query);
  spin();
};
function spin() {
  let preloader = document.getElementById('page-preloader');
  preloader.classList.remove('done');
  setTimeout(function () {
    if (!preloader.classList.contains('done')) {
      preloader.classList.add('done');
    }
  }, 500);
}

const refreshList = async (query, page) => {
  const { results: movies, total_pages, page: pageFromRequest } = await fetchQuery(query, page);
  const genres = await fetchGenres();
  const newMovies = movies.map(el => {
    const arr = el.genre_ids.map(genre => {
      return genres.find(el => el.id === genre).name;
    });
    return { ...el, genre: arr };
  });

  renderGallery(newMovies);
  renderPagination(pageFromRequest, total_pages, page => refreshList(query, page));
};

refs.form.addEventListener('submit', searchInput);
