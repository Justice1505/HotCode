import Notiflix from 'notiflix';
import { renderWatched, renderQueue } from './localeStorage';
import { renderGallery } from './cardMaket';
import { fetchTrendsGallery } from './cardMaket.js';
import './apiItems.js';
const body = document.body;

body.classList.add('home-bcg');

const myLibrary = {
  library: document.querySelector('.menu__link-library'),
  home: document.querySelector('.menu__link-home'),
  form: document.querySelector('.search-form'),
  libraryBtns: document.querySelector('.libraryBtns'),
};

myLibrary.libraryBtns.classList.add('hidden');
myLibrary.library.addEventListener('click', onClick);
function onClick(e) {
  // if (localStorage.getItem('email')) {
  //   // e.target.classList.add('current');
  //   myLibrary.library.classList.add('current');
  // }
  // console.log(e.target)
  // checkAccess();
  if (localStorage.getItem('email')) {
    accessLibrary();
    //   e.target.classList.add('current');
    // myLibrary.library.classList.add('current');
    // body.classList.replace('home-bcg', 'library-bcg');
    // myLibrary.form.classList.add('hidden');
    // myLibrary.libraryBtns.classList.remove('hidden');
    // myLibrary.home.classList.remove('current');
  } else {
    // e.target.classList.remove('current');
    myLibrary.library.classList.remove('current');
    const notification = document.querySelector('.error-text');
    notification.textContent = 'Please, register or sign in for access';
    notification.style.color = '#FF0000';
    accessHome();
  }
  // const buttonWatched = document.querySelector('.watched');
  // const buttonQueue = document.querySelector('.queue');
  // const watchedArr = JSON.parse(localStorage.getItem('watchedArr'));
  // const queueArr = JSON.parse(localStorage.getItem('queueArr'));
  // if (watchedArr.length === 0 && queueArr.length === 0) {
  //   Notiflix.Notify.failure('Library is empty');
  //   buttonWatched.disabled = 'true';
  //   buttonQueue.disabled = 'true';
  //   const layout__list = document.querySelector('.layout__list');
  //   const pagination = document.querySelector('#pagination');
  //   pagination.innerHTML = '';
  //   layout__list.innerHTML = '';
  //   document
  //     .querySelector('.layout')
  //     .insertAdjacentHTML(
  //       'beforebegin',
  //       "<div class='error-container'><p class='error__message'>Oops..., nothing found</p></div>",
  //     );
  // } else {
  //   if (watchedArr.length !== 0 && queueArr.length !== 0) {
  //     buttonWatched.classList.add('current');
  //     renderWatched();
  //   } else if (watchedArr.length !== 0 && queueArr.length === 0) {
  //     // buttonQueue.disabled = "true";
  //     buttonWatched.classList.add('current');
  //     renderWatched();
  //   } else if (watchedArr.length === 0 && queueArr.length !== 0) {
  //     // buttonWatched.disabled = "true";
  //     buttonQueue.classList.add('current');
  //     renderQueue();
  //   }
  // }

  // buttonWatched.addEventListener('click', () => {
  //   const watchedArr = JSON.parse(localStorage.getItem('watchedArr'));
  //   buttonQueue.classList.remove('current');
  //   buttonWatched.classList.add('current');
  //   if (watchedArr.length !== 0) {
  //     if (document.querySelector('.error-container')) {
  //       document.querySelector('.error-container').remove();
  //     }
  //     renderWatched();
  //   } else {
  //     if (document.querySelector('.error-container')) {
  //       document.querySelector('.error-container').remove();
  //     }
  //     const layout__list = document.querySelector('.layout__list');
  //     const pagination = document.querySelector('#pagination');
  //     layout__list.innerHTML = '';
  //     pagination.innerHTML = '';
  //     document
  //       .querySelector('.layout')
  //       .insertAdjacentHTML(
  //         'beforebegin',
  //         "<div class='error-container'><p class='error__message'>Oops..., nothing found</p></div>",
  //       );
  //     Notiflix.Notify.failure('Watched is empty');
  //   }
  // });
  // buttonQueue.addEventListener('click', () => {
  //   const queueArr = JSON.parse(localStorage.getItem('queueArr'));
  //   buttonWatched.classList.remove('current');
  //   buttonQueue.classList.add('current');
  //   if (queueArr.length !== 0) {
  //     if (document.querySelector('.error-container')) {
  //       document.querySelector('.error-container').remove();
  //     }
  //     renderQueue();
  //   } else {
  //     if (document.querySelector('.error-container')) {
  //       document.querySelector('.error-container').remove();
  //     }
  //     const layout__list = document.querySelector('.layout__list');
  //     const pagination = document.querySelector('#pagination');
  //     layout__list.innerHTML = '';
  //     pagination.innerHTML = '';
  //     document
  //       .querySelector('.layout')
  //       .insertAdjacentHTML(
  //         'beforebegin',
  //         "<div class='error-container'><p class='error__message'>Oops..., nothing found</p></div>",
  //       );
  //     Notiflix.Notify.failure('Queue is empty');
  //   }
  // });
}
function accessLibrary() {
  myLibrary.library.classList.add('current');
  body.classList.replace('home-bcg', 'library-bcg');
  myLibrary.form.classList.add('hidden');
  myLibrary.libraryBtns.classList.remove('hidden');
  myLibrary.home.classList.remove('current');
}

export function accessHome() {
  myLibrary.library.classList.remove('current');
  body.classList.replace('library-bcg', 'home-bcg');
  myLibrary.form.classList.remove('hidden');
  myLibrary.libraryBtns.classList.add('hidden');
  myLibrary.home.classList.add('current');
  fetchTrendsGallery();
}

// function checkAccess() {
//   if (localStorage.getItem('email')) {
//     accessLibrary();
//   } else {
//     accessHome();
//     const notification = document.querySelector('.error-text');
//     notification.textContent = 'Please, register or sign in for access';
//     notification.style.color = rgb(255, 0, 0);
//     myLibrary.library.classList.remove('current');
//   }
// }
