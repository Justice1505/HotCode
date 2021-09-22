import { fetchById } from './apiItems';
import { fetchGenres } from './apiItems';
import { fetchTrends } from './apiItems';
import { renderMovieCard } from './modal';
import {
  watchedActions,
  queueActions,
  checkup,
  removeFromQueue,
  removeFromWatched,
} from './localeStorage';
import { renderPagination } from './paginator';

const BASEimgURL = 'https://image.tmdb.org/t/p/';
const SIZE = 'w500';
const layout__list = document.querySelector('.layout__list');
document.addEventListener('DOMContentLoaded', fetchTrendsGallery);

export async function fetchTrendsGallery(e, page = 1) {
  try {
    const { results: movies, total_pages, page: pageFromRequest } = await fetchTrends(page);
    const genres = await fetchGenres();
    const newMovies = movies.map(el => {
      const arr = el.genre_ids.map(genre => {
        return genres.find(el => el.id === genre).name;
      });

      return { ...el, genre: arr };
    });
    const gal = renderGallery(newMovies);
    const items = document.querySelectorAll('.layout__list');
    items.forEach(item => {
      item.addEventListener('click', onMovieClick);
    });
    renderGallery(newMovies);
    renderPagination(pageFromRequest, total_pages, page => fetchTrendsGallery(null, page));
  } catch (error) {
    console.error(error);
  }
}
const defaultImg = '/xJWLN0r3hBFlpQyFzfUHYkh0JeM.jpg';
export default function renderGallery(newMovies) {
  layout__list.innerHTML = '';
  const markup = newMovies
    .map(movie => {
      return `<li class="layout__item">    
                      <a class="layout__link" href="" data-id="${movie.id}">
                      <img class="layout__image" src="${BASEimgURL}${SIZE}${
        movie.poster_path ? movie.poster_path : defaultImg
      }" alt="${movie.title}" width="" loading="lazy" />
                      </a>                      
                      <ul class="attribut__list">
                          <li class="attribut__item-title">${movie.original_title}</li>
                          <li class="attribut__item">${movie.genre
                            .map(gen => gen)
                            .slice(0, 3)
                            .join(', ')}</li>
                          <li class="attribut__item">${movie.release_date.slice(0, 4)}</li>
                      </ul>
                  </li>`;
    })
    .join('');

  layout__list.insertAdjacentHTML('beforeend', markup);
  return layout__list;
}

function onMovieClick(event) {
  event.preventDefault();
  const movie_id =
    event.target.nodeName === 'IMG' ? event.target.parentNode.dataset.id : event.target.dataset.id;
  // console.log(event.target.parentNode.dataset.id);
  // console.log(event.target.dataset.id);
  const movie = fetchById(movie_id).then(data => {
    const id = data.id;
    const modalBlock = document.querySelector('.modal');
    modalBlock.classList.remove('hidden');
    const main = document.querySelector('main');
    main.classList.add('backdrop');
    modalBlock.innerHTML = renderMovieCard(data);
    const buttonWatched = document.querySelector('.watched__button');
    const buttonQueue = document.querySelector('.queve__button');
    buttonWatched.addEventListener('click', watchedActions);
    buttonQueue.addEventListener('click', queueActions);
    if (localStorage.getItem('watchedArr')) {
      const watchedArr = Array.from(JSON.parse(localStorage.getItem('watchedArr')));
      if (checkup(id, watchedArr)) {
        buttonWatched.classList.add('remove__watched');
        // buttonWatched.classList.remove("watched__button");
        buttonWatched.textContent = 'Added to watched';
      }
    }
    if (localStorage.getItem('queueArr')) {
      const queueArr = Array.from(JSON.parse(localStorage.getItem('queueArr')));
      if (checkup(id, queueArr)) {
        buttonQueue.classList.add('remove__queue');
        // buttonQueue.classList.remove("queve__button");
        buttonQueue.textContent = 'Added to Queue';
      }
    }

    const closeButton = modalBlock.querySelector('.close__modal');
    closeButton.addEventListener('click', e => {
      e.preventDefault();
      // buttonAddToQueue.removeEventListener('click', addToQueue);
      // buttonAddToWatched.removeEventListener('click', addToWatched);
      e.target.parentNode.classList.toggle('hidden');
      //console.log(e.target);
      main.classList.remove('backdrop');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape') {
        // buttonAddToQueue.removeEventListener('click', addToQueue);
        // buttonAddToWatched.removeEventListener('click', addToWatched);
        closeButton.parentNode.classList.add('hidden');
        main.classList.remove('backdrop');
      }
    });

    document.addEventListener('click', function (e) {
      // console.log(e.target);
      const container = document.querySelector('main');
      if (e.target === container) {
        // const modal = document.querySelector('.modal');
        closeButton.parentNode.classList.add('hidden');
        main.classList.remove('backdrop');
      }
    });
  });
  // console.log(movie);

  return movie;
}
